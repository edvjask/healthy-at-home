import {Box, Divider, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {WorkoutInfo} from "../../helpers/genericModels";
import {WorkoutExercise} from "./WorkoutExercise";
import {WorkoutTimer} from "./WorkoutTimer";
import CancelIcon from "@mui/icons-material/Cancel";
import {DialogComponent} from "../DialogComponent";

export const WorkoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { workoutInfo: WorkoutInfo, scheduleId: string | undefined };
  const workoutInfo = state.workoutInfo;

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    }

    return () => interval && clearInterval(interval);
  }, [timerOn]);

  const formattedTime = new Date(time).toISOString().substr(11, 8);

  const handleCancelIcon = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setTimerOn(false);
    setCancelModalOpen(true);
  };

  const handleModalClose = () => {
    setCancelModalOpen(false);
    setTimerOn(true);
  };

  const handleCancelModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/schedules/${state.scheduleId}`);
  };

  return (
      <Box
          sx={{
            alignItems: "center",
          }}
      >
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
        >
          <Typography variant={"h4"} color={"text.secondary"} display={"inline"}>
            Workout #{workoutInfo.orderNr}
          </Typography>
          <IconButton color={"primary"} size={"large"} onClick={handleCancelIcon}>
            <CancelIcon fontSize={"large"}/>
          </IconButton>
        </Box>
        <Divider sx={{m: 2}}/>
        <WorkoutTimer formattedTime={formattedTime}/>
        <WorkoutExercise
            workoutExercises={workoutInfo}
            setTimerOn={setTimerOn}
            timeElapsed={time}
        />
        <DialogComponent
            isOpen={cancelModalOpen}
            onClose={handleModalClose}
            title="Cancel Workout"
            onButtonClick={handleCancelModal}
            buttonTitle="Yes"
        >
          Are you sure you want to cancel? You will be redirected back to schedule
          page.
        </DialogComponent>
      </Box>
  );
};
