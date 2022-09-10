import Typography from "@mui/material/Typography";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {editPlan, GetTrainingPlan} from "../../services/trainingPlanService";
import {getLocalDateFromString} from "../../helpers/genericHelpers";
import React, {useEffect, useState} from "react";
import {exerciseService} from "../../services/exerciseService";
import {Exercise} from "../../helpers/genericModels";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {LoadingButton} from "@mui/lab";
import {Alert, Autocomplete, Box, CircularProgress, Paper, TextField} from "@mui/material";
import {useUserContext} from "../../contexts/UserAuthContext";

interface ExerciseOptionType {
    id: number,
    label: string,
}

export const EditPlan = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const {user} = useUserContext();
    const {openWithMessage} = useSnackbarContext();

    const trainingPlan = state as GetTrainingPlan;

    const {
        id,
        creationDate,
        exercises,
        options,
    } = trainingPlan;

    const defaultExercises = exercises.map(e => {
        return {id: e.id, label: e.name}
    });

    const [exercisesFromDb, setExercisesFromDb] = useState<Exercise[] | null>();
    const [chosenExercises, setChosenExercises] = useState(defaultExercises);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const checkIfApplicable = (id: number) => {
        const exercise = exercisesFromDb?.find(ex => ex.id === id);
    }

    useEffect(() => {
        const getAllExercises = async () => {
            setLoading(true);
            const resp = await exerciseService.getAll();
            if (resp) {
                const {data, success, message} = resp.data;
                if (success) setExercisesFromDb(data);
                else openWithMessage(message ?? "Server error");
            } else {
                openWithMessage("No response from the server");
            }
            setLoading(false);
        }
        getAllExercises();
    }, []);


    const renderWarnings = () => {
        return (
            <Box>
                {warnings.map(warning => (
                    <Alert color={'warning'}>
                        {warning}
                    </Alert>
                ))}
            </Box>
        )
    }

    const handleSubmit = async () => {
        const token = await user?.getIdToken();
        const exerciseIds = chosenExercises.map(exercise => exercise.id);
        const response = await editPlan(token!!, exerciseIds, id);
        if (response) {
            const {data, success, message} = response.data;
            if (success) navigate("/training-plans");
            else openWithMessage(message ?? "Server error");
        } else {
            openWithMessage("No response from the server");
        }

    }

    return (
        <>
            <Typography variant={'h4'}>
                Edit Plan
            </Typography>
            <Typography variant={'h5'} color={"text.secondary"} sx={{mt: 1}}>
                Creation Date: {getLocalDateFromString(creationDate)}
            </Typography>
            {renderWarnings()}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                m: 2,
            }}>

                {!loading ? exercisesFromDb ? exercises.map((exercise, index) => {

                    const availableExercises = exercisesFromDb
                        .filter(dbExercise => exercise.exerciseType === dbExercise.exerciseType)
                        .map(exercise => {
                            return {id: exercise.id, label: exercise.name}
                        });

                    return (
                        <Paper key={exercise.id} elevation={2} sx={{p: 2,}}>
                            <Autocomplete
                                options={availableExercises}
                                id={`${exercise.id}-autocomplete`}
                                value={chosenExercises[index]}
                                onChange={(event: any, newValue: ExerciseOptionType | null) => {
                                    if (newValue) {
                                        let chosenCopy = [...chosenExercises];
                                        chosenCopy[index] = newValue;
                                        setChosenExercises(chosenCopy);
                                        checkIfApplicable(newValue.id);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                               label="Exercise Name"
                                               variant="standard"
                                               helperText={"Select another exercise"}
                                    />
                                )}
                                sx={{
                                    width: 250
                                }}
                            />
                        </Paper>
                    )
                }) : <p>Failed to get exercises</p> : <CircularProgress sx={{m: 2}}/>}

            </Box>
            <LoadingButton
                variant={'contained'}
                onClick={handleSubmit}
                loading={loading}
            >
                Save
            </LoadingButton>
        </>
    )
}