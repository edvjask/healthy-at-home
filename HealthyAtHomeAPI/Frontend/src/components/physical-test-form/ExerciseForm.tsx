import React, {ChangeEvent, SetStateAction, useState} from "react";
import Typography from "@mui/material/Typography";
import {ExerciseCue} from "./ExerciseCue";
import {Box, Button, Paper, TextField} from "@mui/material";
import {isNumberPositive, isNumberPositiveAndLessThanValue} from "../../helpers/inputValidator";
import {getPhysicalResultForType} from "../../helpers/physicalTestHelpers";
import {NUMBER_OF_TEST_EXERCISES} from "./PhysicalTestForm";
import {planOptions} from "../generate-form/GenerateWorkoutForm";

const typeToResultMap = {
  push: "pushingStrength",
  pull: "pullingStrength",
  legs: "legStrength",
  core: "coreStrength",
  stamina: "stamina",
};

type ExerciseFormProps = {
  type: string;
  name: string;
  link: string;
  dos: string[];
  donts: string[];
  instructions: string;
  inputValue: string;
  setInputValue: SetStateAction<any>;
  currentExerciseIndex: number;
  goToNextExercise: SetStateAction<any>;
  gif: string;
  updateTrainingPlan: (planOptions: planOptions) => void;
  planOptions: planOptions | null;
};

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
                                                            type,
                                                            name,
                                                            link,
                                                            dos,
                                                            donts,
                                                            instructions,
                                                            inputValue,
                                                            setInputValue,
                                                            goToNextExercise,
                                                            currentExerciseIndex,
                                                            updateTrainingPlan,
                                                            planOptions,
                                                            gif,
                                                          }) => {
  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!isNumberPositiveAndLessThanValue(value, 100, true)) {
      setError("Input must be a non-negative and less than 100 value");
    } else {
      setError("");
    }

    setInputValue((prev: any) => ({...prev, [type]: event.target.value}));
  };

  const handleCalculateValue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (isNumberPositive(inputValue)) {
      const level = getPhysicalResultForType(type, inputValue);
      updateTrainingPlan({
        ...planOptions,
        physicalResults: {
          ...planOptions?.physicalResults,
          [typeToResultMap[type as keyof typeof typeToResultMap]]: level,
        },
      });
    }
    if (currentExerciseIndex <= NUMBER_OF_TEST_EXERCISES) {
      goToNextExercise(currentExerciseIndex + 1);
    }
  };

  return (
      <Paper elevation={7} sx={{p: 2, minHeight: 500}}>
        <section className={"section"}>
          <div className={"section__item section__item--start"}>
            <Typography
                variant={"h5"}
                color={"text.secondary"}
                sx={{
                  mb: 4,
                }}
            >
              {name}
            </Typography>
            <Box
                className={"media-box"}
                sx={{
                  display: "flex",
                  gap: 1,
                }}
            >
              <iframe
                  className={"test-video"}
                  src={link}
                  title="Exercise Link"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
              />
              <img className={"test-video"} src={gif} alt={name + "gif"}/>
            </Box>
          </div>
          <div className={"section__item section__item--end"}>
            <Typography variant={"subtitle1"} color={"text.secondary"}>
              {instructions}
            </Typography>
            <Box
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  gap: 2,
                  mt: 3,
                }}
            >
              <Box>
                {dos.map((val) => (
                    <ExerciseCue good name={val} key={val}/>
                ))}
              </Box>
              <Box>
                {donts.map((val) => (
                    <ExerciseCue name={val} key={val}/>
                ))}
              </Box>
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
                  id="test-result-exercise"
                  label="Max repetitions you can do"
                  error={Boolean(error)}
                  helperText={error}
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
                {!inputValue ? "Skip" : "Calculate"}
              </Button>
            </Box>
          </div>
        </section>
      </Paper>
  );
};
