using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface IWorkoutRepository
{
    Task AddWorkoutProgram(WorkoutProgram workoutProgram);

    void RemoveWorkoutProgram(WorkoutProgram wp);

    Task<WorkoutProgram> GetById(int id);

    Task<WorkoutProgramSummaryResponse?> GetSummaryById(int id);
}