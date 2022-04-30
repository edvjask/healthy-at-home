using AutoMapper;
using HealthyAtHomeAPI.DTOs.exercise;
using HealthyAtHomeAPI.DTOs.exercise_cue;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.Mapping;

public class ExerciseProfile : Profile
{
    public ExerciseProfile()
    {
        CreateMap<AddExerciseDto, Exercise>();
        CreateMap<AddExerciseCue, ExerciseCue>();
    }
}