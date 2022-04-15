using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HealthyAtHomeAPI.Controllers;

[Route("/api/workout-program")]
//[Authorize]
public class WorkoutProgramController : Controller
{
    private readonly IWorkoutProgramService _workoutProgramService;

    public WorkoutProgramController(IWorkoutProgramService workoutProgramService)
    {
        _workoutProgramService = workoutProgramService;
    }

    [HttpPost("generate-and-save")]
    public async Task<IActionResult> GenerateAndSaveNewSchedule([FromBody] GenerateScheduleRequest options)
    {
        return Ok(await _workoutProgramService.GenerateSchedule(options));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWorkoutProgram([FromBody] DeleteProgramRequest request, int id)
    {
        return Ok(await _workoutProgramService.DeleteProgram(request, id));
    }

    // [HttpPost("save-with-options")]
    // public async Task<IActionResult> SaveNewPlanWithOptions([FromBody] SaveTrainingPlan trainingPlanWithOptions)
    // {
    //     return Ok(await _trainingPlanService.SaveTrainingPlanAsync(trainingPlanWithOptions));
    // }
    //
    // [HttpPost("get-all")]
    // public async Task<IActionResult> GetAll([FromBody] GetPlansRequest request)
    // {
    //     return Ok(await _trainingPlanService.GetAllForUser(request.accessToken));
    // }
}