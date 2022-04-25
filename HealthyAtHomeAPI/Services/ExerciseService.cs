using FirebaseAdmin.Auth;
using HealthyAtHomeAPI.DTOs;
using HealthyAtHomeAPI.DTOs.exercise;
using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Repository;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Services;

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepository;

    public ExerciseService(IExerciseRepository exerciseRepository)
    {
        _exerciseRepository = exerciseRepository;
    }

    public async Task<GenericResponse<List<Exercise>>> GetAllExercises()
    {
        var exercises = await _exerciseRepository.GetAll();
        return GenericResponse<List<Exercise>>.SuccessResponse(exercises);
    }

    public async Task<GenericResponse<ExerciseInfoResponse>> GetInfoById(int id)
    {
        var exercise = await _exerciseRepository.GetDetailsById(id);

        return exercise != null
            ? GenericResponse<ExerciseInfoResponse>.SuccessResponse(exercise)
            : GenericResponse<ExerciseInfoResponse>.ErrorResponse("Exercise not found");
    }

    public async Task<GenericResponse<List<GetWorkoutResultSet>>> GetResultsForUser(RequestTokenBody request, int id)
    {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.Token);

        var workoutSets = await _exerciseRepository.GetResultsForLastNWorkouts(id, decodedToken.Uid, 3);

        return GenericResponse<List<GetWorkoutResultSet>>.SuccessResponse(workoutSets);
    }
}