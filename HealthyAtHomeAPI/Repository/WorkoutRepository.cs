using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace HealthyAtHomeAPI.Repository;

public class WorkoutRepository : BaseRepository, IWorkoutRepository
{
    public WorkoutRepository(AppDbContext context) : base(context)
    {
    }


    public async Task AddWorkoutProgram(WorkoutProgram workoutProgram)
    {
        await _context.WorkoutPrograms.AddAsync(workoutProgram);
    }

    public void RemoveWorkoutProgram(WorkoutProgram wp)
    {
        _context.WorkoutPrograms.Remove(wp);
    }

    public async Task<WorkoutProgram> GetById(int id)
    {
        return await _context.WorkoutPrograms
            .Include(wp => wp.TrainingPlan)
            .FirstAsync(wp => wp.Id == id);
    }

    public async Task<WorkoutProgramSummaryResponse?> GetSummaryById(int id)
    {
        return await _context.WorkoutPrograms
            .Where(wp => wp.Id == id)
            .Select(wp => new WorkoutProgramSummaryResponse
            {
                Id = wp.Id,
                StartDate = wp.StartDate,
                EndDate = wp.EndDate,
                WorkoutSummaries = wp.Workouts.Select(workout => new WorkoutSummary
                {
                    Id = workout.Id,
                    OrderNr = workout.OrderNr,
                    Completed = workout.Completed,
                    Date = workout.Date
                }).ToList(),
                OwnerUID = wp.TrainingPlan.OwnerUid
            })
            .FirstOrDefaultAsync();
    }

    public async Task<WorkoutProgram?> GetWorkoutProgramByTrainingPlanId(int id)
    {
        return await _context.WorkoutPrograms
            .Select(wp => wp)
            .Where(wp => wp.TrainingPlan.Id == id)
            .OrderBy(wp => wp.Id)
            .FirstOrDefaultAsync();
    }

    public async Task<List<GetWorkoutProgram>> GetWorkoutProgramsForUser(string uid)
    {
        return await _context.WorkoutPrograms
            .Where(wp => wp.TrainingPlan.OwnerUid == uid)
            .Select(wp => new GetWorkoutProgram
            {
                Id = wp.Id,
                EndDate = wp.EndDate,
                StartDate = wp.StartDate,
                WorkoutCount = wp.Workouts.Count,
                TrainingPlanId = wp.TrainingPlan.Id,
                TrainingPlanName = wp.TrainingPlan.Name
            })
            .ToListAsync();
    }

    public async Task<Workout?> GetWorkoutInfo(int id, string uid)
    {
        return await _context.Workouts
            .Where(w => w.Id == id && w.WorkoutProgram.TrainingPlan.OwnerUid == uid)
            .Include(w => w.WorkoutSets)
            .ThenInclude(ws => ws.Exercise)
            .ThenInclude(e => e.ExerciseCues)
            .AsSplitQuery()
            .FirstOrDefaultAsync();
    }

    public async Task<Workout?> GetWorkoutByIdWithSets(int id, string uid)
    {
        return await _context.Workouts
            .Where(w => w.Id == id && w.WorkoutProgram.TrainingPlan.OwnerUid == uid)
            .Include(w => w.WorkoutSets)
            .FirstOrDefaultAsync();
    }

    public void SaveWorkoutResults(Workout updatedWorkout)
    {
        _context.Workouts.Update(updatedWorkout);
    }
}