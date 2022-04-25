namespace HealthyAtHomeAPI.DTOs.workout;

public class GetWorkoutTotals
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int RepsTotalToComplete { get; set; }

    public int RepsTotalCompleted { get; set; }
}