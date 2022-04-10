using HealthyAtHomeAPI.DTOs.training_plan;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Interfaces;

public interface ITrainingPlanService
{
    Task<List<TrainingPlanAlternativesGroup>> GenerateAlternativesAsync(NewTrainingPlanRequestDto trainingPlanOptions);
    Task<SaveTrainingPlan> SaveTrainingPlanAsync(SaveTrainingPlan options);
    Task<List<TrainingPlan>> GetAllForUser(string token);
}