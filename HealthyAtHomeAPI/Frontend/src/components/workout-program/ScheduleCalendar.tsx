import {LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker,} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Box, TextField, useTheme} from "@mui/material";
import React from "react";
import {WorkoutSummary} from "../../services/workoutProgramService";
import Badge from "@mui/material/Badge";
import locale from "date-fns/locale/en-GB";
import "./css/calendar.css";

type ScheduleCalendarProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  workoutSummaries: WorkoutSummary[];
};

export const ScheduleCalendar = ({
                                   selectedDate,
                                   setSelectedDate,
                                   workoutSummaries,
                                 }: ScheduleCalendarProps) => {
  const theme = useTheme();

  const renderWorkoutDays = (
      day: Date,
      selectedDates: Array<Date | null>,
      pickersDayProps: PickersDayProps<Date>
  ) => {
    const workoutDay = workoutSummaries.find(
        (ws) => new Date(ws.date).toDateString() === day.toDateString()
    );

    const isWorkoutDay = !pickersDayProps.outsideCurrentMonth && workoutDay;
    const isCompleted = workoutDay && workoutDay.completed;

    return isWorkoutDay ? (
        <Badge
            key={day.toString()}
            color={isCompleted ? "info" : "error"}
            overlap={"circular"}
            variant={"dot"}
        >
          <PickersDay {...pickersDayProps} />
        </Badge>
    ) : (
        <PickersDay {...pickersDayProps} />
    );
  };

  return (
      <Box
          sx={{
            mt: 5,
            [theme.breakpoints.down("sm")]: {
              justifyContent: "center",
              display: "flex",
              ml: "auto",
              mr: "auto",
            },
          }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
          <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              minDate={new Date(new Date().getFullYear(), 1, 1)}
              maxDate={new Date(new Date().getFullYear() + 1, 12, 31)}
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              renderDay={renderWorkoutDays}
              className={"MuiPickerStaticWrapper"}
          />
        </LocalizationProvider>
      </Box>
  );
};
