import {Box} from "@mui/material";
import {SetResult, WorkoutInfo} from "../../helpers/genericModels";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import "../physical-test-form/css/physicalTestForm.css";
import {CueType} from "../../enums/planOptionEnums";
import {isNumberPositiveAndLessThanValue} from "../../helpers/inputValidator";
import {ExerciseWrapper} from "./ExerciseWrapper";
import {RestWrapper} from "./RestWrapper";
import {WorkoutProgressBar} from "./WorkoutProgressBar";
import {WorkoutResultsGrid} from "./WorkoutResults";
import {SaveResultsRequest, saveWorkoutResults,} from "../../services/workoutProgramService";
import {useUserContext} from "../../contexts/UserAuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

type WorkoutExerciseProps = {
  workoutExercises: WorkoutInfo;
  setTimerOn: (val: boolean) => void;
  timeElapsed: number;
};

export const WorkoutExercise = ({
                                  workoutExercises,
                                  setTimerOn,
                                  timeElapsed,
                                }: WorkoutExerciseProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const totalSetCount = workoutExercises.exercisesWithSets
      .map((val, index) => {
        return val.exerciseSets.length;
      })
      .reduce((prev, current) => {
        return prev + current;
      }, 0);
  // MIN = Minimum expected value - 1
  // MAX = Maximium expected value - setCount
  const MIN = 0;
  const MAX = totalSetCount;
  // Function to normalise the values (MIN / MAX could be integrated)
  const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [workoutResults, setWorkoutResults] = useState<Array<SetResult>>([]);
  const [showRest, setShowRest] = useState(false);
  const [inputError, setInputError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

  const {user} = useUserContext();
  const {openWithMessage} = useSnackbarContext();

  const currentExercise =
      workoutExercises.exercisesWithSets[currentExerciseIndex];
  const {name, id} = currentExercise;
  const currentExerciseSet = currentExercise.exerciseSets[currentSetIndex];

  const dos = currentExercise.exerciseCues.filter(
      (ec) => ec.cueType === CueType.Do
  );
  const donts = currentExercise.exerciseCues.filter(
      (ec) => ec.cueType === CueType.Dont
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isNumberPositiveAndLessThanValue(value, 100, true)) {
      setInputError("Input must be a non-negative and less than 100 value");
    } else {
      setInputError("");
    }

    setInputValue(value);
  };

  const calculateNextSet = () => {
    //if last set in exercise go to next
    if (currentSetIndex + 1 === currentExercise.exerciseSets.length) {
      //if last exercise finish
      if (
          currentExerciseIndex + 1 ===
          workoutExercises.exercisesWithSets.length
      ) {
        setIsFinished(true);
        setTimerOn(false);
        return;
      }

      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSetIndex(0);
      return;
    }

    setCurrentSetIndex((prev) => prev + 1);
  };

  const handleCalculateValue = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setProgress((prev) => prev + 1);
    if (inputValue) {
      setWorkoutResults((prev) => [
        ...prev,
        {
          id: currentExerciseSet.id,
          repsCompleted: parseInt(inputValue),
        },
      ]);

      calculateNextSet();

      setShowRest(true);

      setInputValue("");
    } else {
      //else go to next exercise
      calculateNextSet();
    }
  };

  const submitResults = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setSubmitLoading(true);
    //do request to backend and if success redirect back to schedules ON THIS workout
    const token = await user?.getIdToken();
    if (token) {
      const request: SaveResultsRequest = {
        setsResults: workoutResults,
        token: token,
        workoutId: workoutExercises.id,
        timeElapsedMs: timeElapsed,
      };
      const response = await saveWorkoutResults(request);

      setSubmitLoading(false);
      if (response && response.data.success) {
        const {success, message} = response.data;
        success && navigate(`/schedules/${params.id}`, {state: workoutExercises.id});
        if (!success) openWithMessage(message ?? "Server error");
      } else {
        openWithMessage(NO_RESPONSE_LABEL);
      }
    }
  };

  const getNextExerciseName = () => {
    //if last set
    if (currentSetIndex + 1 === currentExercise.exerciseSets.length) {
      //if last exercise finish
      if (
          currentExerciseIndex + 1 ===
          workoutExercises.exercisesWithSets.length
      ) {
        return "-";
      }
      const name =
          workoutExercises.exercisesWithSets[currentExerciseIndex + 1].name;

      return !!inputValue ? "Rest" : name;
    }
    return !!inputValue ? "Rest" : currentExercise.name;
  };

  return (
      <Box>
        {!isFinished && (
            <>
              <Typography variant={"h5"} color={"primary.secondary"}>
                Now doing:
              </Typography>
              <Typography variant={"h5"} color={"text.secondary"}>
                {showRest ? "Rest" : name}
              </Typography>
            </>
        )}

        {!showRest && !isFinished ? (
            <ExerciseWrapper
                id={id}
                dos={dos}
                donts={donts}
                currentExerciseSet={currentExerciseSet}
                inputError={inputError}
                inputValue={inputValue}
                handleInputChange={handleInputChange}
                handleCalculateValue={handleCalculateValue}
                currentSetIndex={currentSetIndex}
                currentExerciseSetLength={currentExercise.exerciseSets.length}
                getNextExerciseName={getNextExerciseName}
            />
        ) : !isFinished ? (
            <RestWrapper
                restAmountMs={workoutExercises.restPeriodMs}
                setShowRest={setShowRest}
                getNextExerciseName={getNextExerciseName}
            />
        ) : null}
        {isFinished && (
            <>
              <WorkoutResultsGrid
                  workoutResults={workoutResults}
                  workoutExercises={workoutExercises}
              />
              <LoadingButton
                  loading={submitLoading}
                  loadingPosition={"center"}
                  variant={"contained"}
                  onClick={submitResults}
                  sx={{
                    m: 1,
                  }}
              >
                Save
              </LoadingButton>
            </>
        )}
        {!isFinished && (
            <WorkoutProgressBar normalizedProgress={normalise(progress)}/>
        )}
      </Box>
  );
};
