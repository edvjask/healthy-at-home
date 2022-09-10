import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {planOptions} from "./GenerateWorkoutForm";
import {
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Paper,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {MuscleGroup} from "../../enums/planOptionEnums";
import {ObjectLiteral} from "../../types/genericTypes";
import {ImageWithText} from "../../images/ImageWithText";
import SideImage from "../../images/muscle-groups-image.jpg";

type MuscleGroupsProps = {
    planOptions: planOptions | null;
    updateTrainingPlan: (planOptions: planOptions) => void;
    setValidationErrors: (value: boolean) => void;
};

export const MuscleGroupsForm: React.FC<MuscleGroupsProps> = ({
                                                                  planOptions,
                                                                  updateTrainingPlan,
                                                                  setValidationErrors
                                                              }) => {


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const muscleGroups = Object.keys(MuscleGroup).filter((v) => isNaN(Number(v)));

    const initialCheckboxes: ObjectLiteral = {};

    muscleGroups.forEach((muscleGroup) => {
        initialCheckboxes[muscleGroup] = false;
    });

    const [checkboxesState, setCheckboxesState] = useState(initialCheckboxes);

    useEffect(() => {
        const hasErrors = Object.values(checkboxesState).every((v) => !v);
        setValidationErrors(hasErrors);
    }, [checkboxesState]);

    useEffect(() => {
        const groups: MuscleGroup[] = [];
        Object.entries(checkboxesState)
            .filter(([key, value]) => value)
            .forEach(([key, value]) => {
                // @ts-ignore
                groups.push(MuscleGroup[key]);
            });
        updateTrainingPlan({...planOptions, muscleGroupsWanted: groups});
    }, [checkboxesState]);

    const handleCheckMuscleGroup = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCheckboxesState({
            ...checkboxesState,
            [event.target.name]: event.target.checked
        });
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedAll = Object.keys(initialCheckboxes).reduce(
            (attrs, key) => ({
                ...attrs,
                [key]: event.target.checked
            }),
            {}
        );
        setCheckboxesState(selectedAll);
    };

    const error = Object.values(checkboxesState).every((v) => !v);

    const children = (
        <Box sx={{display: "flex", flexDirection: "column", ml: 3}}>
            {muscleGroups.map((val) => (
                <FormControlLabel
                    key={val}
                    control={
                        <Checkbox
                            checked={checkboxesState[val]}
                            onChange={handleCheckMuscleGroup}
                            name={val}
                        />
                    }
                    label={val}
                />
            ))}
        </Box>
    );

    const isIndeterminate = (): boolean => {
        const uniqueItems = Object.values(checkboxesState).reduce(
            (resultSet, item) => resultSet.add(item),
            new Set()
        ).size;
        return uniqueItems > 1;
    };

    return (
        <>
            <Typography variant={"h5"} color={"text.secondary"}>
                Select muscle groups to target
            </Typography>
            <hr/>
            <Paper elevation={7} sx={{
                p: 2, minHeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box display={"flex"} sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2
                }}>
                    {!isMobile &&
                        <>
                            <ImageWithText label={"Muscle Groups"} image={SideImage} width={560} height={360}/>
                            <Divider flexItem orientation={'vertical'}/>
                        </>}
                    <Box>
                        <FormControl
                            sx={{mt: 5}}
                            component={"fieldset"}
                            variant={"standard"}
                            error={error}
                        >
                            <FormLabel component="legend">Muscle groups to train</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    label="Select All"
                                    control={
                                        <Checkbox
                                            checked={Object.values(checkboxesState).every(Boolean)}
                                            indeterminate={isIndeterminate()}
                                            onChange={handleSelectAll}
                                        />
                                    }
                                />
                                {children}
                            </FormGroup>
                            <FormHelperText>Select at least one</FormHelperText>
                        </FormControl>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};
