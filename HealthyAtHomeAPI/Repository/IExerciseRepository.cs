using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface IExerciseRepository
{
    public Task<List<Exercise>> GetAll();

    public Task<List<Exercise>> GetByIds(List<int> ids);
}