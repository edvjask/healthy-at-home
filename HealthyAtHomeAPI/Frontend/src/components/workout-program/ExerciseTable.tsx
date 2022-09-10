import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {ExerciseSet} from "../../helpers/genericModels";

type ExerciseTableProps = {
    exercise: ExerciseSet;
};

export const ExerciseTable = ({exercise}: ExerciseTableProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const fontSize = isMobile ? "16px" : "18px";
    const maxWidth = isMobile ? 350 : 450;

    const getResultColor = (result: number | undefined, needed: number) => {
        if (!result) return theme.palette.error.light;
        if (result >= needed) return theme.palette.success.light;
        return theme.palette.error.light;
    };

    return (
        <TableContainer component={Box} sx={{maxWidth}}>
            <Table sx={{maxWidth: 330}} aria-label="workout-exercise-table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{color: "text.secondary", fontSize: fontSize}}>Exercise</TableCell>
                        <TableCell sx={{color: "text.secondary", fontSize: fontSize}} align="right">
                            Set #
                        </TableCell>
                        <TableCell sx={{color: "text.secondary", fontSize: fontSize}} align="right">
                            Reps To Do
                        </TableCell>
                        <TableCell sx={{color: "text.secondary", fontSize: fontSize}} align={"right"}>
                            Reps Completed
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercise.exerciseSets.map((row, index) => (
                        <TableRow
                            key={row.orderNo}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                        >
                            <TableCell component="th" scope="row" sx={{fontWeight: "bold", fontSize: fontSize}}>
                                {!index ? exercise.name : null}
                            </TableCell>
                            <TableCell align="right" sx={{color: "#FFF", fontSize: fontSize}}>
                                {row.orderNo}
                            </TableCell>
                            <TableCell sx={{fontSize: fontSize}} align="right">{row.repsToComplete}</TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    color: getResultColor(row.repsCompleted, row.repsToComplete),
                                    fontSize: fontSize
                                }}
                            >
                                {row.repsCompleted !== -1 ? row.repsCompleted : "-"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
