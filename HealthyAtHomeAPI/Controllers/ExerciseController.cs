using HealthyAtHomeAPI.DTOs;
using HealthyAtHomeAPI.Interfaces;
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
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _exerciseService.GetAllExercises());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAll(int id)
    {
        return Ok(await _exerciseService.GetInfoById(id));
    }

    [HttpPost("{id}/results-for-user")]
    public async Task<IActionResult> GetExerciseResults([FromBody] RequestTokenBody request, int id)
    {
        return Ok(await _exerciseService.GetResultsForUser(request, id));
    }
}