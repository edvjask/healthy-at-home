import {ExerciseCue, TrainingPlan} from "../services/trainingPlanService";
import {CueType, ExerciseType, InventoryType, LevelsOfDifficulty, MuscleGroup,} from "../enums/planOptionEnums";

export type GenericResponse<T> = {
  data: T;
  success: boolean;
  message: string | null;
};

export type Workout = {
  id: number;
  orderNr: number;
  date: Date;
  completed: boolean;
  workoutSets?: null;
};

export type Exercise = {
  easierVariationId?: number;
  exerciseCues: ExerciseCue[];
  exerciseDifficulty: LevelsOfDifficulty;
  exerciseType: ExerciseType;
  harderVariationId?: number;
  id: number;
  instructions: string;
  inventoryTypes: InventoryType[];
  muscleGroups: MuscleGroup[];
  name: string;
  youtubeLink?: string;
};

export type WorkoutProgram = {
  id: number;
  startDate: Date;
  endDate: Date;
  trainingPlan?: TrainingPlan;
  workouts?: Workout;
};

export type WorkoutInfo = {
  id: number;
  completed: boolean;
  orderNr: number;
  restPeriodMs: number;
  exercisesWithSets: Array<ExerciseSet>;
};

export type ExerciseSet = {
  id: number;
  name: string;
  exerciseCues: Array<GetExerciseCue>;
  exerciseSets: Array<ExerciseSetInfo>;
};

export type ExerciseSetInfo = {
  id: number;
  orderNo: number;
  repsToComplete: number;
  repsCompleted: number;
};

export type GetExerciseCue = {
  cueType: CueType;
  instructions: string;
};

export type WorkoutResults = {
  workoutId: number;
  setsResults: Array<SetResult>;
};

export type SetResult = {
  id: number;
  repsCompleted: number;
};
