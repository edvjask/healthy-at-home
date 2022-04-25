using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.DTOs.exercise;

public class ExerciseInfoResponse
{
    public int Id { get; set; }
    public string? Name { get; set; }

    public string? Instructions { get; set; }

    public ICollection<ExerciseCue> ExerciseCues { get; set; } = new List<ExerciseCue>();

    public ELevelsOfDifficulty ExerciseDifficulty { get; set; }
    public ICollection<EInventoryType> InventoryTypes { get; set; } = new List<EInventoryType>();
    public ICollection<EMuscleGroup> MuscleGroups { get; set; } = new List<EMuscleGroup>();
    public EExerciseType ExerciseType { get; set; }
    public string? YoutubeLink { get; set; }

    public int? HarderVariationId { get; set; }

    public string? HarderVariationName { get; set; }

    public string? EasierVariationName { get; set; }

    public int? EasierVariationId { get; set; }
}