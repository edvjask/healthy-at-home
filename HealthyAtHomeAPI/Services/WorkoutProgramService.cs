using AutoMapper;
using FirebaseAdmin.Auth;
using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Repository;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Services;

public class WorkoutProgramService : IWorkoutProgramService
{
    private readonly ITrainingPlanRepository _trainingPlanRepository;
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IWorkoutRepository _workoutRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private static int NO_OF_MUSCLE_GROUPS = 6;

    public WorkoutProgramService(ITrainingPlanRepository trainingPlanRepository,
        IExerciseRepository exerciseRepository,
        IMapper mapper,
        IUnitOfWork unitOfWork,
        IWorkoutRepository workoutRepository)
    {
        _trainingPlanRepository = trainingPlanRepository;
        _exerciseRepository = exerciseRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _workoutRepository = workoutRepository;
    }


    public async Task<GenericResponse<NewWorkoutProgramResponse>> GenerateSchedule(GenerateScheduleRequest request)
    {
        //verify token and plan ownership
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.UserToken);

        var trainingPlan = await _trainingPlanRepository.GetById(request.TrainingPlanId);

        if (trainingPlan.OwnerUid != decodedToken.Uid)
            throw new ApplicationException("Owner of the token does not match the owner of the training plan");
        ;

        //calculate dates
        var startDate = GetNearestWeekday(request.StartDate);
        var endDate = startDate.AddDays(request.NumberOfDays);

        //generate workouts

        //save program
        var workoutProgram = new WorkoutProgram
        {
            StartDate = startDate,
            EndDate = endDate,
            TrainingPlan = trainingPlan,
            Workouts = GenerateWorkouts(trainingPlan, startDate, endDate)
        };
        await _workoutRepository.AddWorkoutProgram(workoutProgram);
        await _unitOfWork.CompleteAsync();
        //return result


        return GenericResponse<NewWorkoutProgramResponse>.SuccessResponse(new NewWorkoutProgramResponse
        {
            WorkoutId = workoutProgram.Id
        });
    }

    public async Task<GenericResponse<string>> DeleteProgram(DeleteProgramRequest request, int id)
    {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.token);

        var workoutProgram = await _workoutRepository.GetById(id);

        if (workoutProgram.TrainingPlan.OwnerUid != decodedToken.Uid)
            throw new ApplicationException("Owner of the program does not match the one in the token");
        ;
        _workoutRepository.RemoveWorkoutProgram(workoutProgram);
        await _unitOfWork.CompleteAsync();

        return GenericResponse<string>.SuccessResponse($"Program with ID {id} successfully deleted");
    }

    public async Task<GenericResponse<WorkoutProgramSummaryResponse>> GetSummaryById(WorkoutProgramRequest request)
    {
        var program = await _workoutRepository.GetSummaryById(request.Id);
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.Token);

        if (program == null || program.OwnerUID != decodedToken.Uid)
            throw new ApplicationException("Owner of the program does not match the one in the token");
        return GenericResponse<WorkoutProgramSummaryResponse>.SuccessResponse(program);
    }

    private DateTime GetNearestWeekday(DateTime date)
    {
        var newDate = date;

        var isWeekend = newDate.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;

        while (isWeekend)
        {
            //add days until not weekend
            newDate = newDate.AddDays(1);
            isWeekend = newDate.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;
        }

        return newDate;
    }

    private List<Workout> GenerateWorkouts(TrainingPlan trainingPlan, DateTime startDate, DateTime endDate)
    {
        var workouts = new List<Workout>();
        //training goal defines no. of sets and reps
        var workoutGoal = trainingPlan.Options.WorkoutGoal;
        var noOfSets = workoutGoal == EWorkoutGoal.Endurance ? 5 : workoutGoal == EWorkoutGoal.Strength ? 3 : 4;
        var noOfMaxReps = workoutGoal == EWorkoutGoal.Endurance ? 15 : workoutGoal == EWorkoutGoal.Strength ? 8 : 12;
        // how to determine no. of days ? always 3 with 1 rest in between
        var planOptions = trainingPlan.Options;
        var workoutsPerWeek = 3;

        var workoutsUsed = 0;
        var workoutNr = 1;
        var exerciseIdSetToIncrease = new Dictionary<int, int>();
        for (var date = startDate; date <= endDate; date = date.AddDays(1))
        {
            if (date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday)
            {
                workoutsUsed = 0;
                continue;
            }

            //generate new workout, add one day for rest, count one used workout for week
            if (workoutsUsed < workoutsPerWeek)
            {
                var workout = new Workout
                {
                    Date = date,
                    OrderNr = workoutNr,
                    WorkoutSets = GenerateWorkoutSets(trainingPlan.Exercises, exerciseIdSetToIncrease,
                        noOfSets, noOfMaxReps, workouts.Count > 0 ? workouts.Last() : null)
                };
                workouts.Add(workout);
                workoutNr++;
                workoutsUsed++;
                date = date.AddDays(1);
            }
        }

        return workouts;
    }

    private List<WorkoutSet> GenerateWorkoutSets(ICollection<Exercise> exercises,
        Dictionary<int, int> exerciseIdSetToIncrease, int noOfSets, int repsMax,
        Workout? lastworkout)
    {
        var workoutSets = new List<WorkoutSet>();
        


        foreach (var exercise in exercises)
        {
            var setToIncrease = 0;
            var containsExercise = exerciseIdSetToIncrease.TryGetValue(exercise.Id, out setToIncrease);
            for (var i = 1; i <= noOfSets; i++)
            {
                var previousWorkoutReps = lastworkout != null
                    ? lastworkout.WorkoutSets
                        .First(ws => ws.Exercise.Id == exercise.Id && ws.OrderNr == i)
                        .RepsToComplete
                    : 5;
                var workoutSet = new WorkoutSet
                {
                    OrderNr = i,
                    Exercise = exercise,
                    RepsCompleted = -1,
                    //get previous workouts reps for this exercise and set
                    RepsToComplete = Math.Min(setToIncrease == i ? ++previousWorkoutReps : previousWorkoutReps, repsMax)
                };
                workoutSets.Add(workoutSet);
            }

            if (containsExercise)
            {
                var newSetToIncrease = setToIncrease >= noOfSets ? 1 : setToIncrease + 1;
                exerciseIdSetToIncrease[exercise.Id] = newSetToIncrease;
            }
            else
            {
                exerciseIdSetToIncrease.Add(exercise.Id, setToIncrease + 1);
            }
        }

        return workoutSets;
    }
}