namespace HealthyAtHomeAPI.DTOs.workout;

public class SaveResultsRequest
{
    public int WorkoutId { get; set; }

    public string Token { get; set; }

    public int TimeElapsedMs { get; set; }

    public List<SetResult> SetsResults { get; set; } = new();
}