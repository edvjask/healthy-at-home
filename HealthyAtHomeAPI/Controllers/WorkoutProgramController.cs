using HealthyAtHomeAPI.DTOs;
using HealthyAtHomeAPI.DTOs.workout;
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

    [HttpPost("get-summary")]
    public async Task<IActionResult> GetWorkoutProgramSummary([FromBody] WorkoutProgramRequest request)
    {
        return Ok(await _workoutProgramService.GetSummaryById(request));
    }

    [HttpGet("by-training-plan-id/{id}")]
    public async Task<IActionResult> CheckForExisting(int id)
    {
        return Ok(await _workoutProgramService.GetProgramByTrainingPlanId(id));
    }

    [HttpPost("all")]
    public async Task<IActionResult> GetAllUserPrograms([FromBody] RequestTokenBody request)
    {
        return Ok(await _workoutProgramService.GetWorkoutProgramsForUser(request.Token));
    }

    [HttpPost("get-workout-info")]
    public async Task<IActionResult> GetWorkoutInfo([FromBody] WorkoutInfoRequest request)
    {
        return Ok(await _workoutProgramService.GetWorkoutInfoById(request));
    }

    [HttpPost("save-workout-results")]
    public async Task<IActionResult> SaveWorkoutResults([FromBody] SaveResultsRequest request)
    {
        return Ok(await _workoutProgramService.SaveWorkoutResults(request));
    }

    [HttpPost("{id}/metrics")]
    public async Task<IActionResult> GetProgramMetrics([FromBody] RequestTokenBody request, int id)
    {
        return Ok(await _workoutProgramService.GetWorkoutMetrics(request.Token, id));
    }

    [HttpPatch("edit-workout/{id}")]
    public async Task<IActionResult> EditWorkout([FromBody] EditWorkoutRequest request, int id)
    {
        return Ok(await _workoutProgramService.EditWorkout(request, id));
    }


}