using HealthyAtHomeAPI.DTOs.workout;

namespace HealthyAtHomeAPI.DTOs.workout_program;

public class WorkoutProgramSummaryResponse
{
    public int Id { get; set; }

    public string OwnerUID { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public List<WorkoutSummary> WorkoutSummaries { get; set; } = new();
}