import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {Box, Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

type RestWrapperProps = {
    restAmountMs: number;
    setShowRest: (val: boolean) => void;
    getNextExerciseName: () => string;
};

type RenderTimeType = {
    remainingTime: number;
}

export const RestWrapper = ({
                                restAmountMs,
                                setShowRest,
                                getNextExerciseName,
                            }: RestWrapperProps) => {
    const restDurationInS = restAmountMs / 1000;

    const thirdway = Math.floor(restDurationInS * 0.33);
    const threeFourths = Math.floor(restDurationInS * 0.75);

    const renderTime = ({remainingTime}: RenderTimeType) => {
        const time = new Date(remainingTime * 1000).toISOString().substr(14, 5);

        return (
            <Box
                sx={{
                    fontSize: 40,
                }}
            >
                {time}
            </Box>
        );
    };

    const goToNextExercise = () => {
        setShowRest(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    mt: 5,
                }}
            >
                <CountdownCircleTimer
                    isPlaying
                    duration={restDurationInS}
                    colors={["#45462A", "#7E5920", "#DC851F", "#FFB85C"]}
                    colorsTime={[restDurationInS, threeFourths, thirdway, 0]}
                    size={250}
                    onComplete={goToNextExercise}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography variant={"h6"} color={"text.secondary"} display={"inline"}>
                    Coming up next :
                </Typography>
                <Typography variant={"h6"} color={"primary.main"} display={"inline"}>
                    {` ${getNextExerciseName()}`}
                </Typography>
            </Box>
            <Button
                onClick={goToNextExercise}
                variant={"contained"}
                sx={{
                    mt: 2,
                }}
            >
                Skip
            </Button>
        </>
    );
};
