import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Box,
    Checkbox,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {AlternativesGroup} from "../../services/trainingPlanService";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ExerciseTypeIcon} from "./ExerciseTypeIcon";
import {getInventoryString} from "../../helpers/trainingPlanHelper";

type AlternativeBoxProps = {
    alternativeGroup: AlternativesGroup;
    setExercises?: Dispatch<SetStateAction<number[] | []>>;
    setValidationError: (val: boolean) => void;
};

export const AlternativeBox: React.FC<AlternativeBoxProps> = ({
                                                                  alternativeGroup,
                                                                  setExercises,
                                                                  setValidationError,
                                                              }) => {
    const {id} = alternativeGroup.exercises[0];

    const [checked, setChecked] = useState([id]);

    useEffect(() => {
        if (checked.length < alternativeGroup.alternativesToChoose) {
            setValidationError(true);
        } else {
            setValidationError(false);
        }
    }, [checked]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
            setExercises &&
            setExercises((prev) => {
                return [...prev, value];
            });
        } else {
            if (setExercises) {
                setExercises((prev) => {
                    // @ts-ignore
                    const index = prev.indexOf(value);
                    return prev.filter((_, i) => i !== index);
                });
            }
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Box sx={{mt: 4}}>
            <Paper elevation={1} sx={{width: 380, margin: "0 auto"}}>
                <Grid
                    container
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                        gap: 2,
                        pt: 2,
                    }}
                >
                    <Grid item>
                        <ExerciseTypeIcon type={alternativeGroup.categoryType}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h6"}>
                            {alternativeGroup.categoryType}
                        </Typography>
                    </Grid>
                </Grid>

                <List disablePadding>
                    {alternativeGroup.exercises.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                            <ListItem
                                key={value.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <MoreHorizIcon/>
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton onClick={handleToggle(value.id)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{"aria-labelledby": labelId}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        primary={value.name}
                                        secondary={`Inventory: ${
                                            getInventoryString(value.inventoryTypes) || "-"
                                        }`}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                    <ListItemText
                        primaryTypographyProps={{
                            fontSize: 15,
                            color:
                                checked.length >= alternativeGroup.alternativesToChoose
                                    ? "#FFF"
                                    : "red",
                        }}
                    >
                        Select at least {alternativeGroup.alternativesToChoose}
                    </ListItemText>
                </List>
                <Divider/>
            </Paper>
        </Box>
    );
};
