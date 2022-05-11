namespace HealthyAtHomeAPI.DTOs.training_plan;

public class EditPlanRequest
{
    public int Id { get; set; }
    public List<int> ExerciseIds { get; set; } = new();
}