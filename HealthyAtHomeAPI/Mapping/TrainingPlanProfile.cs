using AutoMapper;
using HealthyAtHomeAPI.DTOs.training_plan;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Mapping;

public class TrainingPlanProfile : Profile
{
    public TrainingPlanProfile()
    {
        CreateMap<NewTrainingPlanRequestDto, TrainingPlanOptions>();
    }
}