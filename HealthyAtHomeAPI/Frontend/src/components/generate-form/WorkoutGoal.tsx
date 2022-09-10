import React from "react";
import Typography from "@mui/material/Typography";
import {planOptions} from "./GenerateWorkoutForm";
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {WorkoutGoal} from "../../enums/planOptionEnums";
import GoalImage from '../../images/training-goal-image.jpg';
import {ImageWithText} from "../../images/ImageWithText";

type WorkoutGoalsProps = {
    planOptions: planOptions | null;
    updateTrainingPlan: (planOptions: planOptions) => void;
};

export const workoutGoals = [
    {
        value: WorkoutGoal.Muscle_Growth,
        label: "Muscle Growth"
    },
    {
        value: WorkoutGoal.Endurance,
        label: "Endurance"
    },
    {
        value: WorkoutGoal.Strength,
        label: "Strength"
    }
];

export const WorkoutGoalForm: React.FC<WorkoutGoalsProps> = ({
                                                                 planOptions,
                                                                 updateTrainingPlan
                                                             }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleWorkoutGoalChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateTrainingPlan({
            ...planOptions,
            workoutGoal: parseInt(event.target.value as keyof WorkoutGoal)
        });
    };

    return (
        <>
            <Typography variant={"h5"} color={"text.secondary"}>
                Select your training goal
            </Typography>
            <hr/>


            <Paper elevation={7} sx={{p: 2, minHeight: 500, display: "flex", justifyContent: 'center'}}>
                <Box display={"flex"} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                }}>
                    {!isMobile && (
                        <>
                            <ImageWithText label={"Training Goal"} image={GoalImage} width={560} height={360}/>
                            <Divider orientation={'vertical'} flexItem/>
                        </>
                    )}
                    <Box>
                        <FormControl sx={{mt: 5}}>
                            <FormLabel id="goal-radio-buttons-group-label">Training Goal</FormLabel>
                            <RadioGroup
                                aria-labelledby="goal-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={planOptions?.workoutGoal}
                                onChange={handleWorkoutGoalChange}
                            >
                                {workoutGoals.map((key) => (
                                    <FormControlLabel
                                        key={key.value}
                                        value={key.value}
                                        control={<Radio/>}
                                        label={key.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Paper>


        </>
    );
};
