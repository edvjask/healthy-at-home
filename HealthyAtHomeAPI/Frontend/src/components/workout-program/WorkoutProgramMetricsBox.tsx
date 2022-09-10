import {Box, Paper} from "@mui/material";
import {WorkoutProgramMetrics} from "../../services/workoutProgramService";
import Typography from "@mui/material/Typography";
import {getFormattedTimeFromMs} from "../../helpers/genericHelpers";
import {TotalsGraph} from "./TotalsGraph";

type WorkoutProgramMetricsBoxProps = {
    results: WorkoutProgramMetrics;
};

export const WorkoutProgramMetricsBox = ({
                                             results,
                                         }: WorkoutProgramMetricsBoxProps) => {
    const {totalWorkoutTimeMs, missedWorkoutsCount, workoutTotalsList} = results;


    return (
        <Paper
            sx={{
                mt: 2,
                mb: 2,
                p: 2,
            }}
        >
            <Typography
                variant={"h5"}
                color={"text.secondary"}
                sx={{
                    mb: 2,
                }}
            >
                Metrics
            </Typography>
            <Box
                sx={{
                    display: "block",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        <Typography fontWeight={"bold"} display={"inline"}>
                            Total Time Spent Working Out :
                        </Typography>
                        <Typography color={"text.secondary"} display={"inline"}>
                            {getFormattedTimeFromMs(totalWorkoutTimeMs)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        <Typography fontWeight={"bold"} display={"inline"}>
                            Workouts Missed :
                        </Typography>
                        <Typography color={"text.secondary"} display={"inline"}>
                            {missedWorkoutsCount}
                        </Typography>
                    </Box>
                </Box>
                <TotalsGraph totals={workoutTotalsList}/>
            </Box>
        </Paper>
    );
};