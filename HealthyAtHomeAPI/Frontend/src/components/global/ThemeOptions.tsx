import {PaletteMode, ThemeOptions} from "@mui/material";
import {ExerciseType} from "../../enums/planOptionEnums";

export const themeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light') ? {
      primary: {
        main: "#FFB85C",
        light: "#d63618",
      },
      secondary: {
        main: "#45462A",
        light: "#7E5920",
      },
      text: {
        primary: "#DC851F",
        secondary: "#463f3a",
      },
      background: {
        default: "#f8edeb",
      },
    } : {
      primary: {
        main: "#DC851F",
        light: "#d63618",
      },
      secondary: {
        main: "#45462A",
        light: "#7E5920",
      },
      text: {
        primary: "#FFB85C",
        secondary: "#f7f8fe",
      },
      background: {
        default: "#343330",
      },
    },
  },
  typography: {
    fontFamily: "Manrope",
  },
});

export const iconColorByExerciseType = (type: ExerciseType) => {
  switch (type) {
    case ExerciseType.HorizontalPull:
      return "#A8DCD1";
    case ExerciseType.VerticalPull:
      return "#0E8395";
    case ExerciseType.HorizontalPush:
      return "#DA4167";
    case ExerciseType.VerticalPush:
      return "#EB99AD";
    case ExerciseType.Legs:
      return "#96897B";
    case ExerciseType.Core:
      return "#3D2645";
  }

  return "#DC851F";
};
