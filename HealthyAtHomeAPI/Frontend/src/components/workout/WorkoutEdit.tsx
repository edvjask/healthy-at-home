import {useLocation, useNavigate} from "react-router-dom";
import {WorkoutInfo} from "../../helpers/genericModels";
import {Alert, Box, IconButton, Paper, TextField, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React, {Fragment, useState} from "react";
import {LoadingButton} from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {isNumberBetween, isNumberPositiveAndLessThanValue} from "../../helpers/inputValidator";
import {useUserContext} from "../../contexts/UserAuthContext";
import {workoutProgramService} from "../../services/workoutProgramService";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export type EditWorkoutSet = {
    id: number,
    repsToComplete: number,
    repsCompleted: number,
}

enum InputType {
    COMPLETED,
    TO_COMPLETE,
}

const getTransformedSets = (info: WorkoutInfo): Array<EditWorkoutSet> => {
    let sets: Array<EditWorkoutSet> = [];
    info.exercisesWithSets.forEach(exercise => {

        sets.push(...exercise.exerciseSets.map(set => {
            return {
                id: set.id,
                repsToComplete: set.repsToComplete,
                repsCompleted: set.repsCompleted
            };
        }));
    });
    return sets;
};

const getDefaultErrors = (info: WorkoutInfo) => {
    let errors: Record<string, { completedError: string, toCompleteError: string }> = {};
    info.exercisesWithSets.forEach(exercise => {
        exercise.exerciseSets.forEach(set => errors[set.id] =
            {completedError: "", toCompleteError: ""});
    });
    return errors;
};

const MIN_TO_COMPLETE_REPS = 2;
const MAX_REPS = 100;
const VALUE_OUT_OF_BONDS_COMPLETED = `Value should be between 0 and ${MAX_REPS}`;
const VALUE_OUT_OF_BOUNDS = `Value should be between ${MIN_TO_COMPLETE_REPS} and ${MAX_REPS}`;

export const WorkoutEdit = () => {

    const {state} = useLocation();
    const {openWithMessage} = useSnackbarContext();
    const navigate = useNavigate();
    const {user} = useUserContext();
    const theme = useTheme();
    const workoutInfo = state as WorkoutInfo;

    const [exerciseSets, setExerciseSets] = useState(getTransformedSets(workoutInfo));
    const [inputErrors, setInputErrors] = useState(getDefaultErrors(workoutInfo));
    const [exerciseIdEnabled, setExerciseIdEnabled] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const hasInputErrors = Object.values(inputErrors)
        .some(error => Boolean(error.toCompleteError) || Boolean(error.completedError));

    const isSaveDisabled = hasInputErrors || Boolean(exerciseIdEnabled);

    const toggleEnableSet = (e: React.MouseEvent<HTMLElement>, id: number) => {
        setExerciseIdEnabled(prev => prev ? null : id);
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: number, type: InputType) => {
        const setsCopy = [...exerciseSets];
        let index = setsCopy.findIndex(_set => _set.id === id);
        const inputVal = e.target.value;

        switch (type) {
            case InputType.COMPLETED:
                setsCopy[index].repsCompleted = parseInt(e.target.value);
                break;
            case InputType.TO_COMPLETE:
                setsCopy[index].repsToComplete = parseInt(e.target.value);
                break;
        }
        validateValue(inputVal, id, type);
        setExerciseSets(setsCopy);
    };

    const validateValue = (input: string, setId: number, type: InputType) => {
        const errorsCopy = inputErrors[setId];
        switch (type) {
            case InputType.COMPLETED:
                setInputErrors(prev => ({
                    ...prev, [setId]:
                        {
                            ...errorsCopy,
                            completedError: !isNumberPositiveAndLessThanValue(input, 100, true) ? VALUE_OUT_OF_BONDS_COMPLETED : ""
                        }
                }));
                break;
            case InputType.TO_COMPLETE:
                setInputErrors(prev => ({
                    ...prev, [setId]:
                        {
                            ...errorsCopy,
                            toCompleteError: !isNumberBetween(input, MIN_TO_COMPLETE_REPS, 100) ? VALUE_OUT_OF_BOUNDS : ""
                        }
                }));
                break;
        }

    };

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            const token = await user?.getIdToken();
            const transformedSets: Array<EditWorkoutSet> = exerciseSets
                .map(set => (
                    {
                        id: set.id,
                        repsCompleted: isNaN(set.repsCompleted) ? -1 : set.repsCompleted,
                        repsToComplete: set.repsToComplete,
                    }));
            if (token) {
                const response = await workoutProgramService.patchWorkout(transformedSets,
                    workoutInfo.id, token);
                if (response) {
                    const {success, message} = response.data;
                    if (success) {
                        navigate(-1);
                    } else {
                        openWithMessage(message ?? "Server error");
                    }
                } else {
                    openWithMessage(NO_RESPONSE_LABEL)
                }
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{}}>
            <Typography color={"text.secondary"} variant={"h4"}>
                Edit Workout #{workoutInfo.orderNr}
            </Typography>
            <Box sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                textAlign: "left"
            }}>
                {workoutInfo.exercisesWithSets.map(exercise => {
                    return (
                        <Box key={exercise.id} sx={{
                            width: 400,
                            margin: "0 auto",
                            [theme.breakpoints.down('sm')]: {
                                width: 350,
                            }
                        }}>
                            <Paper sx={{p: 2}}>
                                <Typography variant={"h6"} color={"text.secondary"}>{exercise.name}</Typography>
                                <Grid container spacing={2} sx={{alignItems: "center"}}>
                                    <Grid item xs={2}>
                                        Set #
                                    </Grid>
                                    <Grid item xs={4}>
                                        To Do
                                    </Grid>
                                    <Grid item xs={4}>
                                        Done
                                    </Grid>
                                    <Grid item xs={2}>

                                    </Grid>
                                    {exercise.exerciseSets.map(set => {
                                        const editingEnabled = set.id === exerciseIdEnabled;
                                        const setInput = exerciseSets.find(_set => _set.id === set.id);
                                        const hasInputErrors = Boolean(inputErrors[set.id].completedError) ||
                                            Boolean(inputErrors[set.id].toCompleteError);
                                        return (
                                            <Fragment key={set.id}>
                                                <Grid item xs={2} sx={{color: "#fff"}}>
                                                    {set.orderNo}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        variant={"standard"}
                                                        label={"Reps To Do"}
                                                        error={Boolean(inputErrors[set.id].toCompleteError)}
                                                        helperText={inputErrors[set.id].toCompleteError}
                                                        disabled={workoutInfo.completed || !editingEnabled}
                                                        defaultValue={setInput?.repsToComplete}
                                                        onChange={(e) => handleInput(e, set.id, InputType.TO_COMPLETE)}
                                                        InputLabelProps={{shrink: true}}
                                                        sx={{width: 70}}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        variant={"standard"}
                                                        label={"Reps Done"}
                                                        error={Boolean(inputErrors[set.id].completedError)}
                                                        helperText={inputErrors[set.id].completedError}
                                                        disabled={!editingEnabled}
                                                        defaultValue={setInput?.repsCompleted === -1 ? "" : setInput?.repsCompleted}
                                                        onChange={(e) => handleInput(e, set.id, InputType.COMPLETED)}
                                                        InputLabelProps={{shrink: true}}
                                                        sx={{width: 70}}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <IconButton
                                                        disabled={(Boolean(exerciseIdEnabled) && !editingEnabled) ||
                                                            hasInputErrors}
                                                        onClick={(e) => toggleEnableSet(e, set.id)}>
                                                        {editingEnabled ? <CheckIcon/> :
                                                            <EditIcon fill={"#fff"}/>}
                                                    </IconButton>
                                                </Grid>
                                            </Fragment>
                                        );
                                    })}
                                </Grid>
                            </Paper>
                        </Box>
                    );
                })}
            </Box>
            {workoutInfo.completed && (
                <Alert severity={"warning"} sx={{
                    width: 380,
                    mt: 2,
                    margin: "16px auto",
                    alignItems: "center"

                }}>
                    Generated repetitions cannot be edited for completed workouts.
                </Alert>
            )}
            <LoadingButton
                variant={"contained"}
                disabled={isSaveDisabled}
                loading={loading}
                onClick={handleSubmit}
                sx={{
                    mt: 4,
                    mb: 3,
                }}
            >
                Save
            </LoadingButton>
        </Box>
    );

};