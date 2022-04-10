using AutoMapper;
using FirebaseAdmin.Auth;
using HealthyAtHomeAPI.DTOs.training_plan;
using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Helpers;
using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Repository;

namespace HealthyAtHomeAPI.Services;

public class TrainingPlanService : ITrainingPlanService
{
    private readonly ITrainingPlanRepository _trainingPlanRepository;
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private const int NUMBER_OF_MUSCLE_GROUPS = 6;

    public TrainingPlanService(ITrainingPlanRepository trainingPlanRepository, IExerciseRepository exerciseRepository,
        IMapper mapper, IUnitOfWork unitOfWork)
    {
        _trainingPlanRepository = trainingPlanRepository;
        _exerciseRepository = exerciseRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<TrainingPlanAlternativesGroup>> GenerateAlternativesAsync(
        NewTrainingPlanRequestDto trainingPlanOptions)
    {
        var exercises = await _exerciseRepository.GetAll();

        var inventoryOnHand = trainingPlanOptions.InventoryTypes;

        var exercisesForInventory = exercises.FindAll(
            e => e.InventoryTypes.Any(i => inventoryOnHand.Contains(i)) || !e.InventoryTypes.Any());

        var exerciseGroupsToReturn = GetExercises(trainingPlanOptions, exercisesForInventory);


        return exerciseGroupsToReturn;
    }

    public async Task<SaveTrainingPlan> SaveTrainingPlanAsync(SaveTrainingPlan options)
    {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(options.IdToken);
        
        var chosenExercises = await _exerciseRepository.GetByIds(options.exerciseIds);

        var newTrainingPlanOptions = _mapper.Map<NewTrainingPlanRequestDto, TrainingPlanOptions>(options.planOptions);

        var newTrainingPlan = new TrainingPlan
        {
            CreationDate = DateTime.Now,
            Exercises = chosenExercises,
            Name = options.Name,
            OwnerUid = decodedToken.Uid,
            Options = newTrainingPlanOptions
        };


        await _trainingPlanRepository.AddNewAsync(newTrainingPlan);
        await _unitOfWork.CompleteAsync();

        return options;
    }

    public async Task<List<TrainingPlan>> GetAllForUser(string token)
    {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

        return await _trainingPlanRepository.GetAllForUser(decodedToken.Uid);
    }

    private List<TrainingPlanAlternativesGroup> GetExercises(NewTrainingPlanRequestDto trainingPlanOptions,
        List<Exercise> filteredExercises)
    {
        //used for endurance workouts
        var enduranceModifier = trainingPlanOptions.WorkoutGoal == EWorkoutGoal.Endurance ? 1 : 0;

        var muscleGroupsSelected = trainingPlanOptions.MuscleGroupsWanted;
        var exercisesAlternativesGroups = new List<TrainingPlanAlternativesGroup>();
        var physicalResults = trainingPlanOptions.PhysicalResults;

        GetSuggestedExerciseGroups(filteredExercises, muscleGroupsSelected, physicalResults,
            exercisesAlternativesGroups, enduranceModifier);

        return exercisesAlternativesGroups;
    }

    private static void GetSuggestedExerciseGroups(List<Exercise> exercisesFromDb,
        ICollection<EMuscleGroup> muscleGroupsSelected,
        PhysicalResults physicalResults, List<TrainingPlanAlternativesGroup> exercisesAlternativesGroups,
        int enduranceModifier = 0)
    {
        var isFullBodyWorkout = muscleGroupsSelected.Count == NUMBER_OF_MUSCLE_GROUPS;

        var exercisesToSelect = !isFullBodyWorkout
            ? (int) physicalResults.Stamina + NUMBER_OF_MUSCLE_GROUPS / muscleGroupsSelected.Count - 1
            : (int) physicalResults.Stamina;

        var chosen = exercisesFromDb
            .FindAll(e => { return e.MuscleGroups.Any(muscleGroup => muscleGroupsSelected.Contains(muscleGroup)); })
            .FindAll(e =>
            {
                switch (e.ExerciseType)
                {
                    case EExerciseType.VerticalPull:
                    case EExerciseType.HorizontalPull:
                        return (int) e.ExerciseDifficulty ==
                               Math.Max((int) physicalResults.PullingStrength - enduranceModifier, 1);
                    case EExerciseType.Legs:
                        return (int) e.ExerciseDifficulty ==
                               Math.Max((int) physicalResults.LegStrength - enduranceModifier, 1);

                    case EExerciseType.HorizontalPush:
                    case EExerciseType.VerticalPush:
                        return (int) e.ExerciseDifficulty
                               == Math.Max((int) physicalResults.PushingStrength - enduranceModifier, 1);
                    case EExerciseType.Core:
                        return (int) e.ExerciseDifficulty
                               == Math.Max((int) physicalResults.CoreStrength - enduranceModifier, 1);
                    default:
                        return false;
                }
            })
            .GroupBy(e => e.ExerciseType.ToString());

        exercisesAlternativesGroups
            .AddRange(chosen
                .Select(group => new TrainingPlanAlternativesGroup
                {
                    Exercises = group.ToList(), CategoryType = TrainingPlanHelpers.SplitCamelCase(group.Key),
                    AlternativesToChoose = Math.Min(exercisesToSelect, group.ToList().Count)
                }));
    }
    
    
}