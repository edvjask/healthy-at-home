﻿namespace HealthyAtHomeAPI.DTOs.workout;

public class WorkoutSummary
{
    public int Id { get; set; }
    public int OrderNr { get; set; }

    public DateTime Date { get; set; }

    public bool Completed { get; set; }
}