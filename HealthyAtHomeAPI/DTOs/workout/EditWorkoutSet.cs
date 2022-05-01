using System.Text.Json.Serialization;

namespace HealthyAtHomeAPI.DTOs.workout;

public class EditWorkoutSet
{
    public int Id { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? RepsToComplete { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? RepsCompleted { get; set; }
}