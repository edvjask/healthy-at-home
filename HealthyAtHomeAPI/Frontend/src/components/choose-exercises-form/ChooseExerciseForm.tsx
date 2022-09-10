import {Box, Button, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useContext, useState} from "react";
import {ExerciseContext} from "../../contexts/ExerciseAlternativeContext";
import {AlternativeBox} from "./AlternativeBox";
import {useUserContext} from "../../contexts/UserAuthContext";
import {saveTrainingPlan, TrainingPlan,} from "../../services/trainingPlanService";
import {workoutGoals} from "../generate-form/WorkoutGoal";
import {useNavigate} from "react-router-dom";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export type ExerciseState = Record<string, number[]>;

export const ChooseExerciseForm: React.FC = () => {
    const theme = useTheme();

    const {alternativeGroups, setAlternativeGroups, trainingPlanOptions} =
        useContext(ExerciseContext);
    const {user} = useUserContext();
    const navigate = useNavigate();

    const initialArray: number[] = [];
    alternativeGroups?.forEach((val, index) => {
        initialArray.push(val.exercises[0].id);
    });

    const [exercisesChosen, chooseExercises] = useState<number[] | []>(
        initialArray
    );
    const [exerciseError, setExerciseError] = useState(false);
    const {openWithMessage} = useSnackbarContext();

    const handleSave = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        // @ts-ignore
        const goalLabel = workoutGoals.find((g) => {
            return g.value === trainingPlanOptions?.workoutGoal;
        }).label;

        const userToken = await user?.getIdToken();

        if (userToken) {
            const request: TrainingPlan = {
                name: `Training Plan for ${goalLabel}`,
                exerciseIds: exercisesChosen,
                idToken: userToken,
                planOptions: trainingPlanOptions,
            };
            const response = await saveTrainingPlan(request);
            if (response && response.data) {
                navigate("/training-plans");
            } else {
                openWithMessage(NO_RESPONSE_LABEL);
            }
        }
    };

    return (
        <Box>
            <Typography variant={"h4"}>Choose Exercises</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    textAlign: "center",
                    // [theme.breakpoints.down('md')] : {
                    //     flexDirection: 'column'
                    // }
                    flexDirection: "column",
                }}
            >
                {Boolean(alternativeGroups) &&
                    alternativeGroups?.map((group) => (
                        <AlternativeBox
                            key={group.categoryType}
                            alternativeGroup={group}
                            setExercises={chooseExercises}
                            setValidationError={setExerciseError}
                        />
                    ))}
                <Button
                    variant={"contained"}
                    sx={{
                        mt: 4,
                        mb: 4,
                        width: 150,
                        alignSelf: "center",
                    }}
                    disabled={exerciseError}
                    onClick={handleSave}
                >
                    Save Plan
                </Button>
            </Box>
        </Box>
    );
};
