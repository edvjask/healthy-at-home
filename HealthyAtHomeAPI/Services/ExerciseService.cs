using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Repository;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Services;

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepository;

    public ExerciseService(IExerciseRepository exerciseRepository)
    {
        _exerciseRepository = exerciseRepository;
    }

    public async Task<GenericResponse<List<Exercise>>> GetAllExercises()
    {
        var exercises = await _exerciseRepository.GetAll();
        return GenericResponse<List<Exercise>>.SuccessResponse(exercises);
    }
}