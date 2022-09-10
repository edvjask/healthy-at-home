import {GetWorkoutProgram} from "../../services/workoutProgramService";
import {Box, Button, Paper, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import React from "react";
import {trainingPlanService} from "../../services/trainingPlanService";
import {useUserContext} from "../../contexts/UserAuthContext";

type WorkoutProgramItemsProps = {
    items: GetWorkoutProgram[];
};

export const WorkoutProgramItems = ({items}: WorkoutProgramItemsProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const {user} = useUserContext();

    const handleNavigate = async (event: React.MouseEvent<HTMLElement>, id: number) => {
        event.stopPropagation();
        event.preventDefault();

        const token = await user?.getIdToken();

        if (token) {
            const response = await trainingPlanService.getById(token, id);

            if (!response) return;

            const trainingPlan = response.data;

            if (trainingPlan) {
                navigate(`/training-plans/${id}/edit`, {state: trainingPlan});
            }
        }

    }

    return (
        <Box
            sx={{
                mt: 5,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
                gap: 3,
            }}
        >
            {items.map((el) => {
                const fromDate = new Date(el.startDate).toLocaleDateString("lt-LT");
                const endDate = new Date(el.endDate).toLocaleDateString("lt-LT");

                return (
                    <Paper
                        key={el.id}
                        elevation={1}
                        sx={{
                            [theme.breakpoints.down("sm")]: {
                                width: 350,
                                height: 170,
                            },
                            width: 450,
                            height: 128,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                height: "100%",
                                justifyContent: "space-evenly",
                                [theme.breakpoints.down("sm")]: {
                                    flexDirection: "column",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 300,
                                    textAlign: "left",
                                    mt: 2,
                                    ml: 2,
                                }}
                            >

                                <Typography display={"inline-block"} color={"text.secondary"}>
                                    Date:
                                </Typography>
                                {` ${fromDate} - ${endDate}`}
                                <Typography display={"inline-block"} color={"text.secondary"}>
                                    Training Plan:
                                </Typography>
                                <Link
                                    component={RouterLink}
                                    to={`/training-plans/${el.trainingPlanId}/edit`}
                                    onClick={(e) => handleNavigate(e, el.trainingPlanId)}
                                >
                                    {el.trainingPlanName}
                                </Link>
                                <Box>
                                    <Typography display={"inline-block"} color={"text.secondary"}>
                                        No. of Workouts:
                                    </Typography>{" "}
                                    {el.workoutCount}
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant={"outlined"}
                                    onClick={() => navigate(`/schedules/${el.id}`)}
                                >
                                    View
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                );
            })}
        </Box>
    );
};
