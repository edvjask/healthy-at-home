using System.ComponentModel.DataAnnotations;
using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.Models;

public class Exercise
{
    public int Id { get; set; }

    [Required] public string Name { get; set; }

    [MaxLength(200)] public string? Description { get; set; }

    public ELevelsOfDifficulty ExerciseDifficulty { get; set; }
    public ICollection<EInventoryType> InventoryTypes { get; set; } = new List<EInventoryType>();
    public ICollection<EMuscleGroups> MuscleGroups { get; set; } = new List<EMuscleGroups>();
    public EExerciseType ExerciseType { get; set; }
    public string? YoutubeLink { get; set; }

    public int? HarderVariationId { get; set; }
    public int? EasierVariationId { get; set; }

    public virtual ICollection<TrainingPlan> TrainingPlans { get; set; } = new HashSet<TrainingPlan>();
}