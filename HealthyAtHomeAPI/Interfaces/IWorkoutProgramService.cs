﻿using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.DTOs.workout_program;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Interfaces;

public interface IWorkoutProgramService
{
    Task<GenericResponse<NewWorkoutProgramResponse>> GenerateSchedule(GenerateScheduleRequest generateScheduleRequest);

    Task<GenericResponse<string>> DeleteProgram(DeleteProgramRequest request, int id);

    Task<GenericResponse<WorkoutProgram>> GetProgramByTrainingPlanId(int id);

    Task<GenericResponse<WorkoutProgramSummaryResponse>> GetSummaryById(WorkoutProgramRequest request);

    Task<GenericResponse<List<GetWorkoutProgram>>> GetWorkoutProgramsForUser(string uid);

    Task<GenericResponse<GetWorkoutInfo>> GetWorkoutInfoById(WorkoutInfoRequest request);

    Task<GenericResponse<WorkoutMetricsResponse>> GetWorkoutMetrics(string token, int workoutId);

    Task<GenericResponse<SaveResultsResponse>> SaveWorkoutResults(SaveResultsRequest request);

    Task<GenericResponse<Workout>> EditWorkout(EditWorkoutRequest request, int id);
}