using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Repository;

public interface ITrainingPlanRepository
{
    Task AddNewAsync(TrainingPlan trainingPlan);
    Task<List<TrainingPlan>> GetAllForUser(string uid);

    Task<TrainingPlan> GetById(int id);

    Task<TrainingPlanOptions?> GetOptionsForUser(string token);

    void EditPlan(TrainingPlan plan);
}