import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import * as React from "react";
import {Rating} from "@mui/material";
import {LevelsOfDifficulty} from "../../enums/planOptionEnums";
import {Exercise} from "../../helpers/genericModels";

type TrainingPlanExerciseProps = {
    exercises: Exercise[];
};

export const TrainingPlanExercises = ({
                                          exercises,
                                      }: TrainingPlanExerciseProps) => {
    return (
        <div>
            <Typography
                variant={"body1"}
                color={"text.secondary"}
                sx={{
                    mt: 2,
                }}
            >
                Exercises:
            </Typography>
            {exercises.map((exercise) => (
                <div
                    key={exercise.id}
                    style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        gap: 10,
                    }}
                >
                    <Typography
                        display={"inline-block"}
                        variant={"body1"}
                        color={"text.primary"}
                    >
                        {exercise.name}
                    </Typography>{" "}
                    <Rating
                        readOnly
                        icon={<FiberManualRecordIcon fontSize="inherit"/>}
                        emptyIcon={<FiberManualRecordOutlinedIcon fontSize="inherit"/>}
                        defaultValue={exercise.exerciseDifficulty as number}
                        max={3}
                    />
                    <Typography
                        variant={"body2"}
                        sx={{
                            m: 0,
                        }}
                    >
                        {LevelsOfDifficulty[exercise.exerciseDifficulty]}
                    </Typography>
                </div>
            ))}
        </div>
    );
};
