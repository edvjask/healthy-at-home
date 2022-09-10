import {WorkoutTotals} from "../../services/workoutProgramService";
import {transformMetricsResultsForLineGraph} from "../../helpers/workoutProgramHelpers";
import {LineGraph} from "../global/LineGraph";

type TotalsGraphProps = {
    totals: WorkoutTotals[]
}

export const TotalsGraph = ({totals}: TotalsGraphProps) => {

    const transformedData = transformMetricsResultsForLineGraph(totals);

    return (
        <LineGraph data={transformedData} xAxisLabel={'Workouts'} yAxisLabel={'Total Repetitions'}/>
    );
}