import {ExerciseType} from "../enums/planOptionEnums";

import {ReactComponent as BackIcon} from "../icons/back-muscle.svg";
import {ReactComponent as ChestIcon} from "../icons/chest-muscles.svg";
import {ReactComponent as LegsIcon} from "../icons/leg-muscle.svg";
import {ReactComponent as AbsIcon} from "../icons/abs-muscle.svg";
import {randomBetweenValues} from "./genericHelpers";
import {ResultSet} from "../services/exerciseService";

export const getExerciseIcon = (type: ExerciseType, color: string) => {
    const iconProps = {
        fill: color,
        width: 100,
        height: 100,
    };

    switch (type) {
        case ExerciseType.VerticalPull:
        case ExerciseType.HorizontalPull:
            return <BackIcon {...iconProps} />;
        case ExerciseType.VerticalPush:
        case ExerciseType.HorizontalPush:
            return <ChestIcon {...iconProps} />;
        case ExerciseType.Legs:
            return <LegsIcon {...iconProps} />;
        case ExerciseType.Core:
            //hardcoded conversion from png, fill doesn't work..
            return <AbsIcon {...iconProps} />;
        default:
            return null;
    }
};


export const getData = (id: string) => {

    let data = [];
    for (let i = 0; i < 5 * 3; i++) {
        data.push(
            {
                x: i + 1,
                y: randomBetweenValues(1, 10),
            }
        )
    }
    return {
        id: id,
        data: data
    }
}

export const transformResultsForLineGraph = (data: ResultSet[]) => {
    let completed: Array<{ x: string, y: number }> = [];
    let toComplete: Array<{ x: string, y: number }> = [];

    data.forEach(set => {
        toComplete.push({
            x: `${new Date(set.workoutDate).toLocaleDateString()} Set #${set.orderNo}`,
            y: set.repsToComplete
        });
        completed.push({
            x: `${new Date(set.workoutDate).toLocaleDateString()} Set #${set.orderNo}`,
            y: set.repsCompleted === -1 ? 0 : set.repsCompleted
        });
    });

    return [
        {
            id: 'To Complete',
            data: toComplete,
        },
        {
            id: 'Completed',
            data: completed,
        },
    ];
}
