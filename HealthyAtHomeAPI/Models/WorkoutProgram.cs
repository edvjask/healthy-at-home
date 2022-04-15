namespace HealthyAtHomeAPI.Models;

public class WorkoutProgram
{
    public int Id { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public TrainingPlan TrainingPlan { get; set; }

    public ICollection<Workout> Workouts { get; set; } = new List<Workout>();
}