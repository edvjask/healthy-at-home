using HealthyAtHomeAPI.Persistence.Contexts;

namespace HealthyAtHomeAPI.Repository;

public class BaseRepository
{
    protected readonly AppDbContext _context;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
    }
}