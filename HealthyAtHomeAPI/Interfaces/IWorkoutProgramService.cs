using HealthyAtHomeAPI.DTOs.workout_program;

namespace HealthyAtHomeAPI.Interfaces;

public interface IWorkoutProgramService
{
    Task<string> GenerateSchedule(GenerateScheduleRequest generateScheduleRequest);

    Task<string> DeleteProgram(DeleteProgramRequest request, int id);
}