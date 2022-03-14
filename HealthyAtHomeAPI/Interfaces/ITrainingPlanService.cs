using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Interfaces;

public interface ITrainingPlanService
{
    Task<TrainingPlan> GenerateAsync(TrainingPlanOptions trainingPlanOptions);
}