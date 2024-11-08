﻿using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace HealthyAtHomeAPI.Repository;

public class TrainingPlanRepository : BaseRepository, ITrainingPlanRepository
{
    public TrainingPlanRepository(AppDbContext context) : base(context)
    {
    }


    public async Task AddNewAsync(TrainingPlan trainingPlan)
    {
        await _context.TrainingPlans.AddAsync(trainingPlan);
    }

    public async Task<List<TrainingPlan>> GetAllForUser(string uid)
    {
        return await _context.TrainingPlans
            .Include(t => t.Options)
            .Include(t => t.Exercises)
            .Where(t => t.OwnerUid == uid)
            .OrderByDescending(tp => tp.CreationDate)
            .ToListAsync();
    }

    public async Task<TrainingPlan> GetById(int id)
    {
        return await _context.TrainingPlans
            .Include(t => t.Options)
            .Include(t => t.Exercises)
            .Where(t => t.Id == id)
            .FirstAsync();
    }

    public async Task<TrainingPlanOptions?> GetOptionsForUser(string id)
    {
        return await _context.TrainingPlanOptions
            .Include(t => t.TrainingPlan)
            .OrderByDescending(options => options.TrainingPlan.CreationDate)
            .FirstOrDefaultAsync(options => options.TrainingPlan.OwnerUid == id);
    }

    public void EditPlan(TrainingPlan plan)
    {
        _context.TrainingPlans.Update(plan);
    }
}