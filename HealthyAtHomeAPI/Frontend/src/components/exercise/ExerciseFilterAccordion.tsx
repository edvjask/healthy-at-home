import {Exercise} from "../../helpers/genericModels";
import {Accordion, AccordionDetails, AccordionSummary, Box, TextField, useTheme,} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React, {useEffect, useState} from "react";
import {ExerciseType, InventoryType, LevelsOfDifficulty, MuscleGroup,} from "../../enums/planOptionEnums";
import {CheckBoxGroup} from "./CheckBoxGroup";
import {splitCamelCase} from "../../helpers/inputValidator";

type ExerciseFilterAccordionProps = {
    exercises: Exercise[];
    setFilteredExercises: (val: any) => void;
};

export const ExerciseFilterAccordion = ({
                                            exercises,
                                            setFilteredExercises,
                                        }: ExerciseFilterAccordionProps) => {
    const theme = useTheme();

    const [nameInput, setName] = useState("");
    const [difficultyList, setDifficultyList] = useState<string[]>([]);
    const [typeList, setTypeList] = useState<string[]>([]);
    const [muscleList, setMuscleList] = useState([]);
    const [inventoryList, setInventoryList] = useState([]);

    useEffect(() => {
        if (exercises.length) {
            const filteredExercises = exercises.filter((exercise) => {
                const {
                    name,
                    exerciseDifficulty,
                    muscleGroups,
                    inventoryTypes,
                    exerciseType,
                } = exercise;

                let namePass = true;
                if (nameInput) {
                    namePass = name.toLowerCase().includes(nameInput);
                }
                let difficultyPass = true;
                if (difficultyList.length) {
                    difficultyPass = difficultyList.includes(
                        exerciseDifficulty.toString()
                    );
                }
                let typePass = true;
                if (typeList.length) {
                    typePass = typeList.includes(exerciseType.toString());
                }
                let musclePass = true;
                if (muscleList.length) {
                    musclePass = muscleList.some((item) =>
                        muscleGroups.includes(parseInt(item))
                    );
                }
                let inventoryPass = true;
                if (inventoryList.length) {
                    inventoryPass = inventoryList.some((item) =>
                        inventoryTypes.includes(parseInt(item))
                    );
                }
                //return check for all filters
                return (
                    namePass && difficultyPass && typePass && musclePass && inventoryPass
                );
            });
            setFilteredExercises(filteredExercises);
        }
    }, [
        difficultyList,
        exercises,
        inventoryList,
        muscleList,
        nameInput,
        setFilteredExercises,
        typeList,
    ]);

    return (
        <Box
            sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Accordion
                sx={{
                    width: 900,
                    [theme.breakpoints.down("md")]: {
                        width: 500,
                    },
                    [theme.breakpoints.down("sm")]: {
                        width: 300,
                    },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <FilterAltIcon/>
                    <Typography>Filter</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        [theme.breakpoints.down("sm")]: {
                            maxHeight: 400,
                            overflowY: "scroll",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 1,
                            [theme.breakpoints.down("sm")]: {
                                flexDirection: 'column',
                            },
                        }}
                    >
                        <Typography fontWeight={"bold"}>By Name</Typography>
                        <TextField
                            id="standard-search"
                            label="Enter name"
                            type="search"
                            variant="standard"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                            [theme.breakpoints.down("sm")]: {
                                flexDirection: 'column',
                                mt: 1,
                            },
                        }}
                    >
                        <Typography fontWeight={"bold"}>By Difficulty</Typography>
                        <CheckBoxGroup
                            values={[
                                LevelsOfDifficulty.Novice,
                                LevelsOfDifficulty.Intermediate,
                                LevelsOfDifficulty.Advanced,
                            ]}
                            labels={["Novice", "Intermediate", "Advanced"]}
                            setValueArray={setDifficultyList}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                            [theme.breakpoints.down("sm")]: {
                                flexDirection: 'column',
                            },
                        }}
                    >
                        <Typography fontWeight={"bold"}>By Type</Typography>
                        <CheckBoxGroup
                            values={Object.values(ExerciseType).filter(
                                (x) => typeof x === "number"
                            )}
                            labels={Object.values(ExerciseType)
                                .filter((x) => typeof x === "string")
                                .map((type) => splitCamelCase(type as string))}
                            setValueArray={setTypeList}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography fontWeight={"bold"}>By Muscle Groups</Typography>
                        <CheckBoxGroup
                            values={Object.values(MuscleGroup).filter(
                                (x) => typeof x === "number"
                            )}
                            labels={Object.values(MuscleGroup)
                                .filter((x) => typeof x === "string")
                                .map((type) => splitCamelCase(type as string))}
                            setValueArray={setMuscleList}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Typography fontWeight={"bold"}>By Inventory Types</Typography>
                        <CheckBoxGroup
                            values={Object.values(InventoryType).filter(
                                (x) => typeof x === "number"
                            )}
                            labels={Object.values(InventoryType)
                                .filter((x) => typeof x === "string")
                                .map((type) => splitCamelCase(type as string))}
                            setValueArray={setInventoryList}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
