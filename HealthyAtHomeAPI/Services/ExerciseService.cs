using AutoMapper;
using FirebaseAdmin.Auth;
using HealthyAtHomeAPI.DTOs;
using HealthyAtHomeAPI.DTOs.exercise;
using HealthyAtHomeAPI.DTOs.exercise_cue;
using HealthyAtHomeAPI.DTOs.workout;
using HealthyAtHomeAPI.Helpers;
using HealthyAtHomeAPI.Interfaces;
using HealthyAtHomeAPI.Models;
using HealthyAtHomeAPI.Repository;
using HealthyAtHomeAPI.Services.Communication;

namespace HealthyAtHomeAPI.Services;

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private static readonly long MAX_FILE_SIZE_IN_BYTES = 6_000_000;

    public ExerciseService(IExerciseRepository exerciseRepository, IMapper mapper,
        IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
    {
        _exerciseRepository = exerciseRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _webHostEnvironment = webHostEnvironment;
        _httpContextAccessor = httpContextAccessor;
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

    public async Task<GenericResponse<Exercise>> AddNewExercise(AddExerciseRequest request)
    {
        var isAdmin = await FirebaseHelper.IsUserAdmin(request.Token);
        if (!isAdmin) throw new UnauthorizedAccessException("Insufficient permissions for this action.");

        var newExercise = _mapper.Map<AddExerciseDto, Exercise>(request.AddExerciseDto);
        var cues = request.AddExerciseDto.ExerciseCues
            .Select(cue => _mapper.Map<AddExerciseCue, ExerciseCue>(cue))
            .ToList();

        newExercise.ExerciseCues = cues;

        await _exerciseRepository.AddNew(newExercise);
        await _unitOfWork.CompleteAsync();

        await ValidateAndUpdateVariations(request.AddExerciseDto, newExercise.Id);
        await _unitOfWork.CompleteAsync();

        return GenericResponse<Exercise>.SuccessResponse(newExercise);
    }

    public async Task<GenericResponse<bool>> AddGif(IFormFile file, int id)
    {
        var token = GetAuthToken();
        if (token is null)
            throw new UnauthorizedAccessException("Access token not provided");
        var isAdmin = await FirebaseHelper.IsUserAdmin(token);
        if (!isAdmin) throw new UnauthorizedAccessException("Insufficient permissions for this action");

        var exercise = await _exerciseRepository.GetById(id);
        if (exercise is null) throw new ApplicationException("Exercise does not exist");

        if (file is null)
            throw new ApplicationException("File not provided");

        if (file.Length > MAX_FILE_SIZE_IN_BYTES)
            throw new ApplicationException("File not added or it exceeds maximum filesize (6MB)");

        var ext = file.FileName.Split('.').Last();
        var filePath = _webHostEnvironment.WebRootPath + "\\exercise\\";

        if (ext is not "gif")
            throw new ApplicationException("Only .gif file extensions are allowed");

        var fileName = $"{id}.{ext}";
        using (var stream = File.Create(filePath + fileName))
        {
            await file.CopyToAsync(stream);
        }

        return GenericResponse<bool>.SuccessResponse(true);
    }

    private async Task ValidateAndUpdateVariations(AddExerciseDto addExerciseDto, int newId)
    {
        var easierId = addExerciseDto.EasierVariationId;
        if (easierId.HasValue)
        {
            var exercise = await _exerciseRepository.GetById(easierId.Value);
            if (exercise is not null)
            {
                if (exercise.HarderVariationId.HasValue)
                    throw new ApplicationException("Easier variation cannot be set");
                exercise.HarderVariationId = newId;
                _exerciseRepository.Update(exercise);
            }
        }

        var harderId = addExerciseDto.HarderVariationId;
        if (harderId.HasValue)
        {
            var exercise = await _exerciseRepository.GetById(harderId.Value);
            if (exercise is not null)
            {
                if (exercise.EasierVariationId.HasValue)
                    throw new ApplicationException("Harder variation cannot be set");
                exercise.EasierVariationId = newId;
                _exerciseRepository.Update(exercise);
            }
        }

        
    }

    private string? GetAuthToken()
    {
        return _httpContextAccessor.HttpContext.Request.Headers["Authorization"]
            .ToString().Substring(7);
    }
}