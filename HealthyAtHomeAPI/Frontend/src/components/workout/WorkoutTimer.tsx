import TimerIcon from "@mui/icons-material/Timer";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import React from "react";

type WorkoutTimerProps = {
    formattedTime: string;
};

export const WorkoutTimer = ({formattedTime}: WorkoutTimerProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                mb: 2,
            }}
        >
            <TimerIcon style={{fill: "#DC851F"}}/>
            <Typography
                variant={"caption"}
                display={"inline"}
                color={"text.secondary"}
            >
                Time elapsed :{" "}
            </Typography>
            <Typography variant={"caption"} display={"inline"}>
                {formattedTime}
            </Typography>
        </Box>
    );
};
