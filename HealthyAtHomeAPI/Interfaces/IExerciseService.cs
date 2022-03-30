using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Interfaces;

public interface IExerciseService
{
    Task<List<Exercise>> GetAllExercises();
}