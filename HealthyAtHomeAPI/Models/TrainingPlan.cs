using System.ComponentModel.DataAnnotations;

namespace HealthyAtHomeAPI.Models;

public class TrainingPlan
{
    public int Id { get; set; }

    [Required] public string Name { get; set; }

    [Required] public string OwnerUid { get; set; }

    public virtual ICollection<Exercise> Exercises { get; set; } = new HashSet<Exercise>();
}