namespace HealthyAtHomeAPI.DTOs.workout_program;

public class GetWorkoutProgram
{
    public int Id { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int TrainingPlanId { get; set; }

    public string TrainingPlanName { get; set; }

    public int WorkoutCount { get; set; }
}