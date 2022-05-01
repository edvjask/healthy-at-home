namespace HealthyAtHomeAPI.DTOs.workout;

public class EditWorkoutRequest
{
    public List<EditWorkoutSet> EditWorkoutSets { get; set; } = new();
}