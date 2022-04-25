using HealthyAtHomeAPI.DTOs.exercise;
using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface IExerciseRepository
{
    public Task<List<Exercise>> GetAll();

    public Task<List<Exercise>> GetByIds(List<int> ids);

    public Task<ExerciseInfoResponse?> GetDetailsById(int id);

    public Task<List<GetWorkoutResultSet>> GetResultsForLastNWorkouts(int id, string uid, int lastCount);
}