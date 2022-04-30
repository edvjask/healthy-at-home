using System.Text.Json.Serialization;
using HealthyAtHomeAPI.DTOs.exercise_cue;
using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.DTOs.exercise;

public class AddExerciseDto
{
    public string Name { get; set; }

    public string? Instructions { get; set; }

    public List<AddExerciseCue> ExerciseCues { get; set; } = new();

    public ELevelsOfDifficulty ExerciseDifficulty { get; set; }
    public ICollection<EInventoryType> InventoryTypes { get; set; } = new List<EInventoryType>();
    public ICollection<EMuscleGroup> MuscleGroups { get; set; } = new List<EMuscleGroup>();
    public EExerciseType ExerciseType { get; set; }
    public string? YoutubeLink { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? HarderVariationId { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? EasierVariationId { get; set; }
}