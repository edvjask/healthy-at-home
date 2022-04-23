using HealthyAtHomeAPI.Enumerators;

namespace HealthyAtHomeAPI.DTOs.exercise_cue;

public class GetExerciseCue
{
    public ECueType CueType { get; set; }

    public string Instructions { get; set; }
}