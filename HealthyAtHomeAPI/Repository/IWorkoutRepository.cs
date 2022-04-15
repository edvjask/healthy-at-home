using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface IWorkoutRepository
{
    Task AddWorkoutProgram(WorkoutProgram workoutProgram);

    void RemoveWorkoutProgram(WorkoutProgram wp);

    Task<WorkoutProgram> GetById(int id);
}