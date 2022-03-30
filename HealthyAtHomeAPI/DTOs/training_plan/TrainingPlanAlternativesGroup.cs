using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.DTOs.training_plan;

public class TrainingPlanAlternativesGroup
{
    public int AlternativesToChoose { get; set; }
    public string CategoryType { get; set; }
    public List<Exercise> Exercises { get; set; } = new();
}