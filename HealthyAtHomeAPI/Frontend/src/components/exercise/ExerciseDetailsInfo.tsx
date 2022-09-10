import Typography from "@mui/material/Typography";
import {Box, CircularProgress, Divider, Rating} from "@mui/material";
import fallbackImage from "../../images/fallback-image.png";
import {CueType, ExerciseType, LevelsOfDifficulty,} from "../../enums/planOptionEnums";
import {ExerciseCue} from "../physical-test-form/ExerciseCue";
import React, {useEffect, useState} from "react";
import {ExerciseInfo, exerciseService, ResultSet} from "../../services/exerciseService";
import "./css/exercise.css";
import {getInventoryString, getMuscleGroupString,} from "../../helpers/trainingPlanHelper";
import {splitCamelCase} from "../../helpers/inputValidator";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {useUserContext} from "../../contexts/UserAuthContext";
import {LineGraph} from "../global/LineGraph";
import {transformResultsForLineGraph} from "../../helpers/exerciseHelper";
import {useSnackbarContext} from "../../contexts/SnackbarContext";
import {NO_RESPONSE_LABEL} from "../../helpers/genericHelpers";

type ExerciseDetailsInfoProps = {
    exercise: ExerciseInfo;
};

export const ExerciseDetailsInfo = ({exercise}: ExerciseDetailsInfoProps) => {
    const {
        id,
        name,
        exerciseCues,
        exerciseDifficulty,
        exerciseType,
        easierVariationId,
        easierVariationName,
        harderVariationId,
        instructions,
        harderVariationName,
        muscleGroups,
        youtubeLink,
        inventoryTypes,
    } = exercise;

    const {user} = useUserContext();
    const {openWithMessage} = useSnackbarContext();

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ResultSet[] | null>()

    useEffect(() => {
        const getResults = async () => {
            setLoading(true);
            const token = await user?.getIdToken();
            if (token) {
                const response = await exerciseService.getExerciseResults(id, token);
                if (response) {
                    const {data, success, message} = response.data;
                    if (success) setResults(data);
                    else openWithMessage(message ?? "Server error");
                } else {
                    openWithMessage(NO_RESPONSE_LABEL)
                }
                setLoading(false);
            }
        }
        user && getResults();
    }, [id, user])

    return (
        <>
            <Typography
                variant={"h4"}
                color={"text.secondary"}
                fontWeight={"bold"}
                sx={{
                    mb: 4,
                }}
            >
                {name}
            </Typography>
            <section className={"section"}>
                <div className={"section__item section__item--start"}>
                    <Box
                        className={"media-box"}
                        sx={{
                            display: "flex",
                            gap: 4,
                            flexDirection: "column",
                        }}
                    >
                        <iframe
                            className={"exercise-media"}
                            src={youtubeLink}
                            title="Exercise Link"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <img
                            id={`${id}-exercise`}
                            src={`${process.env.REACT_APP_IMAGE_BASE_URL}/exercise/${id}.gif`}
                            onError={({currentTarget}) => {
                                currentTarget.onerror = null;
                                currentTarget.src = fallbackImage;
                            }}
                            alt={name + "_gif"}
                            className={"exercise-media"}
                        />
                    </Box>
                </div>
                <div className={"section__item section__item--end"}>
                    <Typography variant={"subtitle1"} color={"text.secondary"}>
                        {instructions}
                    </Typography>
                    <Box
                        sx={{
                            justifyContent: "center",
                            display: "flex",
                            gap: 2,
                            mt: 3,
                        }}
                    >
                        <Box>
                            {exerciseCues
                                .filter((cue) => cue.cueType === CueType.Do)
                                .map((val) => (
                                    <ExerciseCue good name={val.description} key={val.id}/>
                                ))}
                        </Box>
                        <Box>
                            {exerciseCues
                                .filter((cue) => cue.cueType === CueType.Dont)
                                .map((val) => (
                                    <ExerciseCue name={val.description} key={val.id}/>
                                ))}
                        </Box>
                    </Box>
                    <Divider sx={{mt: 3}}/>
                    <Box
                        sx={{
                            textAlign: "left",
                            mt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <Typography fontWeight={"bold"} display={"inline"}>
                                Type of Movement :
                            </Typography>
                            <Typography color={"text.secondary"} display={"inline"}>
                                {splitCamelCase(ExerciseType[exerciseType])}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <Typography fontWeight={"bold"} display={"inline"}>
                                Inventory :
                            </Typography>
                            <Typography color={"text.secondary"} display={"inline"}>
                                {getInventoryString(inventoryTypes) || '-'}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <Typography fontWeight={"bold"} display={"inline"}>
                                Muscle Groups :
                            </Typography>
                            <Typography color={"text.secondary"} display={"inline"}>
                                {getMuscleGroupString(muscleGroups)}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                            }}
                        >
                            <Typography fontWeight={"bold"} display={"inline"}>
                                Difficulty :
                            </Typography>
                            <Rating
                                readOnly
                                icon={<FiberManualRecordIcon fontSize="inherit"/>}
                                emptyIcon={<FiberManualRecordOutlinedIcon fontSize="inherit"/>}
                                defaultValue={exerciseDifficulty as number}
                                max={3}
                            />
                            <Typography
                                variant={"caption"}
                                color={"text.secondary"}
                                display={"inline"}
                            >
                                {LevelsOfDifficulty[exerciseDifficulty]}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{mt: 3}}/>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            mt: 2,
                            mb: 4,
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <ArrowUpwardIcon fontSize={"large"} sx={{fill: "#66bb6a"}}/>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Typography variant={"h6"} color={"text.secondary"}>
                                    Easier Variation
                                </Typography>
                                {easierVariationId ? (
                                    <Link
                                        component={RouterLink}
                                        to={`/exercises/${easierVariationId}`}
                                    >
                                        {easierVariationName}
                                    </Link>
                                ) : (
                                    "-"
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <ArrowUpwardIcon
                                fontSize={"large"}
                                sx={{fill: "#f44336", transform: "rotate(180deg)"}}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Typography variant={"h6"} color={"text.secondary"}>
                                    Harder Variation
                                </Typography>
                                {harderVariationId ? (
                                    <Link
                                        component={RouterLink}
                                        to={`/exercises/${harderVariationId}`}
                                    >
                                        {harderVariationName}
                                    </Link>
                                ) : (
                                    "-"
                                )}
                            </Box>
                        </Box>
                    </Box>
                </div>
            </section>
            {user ? loading || !results ? (<CircularProgress sx={{mt: 2}}/>) : results.length ? (<>
                <Divider sx={{mt: 3, mb: 2}}/>
                <Typography color={'text.secondary'} variant={'h5'} fontWeight={'bold'}>
                    Last 3 Workout Results :
                </Typography>
                <LineGraph data={transformResultsForLineGraph(results)} xAxisLabel={'Set #'}
                           yAxisLabel={'Repetitions'}/>
            </>) : null : null}
        </>
    );
};