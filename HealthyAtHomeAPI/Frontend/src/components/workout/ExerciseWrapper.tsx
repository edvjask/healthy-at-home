import fallbackImage from "../../images/fallback-image.png";
import {Box, Button, TextField} from "@mui/material";
import {ExerciseCue} from "../physical-test-form/ExerciseCue";
import Typography from "@mui/material/Typography";
import {isNumberPositiveAndLessThanValue} from "../../helpers/inputValidator";
import React from "react";
import {ExerciseSetInfo, GetExerciseCue} from "../../helpers/genericModels";

type ExerciseWrapperProps = {
    id: number;
    dos: Array<GetExerciseCue>;
    donts: Array<GetExerciseCue>;
    currentExerciseSet: ExerciseSetInfo;
    inputError: string;
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCalculateValue: (e: React.MouseEvent<HTMLElement>) => void;
    currentSetIndex: number;
    currentExerciseSetLength: number;
    getNextExerciseName: () => string;
};

export const ExerciseWrapper = ({
                                    id,
                                    dos,
                                    donts,
                                    currentExerciseSet,
                                    handleCalculateValue,
                                    handleInputChange,
                                    inputError,
                                    inputValue,
                                    currentExerciseSetLength,
                                    currentSetIndex,
                                    getNextExerciseName,
                                }: ExerciseWrapperProps) => {
    return (
        <>
            <Typography variant={"h6"} color={"primary.secondary"}>
                Set {`${currentSetIndex + 1} / ${currentExerciseSetLength}`}
            </Typography>
            <img
                id={`${id}-exercise`}
                src={`${process.env.REACT_APP_IMAGE_BASE_URL}/exercise/${id}.gif`}
                onError={({currentTarget}) => {
                    currentTarget.onerror = null;
                    currentTarget.src = fallbackImage;
                }}
                className={"exercise-gif"}
                alt={`exercise-gif`}
                style={{
                    marginTop: "15px",
                }}
            />
            <Box
                sx={{
                    justifyContent: "center",
                    display: "flex",
                    gap: 2,
                    m: 3,
                }}
            >
                <Box>
                    {dos.map((val, index) => (
                        <ExerciseCue good name={val.instructions} key={index}/>
                    ))}
                </Box>
                <Box>
                    {donts.map((val, index) => (
                        <ExerciseCue name={val.instructions} key={index}/>
                    ))}
                </Box>
            </Box>
            <Typography variant={"h6"} color={"primary.secondary"} display={"inline"}>
                Repetitions to complete :
            </Typography>
            <Typography variant={"h6"} color={"text.secondary"} display={"inline"}>
                {` ${currentExerciseSet.repsToComplete}`}
            </Typography>
            <Box>
                <Typography variant={"h6"} color={"text.secondary"} display={"inline"}>
                    Coming up next :
                </Typography>
                <Typography variant={"h6"} color={"primary.main"} display={"inline"}>
                    {` ${getNextExerciseName()}`}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    gap: 2,
                }}
            >
                <TextField
                    id="exercise-result"
                    label="Repetitions completed"
                    error={Boolean(inputError)}
                    helperText={inputError}
                    placeholder="Amount of reps"
                    variant="standard"
                    value={inputValue}
                    onChange={handleInputChange}
                    sx={{
                        width: 250,
                    }}
                />
                <Button
                    variant={"contained"}
                    sx={{
                        height: "40px",
                    }}
                    onClick={handleCalculateValue}
                    disabled={!isNumberPositiveAndLessThanValue(inputValue, 100, true)}
                >
                    {!inputValue ? "Skip" : "Next"}
                </Button>
            </Box>
        </>
    );
};
