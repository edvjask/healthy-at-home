﻿using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Persistence.Contexts;

namespace HealthyAtHomeAPI.Repository;

public class TrainingPlanRepository : BaseRepository, ITrainingPlanRepository
{
    public TrainingPlanRepository(AppDbContext context) : base(context)
    {
    }


    public async Task<TrainingPlan> AddNewAsync(TrainingPlan trainingPlan)
    {
        await _context.TrainingPlans.AddAsync(trainingPlan);
        return new TrainingPlan();
    }
}