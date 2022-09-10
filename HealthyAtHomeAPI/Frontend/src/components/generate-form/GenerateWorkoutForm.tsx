import {Box, Button, MobileStepper, useTheme} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {GeneralInfoForm} from "./GeneralInfoForm";
import {
  Gender,
  HeightUnits,
  InventoryType,
  LevelsOfDifficulty,
  MuscleGroup,
  WeightUnits,
  WorkoutGoal,
} from "../../enums/planOptionEnums";
import {WorkoutGoalForm} from "./WorkoutGoal";
import {MuscleGroupsForm} from "./MuscleGroupsForm";
import {InventoryForm} from "./InventoryForm";
import {PhysicalTestForm} from "../physical-test-form/PhysicalTestForm";
import {useUserContext} from "../../contexts/UserAuthContext";
import {generateTrainingPlanOptions, trainingPlanService} from "../../services/trainingPlanService";
import {useNavigate} from "react-router-dom";
import {ExerciseContext} from "../../contexts/ExerciseAlternativeContext";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

export type PhysicalResults = {
  pullingStrength?: LevelsOfDifficulty;
  pushingStrength?: LevelsOfDifficulty;
  legStrength?: LevelsOfDifficulty;
  coreStrength?: LevelsOfDifficulty;
  stamina?: LevelsOfDifficulty;
};

export type planOptions = {
  gender?: Gender;
  height?: number | string;
  heightUnits?: HeightUnits;
  weight?: number | string;
  weightUnits?: WeightUnits;
  age?: number | string;
  inventoryTypes?: InventoryType[];
  workoutGoal?: WorkoutGoal;
  muscleGroupsWanted?: MuscleGroup[];
  physicalResults?: PhysicalResults;
};

export const GenerateWorkoutForm: React.FC = () => {

  const theme = useTheme();
  const {user} = useUserContext();

  const [activeStep, setActiveStep] = React.useState(0);
  const [trainingPlanOptions, setTrainingPlanOptions] = useState<planOptions | {}>({
    gender: Gender.Female,
    weight: "",
    weightUnits: WeightUnits.Kilograms,
    height: "",
    heightUnits: HeightUnits.Centimeters,
    age: "",
    inventoryTypes: [],
    muscleGroupsWanted: [],
    workoutGoal: WorkoutGoal.Muscle_Growth,
    physicalResults: {
      pullingStrength: LevelsOfDifficulty.Novice,
      pushingStrength: LevelsOfDifficulty.Novice,
      legStrength: LevelsOfDifficulty.Novice,
      coreStrength: LevelsOfDifficulty.Novice,
      stamina: LevelsOfDifficulty.Novice,
    },
  });
  const [hasGeneralInfoErrors, setHasGeneralInfoValidationErrors] =
      useState(false);
  const [hasMuscleGroupErrors, setHasMuscleGroupErrors] = useState(false);
  const [hasPhysicalTestErrors, setHasPhysicalTestErrors] = useState(false);

  const [physicalTestStarted, setPhysicalTestStarted] = useState(false);
  // @ts-ignore
  const {setAlternativeGroups, setPlanOptions} = useContext(ExerciseContext);

  const maxSteps = 5;

  const navigate = useNavigate();
  const {openWithMessage} = useSnackbarContext();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await generateTrainingPlanOptions(trainingPlanOptions);
    if (response && response.data && setAlternativeGroups) {
      setAlternativeGroups(response.data);
      setPlanOptions && setPlanOptions(trainingPlanOptions);
      navigate("/choose-exercises");
    } else {
      openWithMessage(NO_RESPONSE_LABEL);
    }
  };

  //try to get general options from previous plans
  useEffect(() => {
    const getOptions = async () => {

      const token = await user?.getIdToken();

      if (!token) return;

      const response = await trainingPlanService.getOptions(token);
      if (!response) {
        openWithMessage(NO_RESPONSE_LABEL);
        return;
      }
      const {data, success} = response.data;
      if (!success || !data) return;

      setTrainingPlanOptions({
        ...trainingPlanOptions,
        gender: data.gender,
        height: data.height,
        heightUnits: data.heightUnits,
        weight: data.weight,
        weightUnits: data.weightUnits,
        age: data.age,
      });
    };
    getOptions();
  }, [])

  const renderCorrectStep = (step: number) => {
    switch (step) {
      case 0:
        return (
            <GeneralInfoForm
                planOptions={trainingPlanOptions}
                updateTrainingPlan={setTrainingPlanOptions}
                setValidationErrors={setHasGeneralInfoValidationErrors}
            />
        );
      case 1:
        return (
            <WorkoutGoalForm
                planOptions={trainingPlanOptions}
                updateTrainingPlan={setTrainingPlanOptions}
            />
        );
      case 2:
        return (
            <MuscleGroupsForm
                planOptions={trainingPlanOptions}
                updateTrainingPlan={setTrainingPlanOptions}
                setValidationErrors={setHasMuscleGroupErrors}
            />
        );
      case 3:
        return (
            <InventoryForm
                planOptions={trainingPlanOptions}
                updateTrainingPlan={setTrainingPlanOptions}
            />
        );
      case 4:
        return (
            <PhysicalTestForm
                planOptions={trainingPlanOptions}
                updateTrainingPlan={setTrainingPlanOptions}
                setFormError={setHasPhysicalTestErrors}
                setPhysicalStarted={setPhysicalTestStarted}
                otherFormErrors={hasMuscleGroupErrors || hasGeneralInfoErrors}
            />
        );
      default:
        break;
    }
  };

  return (
      <Box sx={{alignItems: "center"}}>
        <Typography variant={"h4"}>Generate Training Plan</Typography>
        {/*FORM SPACE*/}
        <Box sx={{mt: 10, minHeight: 500}}>
          {renderCorrectStep(activeStep)}
        </Box>
        {/*Form*/}
        <MobileStepper
            variant={"dots"}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep !== maxSteps - 1 ? (
                  <Button
                      size="medium"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft/>
                    ) : (
                        <KeyboardArrowRight/>
                    )}
                  </Button>
              ) : (
                  <Button
                      size="medium"
                      onClick={handleSubmit}
                      disabled={
                          hasGeneralInfoErrors ||
                          hasMuscleGroupErrors ||
                          hasPhysicalTestErrors
                      }
                  >
                    Generate
                  </Button>
              )
            }
            backButton={
              <Button
                  size="medium"
                  onClick={handleBack}
                  disabled={activeStep === 0 || physicalTestStarted}
              >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight/>
                ) : (
                    <KeyboardArrowLeft/>
                )}
                Back
              </Button>
            }
        />
      </Box>
  );
};
