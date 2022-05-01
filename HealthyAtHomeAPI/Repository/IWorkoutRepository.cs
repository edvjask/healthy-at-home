using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface IWorkoutRepository
{
    Task AddWorkoutProgram(WorkoutProgram workoutProgram);

    void RemoveWorkoutProgram(WorkoutProgram wp);

    Task<WorkoutProgram> GetById(int id);

    Task<WorkoutProgram> GetProgramByIdWithWorkouts(int id, string uid);

    Task<WorkoutProgramSummaryResponse?> GetSummaryById(int id);

    Task<WorkoutProgram?> GetWorkoutProgramByTrainingPlanId(int id);

    Task<List<GetWorkoutProgram>> GetWorkoutProgramsForUser(string uid);

    Task<Workout?> GetWorkoutInfo(int id, string uid);

    Task<Workout?> GetWorkoutByIdWithSets(int id, string uid);

    void SaveWorkoutResults(Workout workout);

    void EditWorkoutSets(List<EditWorkoutSet> workoutSets, Workout workout);
}