import {planOptions} from "../components/generate-form/GenerateWorkoutForm";
import axiosInstance from "../httpClient";
import {CueType} from "../enums/planOptionEnums";
import {Exercise, GenericResponse} from "../helpers/genericModels";

const PATH = "training-plan/";

export type ExerciseCue = {
  id: number;
  cueType: CueType;
  description: string;
};

export type AlternativesGroup = {
  alternativesToChoose: number;
  categoryType:
      | "Horizontal Push"
      | "Horizontal Pull"
      | "Vertical Pull"
      | "Vertical Push"
      | "Core"
      | "Legs";
  exercises: Exercise[];
};

export type TrainingPlan = {
  planOptions?: planOptions | null | undefined;
  name: string;
  idToken: string;
  exerciseIds: number[];
};

export type GetTrainingPlan = {
  id: number;
  creationDate: string;
  exercises: Exercise[];
  name: string;
  options: planOptions;
};

const generateTrainingPlanOptions = async (planOptions: planOptions) => {
  try {
    return await axiosInstance.post<AlternativesGroup[]>(PATH + "generate", {
      ...planOptions,
    });
  } catch (err) {
    console.error("Generate plan unsuccessful", err);
  }
};

const saveTrainingPlan = async (newPlan: TrainingPlan) => {
  try {
    return await axiosInstance.post<TrainingPlan>(PATH + "save-with-options", {
      ...newPlan,
    });
  } catch (err) {
    console.error("Error saving new plan", err);
  }
};

const getAllPlans = async (token: string) => {
  try {
    return await axiosInstance.post<GetTrainingPlan[]>(PATH + "get-all", {
      accessToken: token,
    });
  } catch (err) {
    console.error("Error getting training plans", err);
  }
};

const editPlan = async (token: string, exerciseIds: number[], id: number) => {
  try {
    return await axiosInstance.patch<GenericResponse<TrainingPlan>>(PATH + `${id}/edit-exercises`, {
      id,
      exerciseIds,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  } catch (err) {
    console.error("Error editing training plans", err);
  }
}

const getById = async (token: string, id: number) => {
  try {
    return await axiosInstance.get<GetTrainingPlan>(PATH + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  } catch (err) {
    console.error('Error getting training plan:', err);
  }
}

const getOptions = async (token: string) => {
  try {
    return await axiosInstance.get<GenericResponse<Partial<planOptions>>>(PATH + 'general-options', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  } catch (err) {
    console.error('Error getting user options: ', err);
  }
}

export const trainingPlanService = {
  getById,
  getOptions,
}

export {generateTrainingPlanOptions, saveTrainingPlan, getAllPlans, editPlan};
