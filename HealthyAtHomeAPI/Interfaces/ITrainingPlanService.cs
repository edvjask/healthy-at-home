﻿using HealthyAtHomeAPI.DTOs.training_plan;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Interfaces;

public interface ITrainingPlanService
{
    Task<List<TrainingPlanAlternativesGroup>> GenerateAlternativesAsync(NewTrainingPlanRequestDto trainingPlanOptions);
    Task<SaveTrainingPlan> SaveTrainingPlanAsync(SaveTrainingPlan options);
    Task<List<TrainingPlan>> GetAllForUser(string token);

    Task<TrainingPlan> GetById(int id);

    Task<GenericResponse<TrainingPlanOptions?>> GetOptionsForUser();
    Task<GenericResponse<TrainingPlan>> EditPlanExercises(EditPlanRequest request);
}