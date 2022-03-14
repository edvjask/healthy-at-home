using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyAtHomeAPI.Controllers;

[Route("/api/training-plan")]
[Authorize]
public class TrainingPlanController : Controller
{
    private readonly ITrainingPlanService _trainingPlanService;

    public TrainingPlanController(ITrainingPlanService trainingPlanService)
    {
        _trainingPlanService = trainingPlanService;
    }

    [HttpPost("generate")]
    public async Task<TrainingPlan> GenerateNewPlan([FromBody] TrainingPlanOptions trainingPlanOptions)
    {
        var plan = await _trainingPlanService.GenerateAsync(trainingPlanOptions);
        return plan;
    }
}