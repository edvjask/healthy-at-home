import {Exercise} from "../../helpers/genericModels";
import {Box, Button, Card, CardActions, CardContent, Divider, Link, Rating, useTheme,} from "@mui/material";
import {getExerciseIcon} from "../../helpers/exerciseHelper";
import {iconColorByExerciseType} from "../global/ThemeOptions";
import Typography from "@mui/material/Typography";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ExerciseType} from "../../enums/planOptionEnums";
import {splitCamelCase} from "../../helpers/inputValidator";
import {getInventoryString, getMuscleGroupString,} from "../../helpers/trainingPlanHelper";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import * as React from "react";

type ExerciseListItemProps = {
    exercise: Exercise;
};

export const ExerciseListItem = ({exercise}: ExerciseListItemProps) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const {
        name,
        exerciseDifficulty,
        exerciseType,
        inventoryTypes,
        muscleGroups,
    } = exercise;

    return (
        <Card
            sx={{
                width: 330,
                height: 420,
                display: "flex",
                flexDirection: "column",
            }}
            variant={"outlined"}
        >
            <CardContent>
                <Box
                    sx={{
                        mt: 2,
                    }}
                >
                    {getExerciseIcon(exerciseType, iconColorByExerciseType(exerciseType))}
                </Box>
                <Link
                    component={RouterLink}
                    to={`/exercises/${exercise.id}`}
                    sx={{
                        textDecoration: "none",
                    }}
                >
                    <Typography variant={"h6"} fontWeight={"bold"}>
                        {name}
                    </Typography>
                </Link>
                <Typography variant={"caption"} color={"text.secondary"}>
                    {splitCamelCase(ExerciseType[exerciseType])}
                </Typography>
                <Divider color={"#45462A"} sx={{mt: 1, mb: 1}}/>
                <Box
                    sx={{
                        mt: 2,
                        textAlign: "left",
                        display: "flex",
                        gap: 1,
                        flexDirection: "column",
                    }}
                >
                    <Box>
                        <Typography display={"inline"} fontWeight={"bold"}>
                            {`Inventory : `}
                        </Typography>
                        <Typography display={"inline"} color={"text.secondary"}>
                            {getInventoryString(inventoryTypes) || "-"}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography display={"inline"} fontWeight={"bold"}>
                            {`Muscle Groups : `}
                        </Typography>
                        <Typography display={"inline"} color={"text.secondary"}>
                            {getMuscleGroupString(muscleGroups) || "-"}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Typography display={"inline"} fontWeight={"bold"}>
                            {`Difficulty : `}
                        </Typography>
                        <Rating
                            readOnly
                            icon={<FiberManualRecordIcon fontSize="inherit"/>}
                            emptyIcon={<FiberManualRecordOutlinedIcon fontSize="inherit"/>}
                            defaultValue={exerciseDifficulty as number}
                            max={3}
                        />
                    </Box>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    mt: "auto",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Button onClick={() => navigate(`${exercise.id}`)}>View</Button>
            </CardActions>
        </Card>
    );
};
