using HealthyAtHomeAPI.DTOs.exercise;
using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace HealthyAtHomeAPI.Repository;

public class ExerciseRepository : BaseRepository, IExerciseRepository
{
    public ExerciseRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<List<Exercise>> GetAll()
    {
        return await _context
            .Exercises
            .Include(e => e.ExerciseCues)
            .ToListAsync();
    }

    public async Task<List<Exercise>> GetByIds(List<int> ids)
    {
        return await _context
            .Exercises
            .Where(e => ids.Any(id => id == e.Id)).ToListAsync();
    }

    public async Task<ExerciseInfoResponse?> GetDetailsById(int id)
    {
        var exercise = await _context
            .Exercises
            .Where(e => e.Id == id).Select(exercise => new ExerciseInfoResponse
                {
                    Id = exercise.Id,
                    Instructions = exercise.Instructions,
                    Name = exercise.Name,
                    ExerciseCues = exercise.ExerciseCues,
                    ExerciseDifficulty = exercise.ExerciseDifficulty,
                    ExerciseType = exercise.ExerciseType,
                    InventoryTypes = exercise.InventoryTypes,
                    MuscleGroups = exercise.MuscleGroups,
                    YoutubeLink = exercise.YoutubeLink,
                    EasierVariationId = exercise.EasierVariationId,
                    HarderVariationId = exercise.HarderVariationId
                }
            ).FirstOrDefaultAsync();
        if (exercise != null && exercise.EasierVariationId != null)
        {
            var easier = await _context.Exercises.Where(e => e.Id == exercise.EasierVariationId)
                .Select(e => new {e.Name}).FirstAsync();
            exercise.EasierVariationName = easier.Name;
        }

        if (exercise != null && exercise.HarderVariationId != null)
        {
            var easier = await _context.Exercises.Where(e => e.Id == exercise.HarderVariationId)
                .Select(e => new {e.Name}).FirstAsync();
            exercise.HarderVariationName = easier.Name;
        }

        return exercise;
    }

    public async Task<Exercise?> GetById(int id)
    {
        return await _context.Exercises
            .Where(e => e.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<List<GetWorkoutResultSet>> GetResultsForLastNWorkouts(int id, string uid, int lastCount)
    {
        //last 3 workouts with exercise id;
        var lastWorkouts = await _context.Workouts
            .Join(_context.WorkoutSets,
                workout => workout.Id,
                set => set.Workout.Id,
                (workout, set) => new
                {
                    workout.Id,
                    ExerciseId = set.Exercise.Id,
                    workout.Completed,
                    Owner = workout.WorkoutProgram.TrainingPlan.OwnerUid
                })
            .Where(item => item.ExerciseId == id && item.Owner == uid && item.Completed)
            .Select(item => item.Id)
            .Distinct()
            .OrderByDescending(item => item).Take(lastCount)
            .ToListAsync();

        //all workout sets that are contained by the former workouts
        return await _context.WorkoutSets
            .Where(ws => lastWorkouts.Contains(ws.Workout.Id) && ws.Exercise.Id == id)
            .Select(ws => new GetWorkoutResultSet
            {
                Id = ws.Id,
                OrderNo = ws.OrderNr,
                RepsCompleted = ws.RepsCompleted,
                WorkoutDate = ws.Workout.Date,
                RepsToComplete = ws.RepsToComplete
            })
            .ToListAsync();
    }

    public async Task AddNew(Exercise exercise)
    {
        await _context.Exercises.AddAsync(exercise);
    }

    public void Update(Exercise exercise)
    {
        _context.Exercises.Update(exercise);
    }
}