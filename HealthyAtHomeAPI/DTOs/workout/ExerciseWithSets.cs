using HealthyAtHomeAPI.DTOs.exercise_cue;

namespace HealthyAtHomeAPI.DTOs.workout;

public class ExerciseWithSets
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<GetExerciseCue> ExerciseCues { get; set; } = new();

    public List<GetWorkoutSet> ExerciseSets { get; set; } = new();
}