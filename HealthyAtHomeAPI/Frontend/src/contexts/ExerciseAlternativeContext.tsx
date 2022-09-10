import {createContext, FC, useState} from "react";
import {AlternativesGroup} from "../services/trainingPlanService";
import {planOptions} from "../components/generate-form/GenerateWorkoutForm";

interface IExerciseAlternativesContext {
    alternativeGroups?: AlternativesGroup[];
    setAlternativeGroups?: (alternatives: AlternativesGroup[]) => void;
    trainingPlanOptions?: planOptions | null;
    setPlanOptions?: (options: planOptions) => void;
}

export const ExerciseContext = createContext<IExerciseAlternativesContext>({});

export const ExerciseAlternativeContextProvider: FC = ({children}) => {
    const [alternativeGroups, setAlternativeGroups] = useState<AlternativesGroup[]>([]);
    const [trainingPlanOptions, setPlanOptions] = useState<null | planOptions>(
        null
    );

    return (
        <ExerciseContext.Provider
            value={{
                alternativeGroups,
                setAlternativeGroups,
                trainingPlanOptions,
                setPlanOptions,
            }}
        >
            {children}
        </ExerciseContext.Provider>
    );
};
