using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Interfaces;

public interface IExerciseService
{
    Task<GenericResponse<List<Exercise>>> GetAllExercises();
}