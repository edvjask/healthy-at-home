namespace HealthyAtHomeAPI.Models;

public class Workout
{
    public int Id { get; set; }

    public int OrderNr { get; set; }

    public DateTime Date { get; set; }

    public bool Completed { get; set; } = false;

    public int TimeElapsedMs { get; set; } = 0;

    public int RestAmountMs { get; set; } = 60 * 1000;

    public WorkoutProgram WorkoutProgram { get; set; }

    public ICollection<WorkoutSet> WorkoutSets { get; set; }
}