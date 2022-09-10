import {useEffect, useState} from "react";
import {getAllPlans, GetTrainingPlan,} from "../../services/trainingPlanService";
import {useUserContext} from "../../contexts/UserAuthContext";
import {Box, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TrainingPlanItems} from "./TrainingPlanItems.";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export const TrainingPlans = () => {
  const {user} = useUserContext();
  const {openWithMessage} = useSnackbarContext();

  const [trainingPlans, setTrainingPlans] = useState<GetTrainingPlan[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPlans = async () => {
      setLoading(true);
      const token = await user?.getIdToken();
      if (token) {
        const response = await getAllPlans(token);
        if (response) {
          setTrainingPlans(response.data);
        } else {
          openWithMessage(NO_RESPONSE_LABEL);
        }
      }
      setLoading(false);
    };

    Boolean(user) && getPlans();
  }, [user]);

  return (
      <Box
          sx={{
            alignItems: "center",
          }}
      >
        <Typography variant={"h4"} color={"text.secondary"}>
          Your Training Plans
        </Typography>
        {loading ? (
            <CircularProgress sx={{mt: 8}}/>
        ) : trainingPlans ? (
            <TrainingPlanItems items={trainingPlans}/>
        ) : (
            <p>Failed to get training plans!</p>
        )}
      </Box>
  );
};
