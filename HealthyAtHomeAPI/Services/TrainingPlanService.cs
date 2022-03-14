using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Repository;

namespace HealthyAtHomeAPI.Services;

public class TrainingPlanService : ITrainingPlanService
{
    private readonly ITrainingPlanRepository _trainingPlanRepository;

    public TrainingPlanService(ITrainingPlanRepository trainingPlanRepository)
    {
        _trainingPlanRepository = trainingPlanRepository;
    }

    public Task<TrainingPlan> GenerateAsync(TrainingPlanOptions trainingPlanOptions)
    {
        return _trainingPlanRepository.AddNewAsync(new TrainingPlan());
    }
}