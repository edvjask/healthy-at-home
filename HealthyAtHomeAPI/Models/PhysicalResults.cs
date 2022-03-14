using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.Models;

public class PhysicalResults
{
    public int Id { get; set; }
    public ELevelsOfDifficulty PullingStrength { get; set; }
    public ELevelsOfDifficulty PushingStrength { get; set; }
    public ELevelsOfDifficulty LegStrength { get; set; }
    public ELevelsOfDifficulty Stamina { get; set; }
}