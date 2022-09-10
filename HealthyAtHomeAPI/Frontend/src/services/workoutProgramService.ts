import axiosInstance from "../httpClient";
import {GenericResponse, SetResult, Workout, WorkoutInfo, WorkoutProgram} from "../helpers/genericModels";
import {EditWorkoutSet} from "../components/workout/WorkoutEdit";

const PATH = "workout-program/";

export type NewPlanRequest = {
  userToken: string;
  trainingPlanId: number;
  startDate: Date;
  numberOfDays: number;
};

export type NewWorkoutResponse = {
  workoutId: number;
};

export type GetWorkoutProgram = {
  id: number;
  startDate: Date;
  endDate: Date;
  trainingPlanId: number;
  trainingPlanName: string;
  workoutCount: number;
};

export type WorkoutProgramSummary = {
  id: number;
  ownerUID: string;
  startDate: string;
  endDate: string;
  workoutSummaries: WorkoutSummary[];
};

export type WorkoutSummary = {
  id: number;
  completed: boolean;
  orderNo: number;
  date: string;
};

export type SaveResultsRequest = {
  workoutId: number;
  token: string;
  timeElapsedMs: number;
  setsResults: Array<SetResult>;
};

export type WorkoutProgramMetrics = {
  totalWorkoutTimeMs: number,
  missedWorkoutsCount: number,
  workoutTotalsList: Array<WorkoutTotals>,
}

export type WorkoutTotals = {
  id: number,
  date: string,
  repsTotalToComplete: number,
  repsTotalCompleted: number,
}

export const generateWorkoutProgram = async (planRequest: NewPlanRequest) => {
  try {
    return await axiosInstance.post<GenericResponse<NewWorkoutResponse>>(
        PATH + "generate-and-save",
        {
          ...planRequest,
        }
    );
  } catch (err) {
    console.error("Error generating workout program", err);
  }
};

export const checkForExistingProgram = async (trainingPlanId: number) => {
  try {
    return await axiosInstance.get<GenericResponse<WorkoutProgram>>(
        PATH + `by-training-plan-id/${trainingPlanId}`
    );
  } catch (err) {
    console.error("Error checking for existing program", err);
  }
};

export const getAllProgramsForUser = async (token: string) => {
  try {
    return await axiosInstance.post<GenericResponse<GetWorkoutProgram[]>>(
        PATH + "all",
        {
          token: token,
        }
    );
  } catch (err) {
    console.error("Error getting programs", err);
  }
};

export const getWorkoutProgramSummary = async (id: number, token: string) => {
  try {
    return await axiosInstance.post<GenericResponse<WorkoutProgramSummary>>(
        PATH + "get-summary",
        {
          id: id,
          token: token,
        }
    );
  } catch (err) {
    console.error("Error getting workout summary", err);
  }
};

export const getWorkoutInfo = async (id: number, token: string) => {
  try {
    return await axiosInstance.post<GenericResponse<WorkoutInfo>>(
        PATH + "get-workout-info",
        {
          id: id,
          token: token,
        }
    );
  } catch (err) {
    console.error("Error getting workout info", err);
  }
};

const getProgramMetrics = async (id: number, token: string) => {
  try {
    return await axiosInstance.post<GenericResponse<WorkoutProgramMetrics>>(
        PATH + `${id}/metrics`,
        {
          id: id,
          token: token,
        }
    );
  } catch (err) {
    console.error("Error getting workout info", err);
  }
}

export const saveWorkoutResults = async (request: SaveResultsRequest) => {
  try {
    return await axiosInstance.post<GenericResponse<{ resultsSavedCount: number }>>(PATH + "save-workout-results", {
      ...request,
    });
  } catch (err) {
    console.error("Error getting workout info", err);
  }
};

const patchWorkout = async (request: Array<EditWorkoutSet>, workoutId: number, token: string) => {
  try {
    return await axiosInstance.patch<GenericResponse<Workout>>(
        PATH + `edit-workout/${workoutId}`,
        {
          editWorkoutSets: request
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
    );
  } catch (err) {
    console.error("Error getting workout info", err);
  }
}

export const workoutProgramService = {
  getProgramMetrics,
  patchWorkout,
};
