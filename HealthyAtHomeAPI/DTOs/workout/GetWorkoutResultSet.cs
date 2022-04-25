namespace HealthyAtHomeAPI.DTOs.workout;

public class GetWorkoutResultSet
{
    public int Id { get; set; }
    public int OrderNo { get; set; }

    public DateTime WorkoutDate { get; set; }

    public int RepsToComplete { get; set; }

    public int RepsCompleted { get; set; }
}