import React from "react";
import {Box, Card} from "@mui/material";
import Typography from "@mui/material/Typography";
import {exerciseCard, generateWorkoutCard} from "./homepageCards";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../contexts/UserAuthContext";

export const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const {user, isAdmin} = useUserContext();

    const handleExerciseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/exercises");
    };

    const handleGenerateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/generate-workout");
    };

    return (
        <Box
            sx={{
                mt: 10,
            }}
        >
            <Typography variant={"h3"}>Welcome to Healthy At Home!</Typography>
            <Typography
                color={"text.secondary"}
                variant={"h5"}
                sx={{
                    mt: 5,
                }}
            >
                Explore what You can do
            </Typography>
            <Box
                sx={{
                    minWidth: 275,
                    mt: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 5,
                }}
            >
                <Card
                    sx={{
                        alignItems: "center",
                        width: 300,
                        height: 250,
                    }}
                    variant={"outlined"}
                >
                    {exerciseCard(handleExerciseClick)}
                </Card>
                {user && !isAdmin && <Card
                    sx={{
                        alignItems: "center",
                        width: 300,
                        height: 250,
                    }}
                    variant={"outlined"}
                >
                    {generateWorkoutCard(handleGenerateClick)}
                </Card>}
            </Box>
        </Box>
    );
};
