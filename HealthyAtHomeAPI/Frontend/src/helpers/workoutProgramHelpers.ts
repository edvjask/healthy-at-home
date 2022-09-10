import {WorkoutTotals} from "../services/workoutProgramService";


export const transformMetricsResultsForLineGraph = (data: WorkoutTotals[]) => {
    let completed: Array<{ x: string, y: number }> = [];
    let toComplete: Array<{ x: string, y: number }> = [];

    data.forEach(total => {
        toComplete.push({
            x: `${new Date(total.date).toLocaleDateString()}`,
            y: total.repsTotalToComplete
        });
        completed.push({
            x: `${new Date(total.date).toLocaleDateString()}`,
            y: total.repsTotalCompleted
        });
    });

    return [
        {
            id: 'To Complete',
            data: toComplete,
        },
        {
            id: 'Completed',
            data: completed,
        },
    ];
}