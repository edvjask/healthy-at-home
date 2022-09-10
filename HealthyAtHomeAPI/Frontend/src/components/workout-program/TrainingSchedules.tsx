import {Box, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useUserContext} from "../../contexts/UserAuthContext";
import {getAllProgramsForUser, GetWorkoutProgram,} from "../../services/workoutProgramService";
import {WorkoutProgramItems} from "./WorkoutProgramItems";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export const TrainingSchedules = () => {
  const {user} = useUserContext();
  const [loading, setLoading] = useState(false);
  const [workoutSchedules, setWorkoutSchedules] =
      useState<GetWorkoutProgram[]>();

  const {openWithMessage} = useSnackbarContext();

  useEffect(() => {
    const getPrograms = async () => {
      const token = await user?.getIdToken();
      setLoading(true);
      if (token) {
        const resp = await getAllProgramsForUser(token);
        if (resp) {
          const {data, success, message} = resp.data;
          if (success) setWorkoutSchedules(data);
          else openWithMessage(message ?? "Server error");
        } else {
          openWithMessage(NO_RESPONSE_LABEL);
        }
      }
      setLoading(false);
    };
    Boolean(user) && getPrograms();
  }, [user]);

  return (
      <Box
          sx={{
            alignItems: "center",
          }}
      >
        <Typography variant={"h4"} color={"text.secondary"}>
          Your Workout Schedules
        </Typography>
        {loading ? (
            <CircularProgress sx={{mt: 8}}/>
        ) : workoutSchedules ? (
            <WorkoutProgramItems items={workoutSchedules}/>
        ) : (
            <p>Failed to get workout schedules!</p>
        )}
      </Box>
  );
};
