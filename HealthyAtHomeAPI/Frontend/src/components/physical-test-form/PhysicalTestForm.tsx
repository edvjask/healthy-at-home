import React, {useEffect, useState} from "react";
import {planOptions} from "../generate-form/GenerateWorkoutForm";
import "./css/physicalTestForm.css";
import {ExerciseForm} from "./ExerciseForm";
import Typography from "@mui/material/Typography";
import {Alert, Box, Button, Paper, useMediaQuery, useTheme} from "@mui/material";
import {physicalTestExerciseInfo} from "../../helpers/physicalTestHelpers";
import {PhysicalTestResults} from "./PhysicalTestResults";

type PhysicalTestProps = {
  planOptions: planOptions | null;
  updateTrainingPlan: (planOptions: planOptions) => void;
  setFormError: (val: boolean) => void;
  setPhysicalStarted: (val: boolean) => void;
  otherFormErrors: boolean;
};

export const NUMBER_OF_TEST_EXERCISES = 4;

const ExerciseType = {
  Push: "push",
  Pull: "pull",
  Core: "core",
  Legs: "legs",
  Stamina: "stamina",
};

export const PhysicalTestForm: React.FC<PhysicalTestProps> = ({
                                                                planOptions,
                                                                updateTrainingPlan,
                                                                setFormError,
                                                                setPhysicalStarted,
                                                                otherFormErrors,
                                                              }) => {
  const [start, setStart] = useState(false);
  const [step, setStep] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [exerciseInputs, setExerciseInputs] = useState({
    push: "",
    pull: "",
    core: "",
    legs: "",
    stamina: "",
  });

  useEffect(() => {
    if (step <= NUMBER_OF_TEST_EXERCISES) {
      setFormError(true);
    } else {
      setFormError(false);
      setPhysicalStarted(false);
    }
  }, [step]);

  const handleStart = (event: React.MouseEvent<HTMLElement>) => {
    setStart(true);
    setPhysicalStarted(true);
  };

  const renderExercise = (step: number): JSX.Element | null => {
    if (step > NUMBER_OF_TEST_EXERCISES) return null;

    const keys = Object.keys(physicalTestExerciseInfo);
    const currentExerciseKey = keys[step];

    const {name, link, dos, donts, instructions, gif} =
        physicalTestExerciseInfo[
            currentExerciseKey as keyof typeof physicalTestExerciseInfo
            ];

    return (
        <ExerciseForm
            type={currentExerciseKey}
            name={name}
            link={link}
            dos={dos}
            donts={donts}
            instructions={instructions}
            inputValue={
              exerciseInputs[currentExerciseKey as keyof typeof exerciseInputs]
            }
            setInputValue={setExerciseInputs}
            currentExerciseIndex={step}
            goToNextExercise={setStep}
            updateTrainingPlan={updateTrainingPlan}
            planOptions={planOptions}
            gif={gif}
        />
    );
  };

  return (
      <>
        {!start ? (
            <Box
                sx={{
                  justifyContent: "center",
                }}
            >
              <Paper elevation={7} sx={{p: 2, minHeight: 500}}>
                <Typography
                    variant={"h5"}
                    color={"text.secondary"}
                    sx={{
                      mb: 3,
                    }}
                >
                  Time for your fitness evaluation!
                </Typography>
                <Typography
                    variant={"body2"}
                    sx={{
                      mb: 3,
                      fontSize: isMobile ? 14 : 22,
                    }}
                >
                  You will now be asked to complete specific exercises in order to
                  determine your level. <br/> Try to complete as many repetitions as
                  possible and enter your result. <br/> You may rest between the
                  exercises as needed.
                </Typography>
                {/*
          Alert here about form errors if any
          */}
                {otherFormErrors && (
                    <Alert
                        severity="warning"
                        sx={{
                          maxWidth: 350,
                          alignItems: "center",
                          margin: "0 auto",
                        }}
                    >
                      Please go back and finish filling up required fields before
                      proceeding
                    </Alert>
                )}
                <Button
                    variant={"contained"}
                    onClick={handleStart}
                    disabled={otherFormErrors}
                    sx={{
                      mt: 1,
                    }}
                >
                  Start
                </Button>
              </Paper>
            </Box>
        ) : (
            renderExercise(step)
        )}
        {step > NUMBER_OF_TEST_EXERCISES ? (
            <PhysicalTestResults results={planOptions?.physicalResults}/>
        ) : null}
      </>
  );
};
