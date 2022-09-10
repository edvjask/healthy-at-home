import * as React from "react";
import {useState} from "react";
import {styled} from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, {AccordionProps} from "@mui/material/Accordion";
import MuiAccordionSummary, {AccordionSummaryProps,} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {GetTrainingPlan} from "../../services/trainingPlanService";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {OptionsDropdown} from "./OptionsDropdown";
import {
  getHeightUnitsLabel,
  getInventoryString,
  getMuscleGroupString,
  getWeightUnitsLabel,
} from "../../helpers/trainingPlanHelper";
import {Gender} from "../../enums/planOptionEnums";
import {TrainingPlanExercises} from "./TrainingPlanExercises";

type TrainingPlanItemsProps = {
  items: GetTrainingPlan[];
};

export const TrainingPlanItems = ({items}: TrainingPlanItemsProps) => {
  const Accordion = styled((props: AccordionProps) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
      <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: "0.9rem"}}/>}
          {...props}
      />
  ))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const dateOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
      (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
      };

  return (
      <Box
          sx={{
            mt: 5,
          }}
      >
        {items.map((el, index) => {
          const {
            gender,
            age,
            height,
            weight,
            heightUnits,
            weightUnits,
            muscleGroupsWanted,
          } = el.options;

          return (
              <Accordion
                  key={el.id}
                  expanded={expanded === el.id}
                  onChange={handleChange(el.id)}
              >
                <AccordionSummary
                    aria-controls={`${el.id}-content`}
                    id={`${el.id}-header`}
                >
                  <Typography>{el.name}</Typography>
                  <OptionsDropdown trainingPlan={el}/>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"text.secondary"}
                    >
                      Creation Date :
                    </Typography>{" "}
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"primary.main"}
                    >
                      {new Date(el.creationDate).toLocaleString("lt-LT")}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"text.secondary"}
                    >
                      Details :
                    </Typography>{" "}
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"primary.main"}
                    >
                      {Gender[gender as unknown as keyof typeof Gender]}
                      {", "}
                      {`${height} ${getHeightUnitsLabel(heightUnits!!)}`}
                      {", "}
                      {`${weight} ${getWeightUnitsLabel(weightUnits!!)}`}
                      {", "}
                      {age}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"text.secondary"}
                    >
                      Inventory :
                    </Typography>{" "}
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"primary.main"}
                    >
                      {getInventoryString(el.options.inventoryTypes!!)}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"text.secondary"}
                    >
                      Muscle Groups :
                    </Typography>{" "}
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"primary.main"}
                    >
                      {muscleGroupsWanted && getMuscleGroupString(muscleGroupsWanted)}
                    </Typography>
                  </div>
                  <TrainingPlanExercises exercises={el.exercises}/>
                </AccordionDetails>
              </Accordion>
          );
        })}
      </Box>
  );
};
