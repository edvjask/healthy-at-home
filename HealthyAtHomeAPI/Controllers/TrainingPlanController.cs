using HealthyAtHomeAPI.DTOs.training_plan;
using HealthyAtHomeAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthyAtHomeAPI.Controllers;

[Route("/api/training-plan")]
//[Authorize]
public class TrainingPlanController : Controller
{
    private readonly ITrainingPlanService _trainingPlanService;

    public TrainingPlanController(ITrainingPlanService trainingPlanService)
    {
        _trainingPlanService = trainingPlanService;
    }

    [HttpPost("generate")]
    public async Task<IActionResult> GenerateNewPlan([FromBody] NewTrainingPlanRequestDto options)
    {
        return Ok(await _trainingPlanService.GenerateAlternativesAsync(options));
    }

    [HttpPost("save-with-options")]
    public async Task<IActionResult> SaveNewPlanWithOptions([FromBody] SaveTrainingPlan trainingPlanWithOptions)
    {
        return Ok(await _trainingPlanService.SaveTrainingPlanAsync(trainingPlanWithOptions));
    }

    [HttpPost("get-all")]
    public async Task<IActionResult> GetAll([FromBody] GetPlansRequest request)
    {
        return Ok(await _trainingPlanService.GetAllForUser(request.accessToken));
    }
}