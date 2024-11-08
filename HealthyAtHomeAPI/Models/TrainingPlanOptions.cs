﻿using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.Models;

public class TrainingPlanOptions
{
    public int Id { get; set; }

    public EGender Gender { get; set; }
    public string Height { get; set; }
    public EHeightUnits HeightUnits { get; set; }
    public int Weight { get; set; }
    public EWeightUnits WeightUnits { get; set; }
    public int Age { get; set; }

    public TrainingPlan TrainingPlan { get; set; }
    public ICollection<EInventoryType> InventoryTypes { get; set; } = new HashSet<EInventoryType>();
    public PhysicalResults PhysicalResults { get; set; }
    public EWorkoutGoal WorkoutGoal { get; set; }
    public ICollection<EMuscleGroup> MuscleGroupsWanted { get; set; } = new HashSet<EMuscleGroup>();
}