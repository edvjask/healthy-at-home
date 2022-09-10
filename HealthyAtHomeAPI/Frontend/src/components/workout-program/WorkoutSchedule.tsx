import {Box, CircularProgress, Divider, Paper, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useUserContext} from "../../contexts/UserAuthContext";
import {
  getWorkoutProgramSummary,
  WorkoutProgramMetrics,
  workoutProgramService,
  WorkoutProgramSummary,
} from "../../services/workoutProgramService";
import {ScheduleCalendar} from "./ScheduleCalendar";
import {getLocalDateFromString, NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";
import {WorkoutInfoBox} from "./WorkoutInfoBox";
import {WorkoutProgramMetricsBox} from "./WorkoutProgramMetricsBox";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import CalendarImage from '../../images/calendar-image.jpg';
import {ImageWithText} from "../../images/ImageWithText";

export const WorkoutSchedule = () => {
  const {user} = useUserContext();
  const {openWithMessage} = useSnackbarContext();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {state} = useLocation();

  const [loading, setLoading] = useState(false);
  const [programSummary, setProgramSummary] =
      useState<WorkoutProgramSummary | null>();
  const [metrics, setMetrics] = useState<WorkoutProgramMetrics | null>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const selectedWorkoutId = useMemo(() => {
    if (programSummary && selectedDate) {
      const workout = programSummary?.workoutSummaries.find((workout) => {
        const date = new Date(workout.date);
        return date.toDateString() === selectedDate.toDateString();
      });
      return workout ? workout.id : null;
    }
    return null;
  }, [programSummary, selectedDate]);

  useEffect(() => {
    if (state && programSummary) {
      //find workout that was saved and set it as current date
      const workout = programSummary.workoutSummaries.find(
          (workout) => workout.id === state
      );
      workout && setSelectedDate(new Date(workout.date));
    }
  }, [programSummary, state]);

  useEffect(() => {
    const getWorkoutsAndMetrics = async () => {
      setLoading(true);
      const token = await user?.getIdToken();
      if (params && params.id && token) {
        const [resp, metricsResponse] = await Promise.all([getWorkoutProgramSummary(parseInt(params.id), token),
          workoutProgramService.getProgramMetrics(parseInt(params.id), token)]);
        if (resp) {
          const {data, success, message} = resp.data;
          if (success) setProgramSummary(data);
          else openWithMessage(message ?? "Server error");
        } else {
          openWithMessage(NO_RESPONSE_LABEL)
        }
        if (metricsResponse) {
          const {data, success, message} = metricsResponse.data;
          if (success) setMetrics(data);
          else openWithMessage(message ?? "Server error");
        } else {
          openWithMessage(NO_RESPONSE_LABEL)
        }

        setLoading(false);
      }
    }
    Boolean(user) && getWorkoutsAndMetrics();
  }, [params.id, user]);

  return (
      <Box
          sx={{
            alignItems: "center",
          }}
      >
        <Typography variant={"h4"} color={"text.secondary"}>
          Workout Schedule
        </Typography>
        {programSummary && (
            <Typography variant={"h5"}>
              {getLocalDateFromString(programSummary.startDate)} -{" "}
              {getLocalDateFromString(programSummary.endDate)}
            </Typography>
        )}
        {loading ? <CircularProgress sx={{mt: 2}}/> : null}
        <Box sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          {!isMobile && (
              <>
                <Paper sx={{width: "65%"}}>
                  <ImageWithText width="100%" height={330} image={CalendarImage} label="Workout Calendar"/>
                </Paper>
                <Divider orientation={'vertical'} flexItem sx={{
                  backgroundColor: theme.palette.text.secondary,
                }}/>
              </>
          )}

          <Box width={isMobile ? "auto" : "30%"}>
            {programSummary && (
                <ScheduleCalendar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    workoutSummaries={programSummary?.workoutSummaries}
                />
            )}
          </Box>
        </Box>
        <WorkoutInfoBox workoutId={selectedWorkoutId} scheduleId={params.id}/>
        {metrics && <WorkoutProgramMetricsBox results={metrics}/>}
      </Box>
  );
};
