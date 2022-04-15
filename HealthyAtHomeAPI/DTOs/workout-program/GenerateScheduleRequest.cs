namespace HealthyAtHomeAPI.DTOs.workout_program;

public class GenerateScheduleRequest
{
    public string UserToken { get; set; }

    public int TrainingPlanId { get; set; }

    public DateTime StartDate { get; set; }

    public int NumberOfDays { get; set; }
}