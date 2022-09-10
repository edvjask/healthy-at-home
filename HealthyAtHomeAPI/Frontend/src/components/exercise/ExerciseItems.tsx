import {Exercise} from "../../helpers/genericModels";
import {Box} from "@mui/material";
import {ExerciseListItem} from "./ExerciseListItem";

type ExerciseItemsProps = {
    filteredExercises: Exercise[];
};

export const ExerciseItems = ({filteredExercises}: ExerciseItemsProps) => {
    return (
        <Box
            sx={{
                minWidth: 275,
                mt: 10,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 5,
            }}
        >
            {filteredExercises.map((exercise) => (
                <ExerciseListItem key={exercise.id} exercise={exercise}/>
            ))}
        </Box>
    );
};
