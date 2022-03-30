using HealthyAtHomeAPI.Enumerators;
using HealthyAtHomeAPI.Models;

namespace HealthyAtHomeAPI.DTOs.training_plan;

public class NewTrainingPlanRequestDto
{
    public EGender Gender { get; set; }
    public string Height { get; set; }
    public EHeightUnits HeightUnits { get; set; }
    public int Weight { get; set; }
    public EWeightUnits WeightUnits { get; set; }
    public int Age { get; set; }

    public ICollection<EInventoryType> InventoryTypes { get; set; } = new List<EInventoryType>();
    public PhysicalResults PhysicalResults { get; set; }
    public EWorkoutGoal WorkoutGoal { get; set; }
    public ICollection<EMuscleGroup> MuscleGroupsWanted { get; set; } = new List<EMuscleGroup>();
}