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
}