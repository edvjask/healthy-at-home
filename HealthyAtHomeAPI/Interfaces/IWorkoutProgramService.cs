using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Interfaces;

public interface IWorkoutProgramService
{
    Task<GenericResponse<NewWorkoutProgramResponse>> GenerateSchedule(GenerateScheduleRequest generateScheduleRequest);

    Task<GenericResponse<string>> DeleteProgram(DeleteProgramRequest request, int id);

    Task<GenericResponse<WorkoutProgramSummaryResponse>> GetSummaryById(WorkoutProgramRequest request);
}