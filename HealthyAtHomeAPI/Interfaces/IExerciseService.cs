using HealthyAtHomeAPI.DTOs;
using HealthyAtHomeAPI.DTOs.exercise;
using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Interfaces;

public interface IExerciseService
{
    Task<GenericResponse<List<Exercise>>> GetAllExercises();

    Task<GenericResponse<ExerciseInfoResponse>> GetInfoById(int id);

    Task<GenericResponse<List<GetWorkoutResultSet>>> GetResultsForUser(RequestTokenBody request, int id);

    Task<GenericResponse<Exercise>> AddNewExercise(AddExerciseRequest request);

    Task<GenericResponse<bool>> AddGif(IFormFile file, int id);
}