using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface ITrainingPlanRepository
{
    Task<TrainingPlan> AddNewAsync(TrainingPlan trainingPlan);
}