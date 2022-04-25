namespace HealthyAtHomeAPI.DTOs.workout;

public class WorkoutMetricsResponse
{
    public int totalWorkoutTimeMs { get; set; }

    public int missedWorkoutsCount { get; set; }

    public List<GetWorkoutTotals> WorkoutTotalsList { get; set; } = new();
}