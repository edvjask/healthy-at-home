import {HeightUnits, InventoryType, MuscleGroup, WeightUnits,} from "../enums/planOptionEnums";
import {splitCamelCase} from "./inputValidator";

export const getInventoryString = (inventories: InventoryType[]) => {
  return inventories.reduce((prevValue, curVal, index) => {
    return (
        prevValue +
        splitCamelCase(
            InventoryType[curVal]
        ) +
        (index !== inventories.length - 1 ? ", " : "")
    );
  }, "");
};

export const getMuscleGroupString = (groups: MuscleGroup[]) => {
  return groups.reduce((prevValue, curVal, index) => {
    return (
        prevValue +
        splitCamelCase(
            MuscleGroup[curVal]
        ) +
        (index !== groups.length - 1 ? ", " : "")
    );
  }, "");
};

export const getHeightUnitsLabel = (unit: HeightUnits) => {
  if (unit === HeightUnits.Centimeters) return "cm";
  else return "ft/in";
};

export const getWeightUnitsLabel = (unit: WeightUnits) => {
  if (unit === WeightUnits.Kilograms) return "kg";
  else return "lbs";
};
