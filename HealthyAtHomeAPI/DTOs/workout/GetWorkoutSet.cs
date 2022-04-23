namespace HealthyAtHomeAPI.DTOs.workout;

public class GetWorkoutSet
{
    public int Id { get; set; }
    public int OrderNo { get; set; }

    public int RepsToComplete { get; set; }

    public int RepsCompleted { get; set; }
}