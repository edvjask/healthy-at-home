using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace HealthyAtHomeAPI.Controllers;

[Route("/api/exercise")]
//[Authorize]
public class ExerciseController : Controller
{
    private readonly IExerciseService _exerciseService;

    public ExerciseController(IExerciseService exerciseService)
    {
        _exerciseService = exerciseService;
    }

    [HttpGet("all")]
    public async Task<List<Exercise>> GetAll()
    {
        return await _exerciseService.GetAllExercises();
    }
}