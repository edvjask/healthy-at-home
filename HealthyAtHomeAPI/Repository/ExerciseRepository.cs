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
            .Where(e => ids.Any(id => id == e.Id))
            .ToListAsync();
    }
}