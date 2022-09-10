import {SetResult, WorkoutInfo} from "../../helpers/genericModels";
import {Box, Divider, Paper, useMediaQuery, useTheme} from "@mui/material";
import TimerImage from '../../images/timer-image.jpg';
import {WorkoutResultTable} from "./WorkoutResultTable";
import {ImageWithText} from "../../images/ImageWithText";

type WorkoutResultsProps = {
  workoutExercises: WorkoutInfo;
  workoutResults: Array<SetResult>;
};

export const WorkoutResultsGrid = ({
                                     workoutExercises,
                                     workoutResults,
                                   }: WorkoutResultsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
      <Box display="flex" gap={2} sx={{
        justifyContent: 'center'
      }}>{!isMobile && (
          <>
            <Paper>
              <ImageWithText
                  label={"Results"}
                  image={TimerImage}
                  height={"100%"}
                  width={700}
              />
            </Paper>
            <Divider orientation={'vertical'} flexItem/>
          </>
      )}

        <WorkoutResultTable
            workoutExercises={workoutExercises}
            workoutResults={workoutResults}/>
      </Box>
  );
};
