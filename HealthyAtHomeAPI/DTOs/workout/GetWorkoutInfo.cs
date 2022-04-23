namespace HealthyAtHomeAPI.DTOs.workout;

public class GetWorkoutInfo
{
    public int Id { get; set; }

    public int OrderNr { get; set; }

    public int RestPeriodMs { get; set; }

    public bool Completed { get; set; }

    public List<ExerciseWithSets> ExercisesWithSets { get; set; } = new();
}