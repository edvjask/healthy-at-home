import React, {useEffect, useState} from "react";
import {planOptions} from "./GenerateWorkoutForm";
import Typography from "@mui/material/Typography";
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
import {InventoryType} from "../../enums/planOptionEnums";
import {ObjectLiteral} from "../../types/genericTypes";
import {splitCamelCase} from "../../helpers/inputValidator";
import {ImageWithText} from "../../images/ImageWithText";
import SideImage from '../../images/inventory.jpg';

type InventoryFormProps = {
    planOptions: planOptions | null;
    updateTrainingPlan: (planOptions: planOptions) => void;
};

export const InventoryForm: React.FC<InventoryFormProps> = ({
                                                                planOptions,
                                                                updateTrainingPlan,
                                                            }) => {


    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const inventoryTypes = Object.keys(InventoryType).filter((v) =>
        isNaN(Number(v))
    );

    const initialCheckboxes: ObjectLiteral = {};

    inventoryTypes.forEach((inventoryType) => {
        initialCheckboxes[inventoryType] = false;
    });

    const [checkboxesState, setCheckboxesState] = useState(initialCheckboxes);

    useEffect(() => {
        const inventory: InventoryType[] = [];
        Object.entries(checkboxesState)
            .filter(([key, value]) => value)
            .forEach(([key, value]) => {
                // @ts-ignore
                inventory.push(InventoryType[key]);
            });
        updateTrainingPlan({...planOptions, inventoryTypes: inventory});
    }, [checkboxesState]);

    const handleCheckMuscleGroup = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCheckboxesState({
            ...checkboxesState,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedAll = Object.keys(initialCheckboxes).reduce(
            (attrs, key) => ({
                ...attrs,
                [key]: event.target.checked,
            }),
            {}
        );
        setCheckboxesState(selectedAll);
    };

    const children = (
        <Box sx={{display: "flex", flexDirection: "column", ml: 3}}>
            {inventoryTypes.map((val) => (
                <FormControlLabel
                    key={val}
                    control={
                        <Checkbox
                            checked={checkboxesState[val]}
                            onChange={handleCheckMuscleGroup}
                            name={val}
                        />
                    }
                    label={splitCamelCase(val)}
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
                Select inventory you have available
            </Typography>
            <hr/>
            <Paper elevation={7} sx={{p: 2, minHeight: 500, justifyContent: 'center'}}>
                <Box display={'flex'} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    {!isMobile &&
                        <>
                            <ImageWithText label={"Inventory"} image={SideImage} width={560} height={360}/>
                            <Divider flexItem orientation={"vertical"}/>
                        </>
                    }
                    <Box>
                        <FormControl sx={{mt: 5}} component={"fieldset"} variant={"standard"}>
                            <FormLabel component="legend">Inventory Types</FormLabel>
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
                            <FormHelperText>
                                Inventory on hand is optional and will provide you with additional
                                exercises
                            </FormHelperText>
                        </FormControl>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};
