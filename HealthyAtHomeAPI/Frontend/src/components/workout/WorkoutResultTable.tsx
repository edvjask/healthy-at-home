import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Fragment} from "react";
import {SetResult, WorkoutInfo} from "../../helpers/genericModels";

type WorkoutResultTableProps = {
    workoutExercises: WorkoutInfo,
    workoutResults: Array<SetResult>;
}

export const WorkoutResultTable = ({workoutExercises, workoutResults}: WorkoutResultTableProps) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const tableWidth = isMobile ? 330 : 380;

    const getResultColor = (result: number | undefined, needed: number) => {
        if (!result) return theme.palette.error.light;
        if (result >= needed) return theme.palette.success.light;
        return theme.palette.error.light;
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Paper elevation={5} sx={{p: 2}}>
                {isMobile && <Typography variant={'h6'}>Results:</Typography>}
                <TableContainer
                    component={Box}
                    sx={{
                        width: tableWidth,
                        margin: "0 auto",
                        maxHeight: 500,
                        overflowY: "scroll",
                    }}
                >
                    <Table sx={{maxWidth: 330}} aria-label="workout-exercise-table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{color: "text.secondary"}}>Exercise</TableCell>
                                <TableCell sx={{color: "text.secondary"}} align="right">
                                    Set #
                                </TableCell>
                                <TableCell sx={{color: "text.secondary"}} align="right">
                                    Reps To Do
                                </TableCell>
                                <TableCell sx={{color: "text.secondary"}} align={"right"}>
                                    Reps Completed
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workoutExercises.exercisesWithSets.map((exercise) => {
                                return (
                                    <Fragment key={exercise.id}>
                                        {exercise.exerciseSets.map((row, index) => {
                                            const result = workoutResults.find(
                                                (result) => result.id === row.id
                                            );

                                            return (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": {border: 0},
                                                    }}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        sx={{fontWeight: "bold"}}
                                                    >
                                                        {!index ? exercise.name : null}
                                                    </TableCell>
                                                    <TableCell align="right" sx={{color: "#FFF"}}>
                                                        {row.orderNo}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.repsToComplete}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        sx={{
                                                            color: getResultColor(
                                                                result?.repsCompleted,
                                                                row.repsToComplete
                                                            ),
                                                        }}
                                                    >
                                                        {result?.repsCompleted ?? "-"}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}