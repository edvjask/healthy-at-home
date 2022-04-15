namespace HealthyAtHomeAPI.Models;

public class WorkoutSet
{
    public int Id { get; set; }

    public int OrderNr { get; set; }

    public Exercise Exercise { get; set; }

    public Workout Workout { get; set; }

    public int RepsToComplete { get; set; }

    public int RepsCompleted { get; set; }
}