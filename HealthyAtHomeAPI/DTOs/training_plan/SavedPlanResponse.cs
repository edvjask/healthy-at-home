namespace HealthyAtHomeAPI.DTOs.training_plan;

public class SavedPlanResponse
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string OwnerUid { get; set; }

    public List<int> exerciseIds { get; set; }

    public int TrainingPlanOptionsId { get; set; }
}