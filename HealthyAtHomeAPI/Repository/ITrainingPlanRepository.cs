using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface ITrainingPlanRepository
{
    Task AddNewAsync(TrainingPlan trainingPlan);
    Task<List<TrainingPlan>> GetAllForUser(string uid);

    Task<TrainingPlan> GetById(int id);
}