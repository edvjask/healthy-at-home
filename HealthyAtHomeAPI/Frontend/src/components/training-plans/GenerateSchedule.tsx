import {Alert, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField,} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useNavigate, useParams} from "react-router-dom";
import React, {useLayoutEffect, useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import locale from "date-fns/locale/en-GB";
import {useUserContext} from "../../contexts/UserAuthContext";
import {checkForExistingProgram, generateWorkoutProgram,} from "../../services/workoutProgramService";
import {LoadingButton} from "@mui/lab";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export const GenerateSchedule = () => {
  const {user} = useUserContext();

  let params = useParams();
  let navigate = useNavigate();
  const {openWithMessage} = useSnackbarContext();

  const handleGenerate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);
    const token = await user?.getIdToken();
    if (startDate && token && params && params.id) {
      const response = await generateWorkoutProgram({
        startDate: startDate,
        trainingPlanId: parseInt(params.id),
        numberOfDays: radioValue,
        userToken: token,
      });

      if (response) {
        const {data, success, message} = response.data;
        if (success && data) {
          //voila, redirect
          navigate(`/schedules/${data.workoutId}`);
        } else {
          openWithMessage(message ?? "Server error")
        }
      } else {
        openWithMessage(NO_RESPONSE_LABEL);
      }
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    //check for existing program
    const checkForExisting = async () => {
      if (params && params.id) {
        const response = await checkForExistingProgram(parseInt(params.id));
        if (response) {
          const {data, success, message} = response.data;
          if (data && success) setExistsProgram(true);
          if (message) openWithMessage(message);
        } else {
          openWithMessage(NO_RESPONSE_LABEL);
        }
      }
    };
    checkForExisting();
  }, [params.id]);

  const [radioValue, setRadioValue] = useState(14);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [existsProgram, setExistsProgram] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(parseInt((e.target as HTMLInputElement).value));
  };

  return (
      <Box sx={{alignItems: "center"}}>
        <Typography variant={"h4"}>Generate Schedule</Typography>
        <FormControl sx={{mt: 10}}>
          <FormLabel id="schedule-duration">
            Select duration for training schedule
          </FormLabel>
          <RadioGroup
              aria-labelledby="schedule-duration"
              value={radioValue}
              onChange={handleRadioChange}
              name="radio-buttons-group"
          >
            <FormControlLabel value={14} control={<Radio/>} label="2 weeks"/>
            <FormControlLabel value={30} control={<Radio/>} label="30 days"/>
          </RadioGroup>
        </FormControl>
        <Box sx={{mt: 2, mb: 2}}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
            <DatePicker
                label="Select start date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                minDate={new Date(new Date().getFullYear(), 1, 1)}
                maxDate={new Date(new Date().getFullYear() + 1, 12, 31)}
                renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        {existsProgram ? (
            <Alert
                severity={"warning"}
                sx={{
                  width: 300,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
            >
              Existing schedule for this training plan will be deleted!
            </Alert>
        ) : null}
        <LoadingButton
            loading={loading}
            loadingPosition={"center"}
            variant={"contained"}
            sx={{
              mt: 4,
            }}
            onClick={handleGenerate}
            disabled={Boolean(!startDate)}
        >
          Generate
        </LoadingButton>
      </Box>
  );
};
