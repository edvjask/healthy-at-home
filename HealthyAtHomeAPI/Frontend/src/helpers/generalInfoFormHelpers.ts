import {HeightUnits, WeightUnits} from "../enums/planOptionEnums";

export const weightUnitsItems = [
  {
    value: WeightUnits.Kilograms,
    label: "kg",
  },
  {
    value: WeightUnits.Pounds,
    label: "lbs",
  },
];

export const heightUnitsItems = [
  {
    value: HeightUnits.Centimeters,
    label: "Metric",
  },
  {
    value: HeightUnits.FeetInches,
    label: "Imperial",
  },
];

export const getWeightUnits = (value: WeightUnits): string => {
  if (value === WeightUnits.Kilograms) return "kg";
  if (value === WeightUnits.Pounds) return "lbs";
  return "";
};
