using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.DTOs.exercise_cue;

public class AddExerciseCue
{
    public ECueType CueType { get; set; }

    public string Description { get; set; }
}