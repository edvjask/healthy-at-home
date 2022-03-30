namespace HealthyAtHomeAPI.DTOs.training_plan;

public class SaveTrainingPlan
{
    public NewTrainingPlanRequestDto planOptions { get; set; }

    public string Name { get; set; }

    public string OwnerUid { get; set; }

    public List<int> exerciseIds { get; set; }
}