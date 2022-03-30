using HealthyAtHomeAPI.DTOs.training_plan;

namespace HealthyAtHomeAPI.Interfaces;

public interface ITrainingPlanService
{
    Task<List<TrainingPlanAlternativesGroup>> GenerateAlternativesAsync(NewTrainingPlanRequestDto trainingPlanOptions);
    Task<SaveTrainingPlan> SaveTrainingPlanAsync(SaveTrainingPlan options);
}