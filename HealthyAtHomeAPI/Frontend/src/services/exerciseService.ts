import axiosInstance from "../httpClient";
import {Exercise, GenericResponse} from "../helpers/genericModels";
import {ExerciseCue} from "./trainingPlanService";
import {CueType, ExerciseType, InventoryType, LevelsOfDifficulty, MuscleGroup} from "../enums/planOptionEnums";
import {AddExercise} from "../components/exercise/ExerciseAdd";

const PATH = "exercise/";

export type AddExerciseCue = {
  cueType: CueType;
  description: string;
};

export type AddExerciseRequest = {
  token: string,
  addExerciseDto: Partial<AddExercise>,
};

export type ExerciseInfo = {
  id: number,
  name: string,
  instructions: string,
  exerciseCues: Array<ExerciseCue>,
  exerciseDifficulty: LevelsOfDifficulty,
  inventoryTypes: Array<InventoryType>,
  muscleGroups: Array<MuscleGroup>,
  exerciseType: ExerciseType,
  youtubeLink?: string,
  harderVariationId?: number,
  harderVariationName: string,
  easierVariationId?: number,
  easierVariationName?: string,
}

export type ResultSet = {
  id: number,
  orderNo: number,
  workoutDate: string,
  repsToComplete: number,
  repsCompleted: number,
}

const getAll = async () => {
  try {
    return await axiosInstance.get<GenericResponse<Exercise[]>>(PATH + "all");
  } catch (err) {
    console.error("Exercise retrieval unsuccessful", err);
  }
};

const getById = async (id: number) => {
  try {
    return await axiosInstance.get<GenericResponse<ExerciseInfo>>(PATH + id);
  } catch (err) {
    console.error("Exercise retrieval unsuccessful", err);
  }
};

const getExerciseResults = async (id: number, token: string) => {
  try {
    return await axiosInstance.post<GenericResponse<ResultSet[]>>(PATH + `${id}/results-for-user`, {
      token: token
    });
  } catch (err) {
    console.error("Exercise results retrieval unsuccessful", err);
  }
}

const postNewExercise = async (addDto: AddExerciseRequest) => {
  try {
    return await axiosInstance.post<GenericResponse<Exercise>>(PATH + `add-new`, addDto);
  } catch (err) {
    console.error("Exercise addition unsuccessful", err);
  }
}

const postExerciseGif = async (file: File, id: number, token: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    return await axiosInstance.post<GenericResponse<boolean>>(PATH + `add-picture/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  } catch (err) {
    console.error("Exercise addition unsuccessful", err);
  }
}

export const exerciseService = {
  getAll,
  postNewExercise,
  postExerciseGif,
  getById,
  getExerciseResults,
};
