import {Button, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import EventNoteIcon from "@mui/icons-material/EventNote";
import React from "react";

export const exerciseCard = (
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
) => (
    <>
        <CardContent>
            <SportsGymnasticsIcon/>
            <Typography sx={{fontSize: 20}} color="text.primary" gutterBottom>
                Exercises
            </Typography>
            <Typography variant="body2" color="text.secondary">
                View all exercises
            </Typography>
        </CardContent>
        <CardActions
            sx={{
                justifyContent: "center",
            }}
        >
            <Button onClick={handleClick} size="small">
                View All
            </Button>
        </CardActions>
    </>
);

export const generateWorkoutCard = (
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
) => (
    <>
        <CardContent>
            <EventNoteIcon/>
            <Typography sx={{fontSize: 20}} color="text.primary" gutterBottom>
                Generate Training Plan
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Get a new training plan designed specifically for you
            </Typography>
        </CardContent>
        <CardActions
            sx={{
                justifyContent: "center",
            }}
        >
            <Button onClick={handleClick} size="small">
                Get Started
            </Button>
        </CardActions>
    </>
);
