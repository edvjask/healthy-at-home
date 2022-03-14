using System.ComponentModel.DataAnnotations;
using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.Models;

public class TrainingPlanOptions
{
    public int Id { get; set; }

    [Required] public string UserId { get; set; }
    public EGender Gender { get; set; }
    public int Height { get; set; }
    public EHeightUnits HeightUnits { get; set; }
    public int Weight { get; set; }
    public EWeightUnits WeightUnits { get; set; }
    public int Age { get; set; }
    public ICollection<EInventoryType> InventoryTypes { get; set; } = new List<EInventoryType>();
    public PhysicalResults PhysicalResults { get; set; }
}