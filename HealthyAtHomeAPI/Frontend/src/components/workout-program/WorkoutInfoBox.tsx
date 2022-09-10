import {Box, Button, CircularProgress, Paper, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useUserContext} from "../../contexts/UserAuthContext";
import {getWorkoutInfo} from "../../services/workoutProgramService";
import {WorkoutInfo} from "../../helpers/genericModels";
import Typography from "@mui/material/Typography";
import {ExerciseTable} from "./ExerciseTable";
import CircleIcon from "@mui/icons-material/Circle";
import {DialogComponent} from "../DialogComponent";
import {useNavigate} from "react-router-dom";
import {WorkoutDropdown} from "../workout/WorkoutDropdown";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

type WorkoutInfoProps = {
  workoutId: number | null;
  scheduleId: string | undefined;
};

export const WorkoutInfoBox = ({workoutId, scheduleId}: WorkoutInfoProps) => {
  const {user} = useUserContext();
  const {openWithMessage} = useSnackbarContext();

  const theme = useTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState<WorkoutInfo | null>();

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      if (workoutId) {
        const token = await user?.getIdToken();
        if (token) {
          const resp = await getWorkoutInfo(workoutId, token);
          if (resp) {
            const {data, success, message} = resp.data;
            if (success) setWorkoutInfo(data);
            else openWithMessage(message ?? "Server error");
          } else {
            openWithMessage(NO_RESPONSE_LABEL)
          }
        }
      }

      setLoading(false);
    };
    Boolean(user) && workoutId && getInfo();
  }, [workoutId, user]);

  const handleStartWorkout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    navigate("start-workout", {state: {workoutInfo, scheduleId}});
  };

  return (
      <Box
          sx={{
            mt: 3,
          }}
      >
        <Paper
            sx={{
              [theme.breakpoints.down("sm")]: {
                maxWidth: 370,
              },
              textAlign: "left",
              p: 2,
            }}
        >
          {!workoutId ? (
              <>
                <Typography variant={"h5"}>Please select a workout</Typography>
                <Box>
                  <Typography
                      variant={"body1"}
                      color={"text.secondary"}
                      display={"inline"}
                  >
                    Days with uncompleted workouts are marked with a red dot :
                  </Typography>
                  {"  "}
                  <CircleIcon color={"error"} fontSize={"small"}/>
                </Box>
                <Box>
                  <Typography
                      variant={"body1"}
                      color={"text.secondary"}
                      display={"inline"}
                  >
                    Days with completed workouts are marked with a blue dot :
                  </Typography>
                  {"  "}
                  <CircleIcon color={"info"} fontSize={"small"}/>
                </Box>
              </>
          ) : loading || !workoutInfo ? (
              <CircularProgress sx={{mt: 2}}/>
          ) : (
              <Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: "space-between",
                }}>
                  <Typography variant={"h5"} color={"text.secondary"}>
                    Workout #{workoutInfo.orderNr}
                  </Typography>
                  <WorkoutDropdown workoutInfo={workoutInfo}/>
                </Box>
                <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 2,
                      [theme.breakpoints.down("sm")]: {
                        overflowY: "scroll",
                        height: 500,
                      },
                    }}
                >
                  {workoutInfo.exercisesWithSets.map((exercise) => (
                      <ExerciseTable key={exercise.name} exercise={exercise}/>
                  ))}
                </Box>
                <Box
                    sx={{
                      textAlign: "center",
                    }}
                >
                  <Button
                      variant={"contained"}
                      disabled={workoutInfo.completed}
                      onClick={() => setStartModalOpen(true)}
                  >
                    Start Workout
                  </Button>
                </Box>
              </Box>
          )}

        </Paper>
        <DialogComponent
            isOpen={startModalOpen}
            onClose={() => setStartModalOpen(false)}
            title={"Start Workout"}
            onButtonClick={handleStartWorkout}
            buttonTitle={"Yes"}
            buttonDisabled={false}
            isLoading={false}
        >
          <Typography color={'text.secondary'}>Do you want to start workout? This will start calculating
            time.</Typography>
        </DialogComponent>
      </Box>
  );
};
