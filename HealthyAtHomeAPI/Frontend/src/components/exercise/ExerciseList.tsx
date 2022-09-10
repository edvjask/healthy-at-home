import {Box, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {Exercise} from "../../helpers/genericModels";
import {exerciseService} from "../../services/exerciseService";
import {ExerciseItems} from "./ExerciseItems";
import {ExerciseFilterAccordion} from "./ExerciseFilterAccordion";
import {useSnackbarContext} from "../../contexts/SnackbarContext";

export const ExerciseList = () => {
  const [exercises, setExercises] = useState<Exercise[] | null>();
  const [filteredExercises, setFilteredExercises] = useState<Exercise[] | null>();
  const [loading, setLoading] = useState(false);

  const {openWithMessage} = useSnackbarContext();

  useEffect(() => {
    const getAll = async () => {
      setLoading(true);
      const resp = await exerciseService.getAll();
      if (resp) {
        const {data, success, message} = resp.data;
        if (success) {
          setFilteredExercises(data);
          setExercises(data);
        } else {
          openWithMessage(message ?? "Server error");
        }

      } else {
        openWithMessage("No response from server");
      }
      setLoading(false);

    };
    getAll();
  }, []);

  return (
      <Box
          sx={{
            alignItems: "center",
          }}
      >
        <Typography variant={"h4"} color={"text.secondary"}>
          Exercises
        </Typography>
        {exercises && (
            <ExerciseFilterAccordion
                exercises={exercises}
                setFilteredExercises={setFilteredExercises}
            />
        )}
        {filteredExercises ? (
            <ExerciseItems filteredExercises={filteredExercises}/>
        ) : loading ? (
            <CircularProgress sx={{mt: 2}}/>
        ) : null}
      </Box>
  );
};
