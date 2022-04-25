namespace HealthyAtHomeAPI.DTOs.exercise;

public class GetExerciseResultsRequest
{
    public int ExerciseId { get; set; }

    public string? Token { get; set; }
}