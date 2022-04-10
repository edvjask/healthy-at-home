namespace HealthyAtHomeAPI.DTOs.training_plan;

public class SaveTrainingPlan
{
    public NewTrainingPlanRequestDto planOptions { get; set; }

    public string Name { get; set; }

    public string IdToken { get; set; }

    public List<int> exerciseIds { get; set; }
}