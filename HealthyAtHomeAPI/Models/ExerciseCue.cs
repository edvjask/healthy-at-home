using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.Models;

public class ExerciseCue
{
    public int Id { get; set; }

    public ECueType CueType { get; set; }

    public string Description { get; set; }

    public int ExerciseId { get; set; }

    public Exercise Exercise { get; set; }
}