import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {
    Box,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {planOptions} from "./GenerateWorkoutForm";
import {Gender, HeightUnits, WeightUnits} from "../../enums/planOptionEnums";
import {isNumberPositiveAndLessThanValue} from "../../helpers/inputValidator";
import {getWeightUnits, heightUnitsItems, weightUnitsItems,} from "../../helpers/generalInfoFormHelpers";
import {ImageWithText} from "../../images/ImageWithText";
import GeneralImage from '../../images/general-details-image.jpg';

type GeneralInfoFormProps = {
    planOptions: planOptions | null;
    updateTrainingPlan: (planOptions: planOptions) => void;
    setValidationErrors: (value: boolean) => void;
};

type GeneralInfoErrors = {
    weightError?: string;
    heightError?: string;
    ageError?: string;
    heightFeetError?: string;
    heightInchesError?: string;
};

type ImperialHeight = {
    feet: string;
    inches: string;
};

export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({
                                                                    planOptions,
                                                                    updateTrainingPlan,
                                                                    setValidationErrors,
                                                                }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [inputErrors, setInputErrors] = useState<GeneralInfoErrors>({
        weightError: "",
        heightError: "",
        ageError: "",
        heightFeetError: "",
        heightInchesError: "",
    });
    const [imperialHeight, setImperialHeight] = useState<ImperialHeight>({
        feet: "",
        inches: "",
    });

    useEffect(() => {
        const hasErrors = Object.values(inputErrors).some(Boolean);
        setValidationErrors(hasErrors);
    }, [inputErrors]);

    useEffect(() => {
        if (Object.values(imperialHeight).every(Boolean)) {
            updateTrainingPlan({
                ...planOptions,
                height: `${imperialHeight.feet}'${imperialHeight.inches}"`,
            });
        }
    }, [imperialHeight]);

    const {heightUnits, weightUnits} = planOptions!!;

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value as keyof Gender);
        updateTrainingPlan({...planOptions, gender: value});
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        if (!isNumberPositiveAndLessThanValue(val, 500)) {
            setInputErrors({
                ...inputErrors,
                weightError: `Input must be a positive and less than 500 value`,
            });
        } else {
            setInputErrors({...inputErrors, weightError: ""});
        }

        updateTrainingPlan({...planOptions, weight: val});
    };

    const handleHeightUnitChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateTrainingPlan({
            ...planOptions,
            height: "",
            heightUnits: parseInt(event.target.value as keyof HeightUnits),
        });
        setImperialHeight({
            feet: "",
            inches: "",
        });
        setInputErrors({
            ...inputErrors,
            heightFeetError: "",
            heightInchesError: "",
        });
    };

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTrainingPlan({
            ...planOptions,

            weightUnits: parseInt(event.target.value as keyof WeightUnits),
        });
    };

    const handleHeightChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        isImperial?: boolean,
        inputType?: string
    ) => {
        const value = event.target.value;

        if (isImperial) {
            if (!isNumberPositiveAndLessThanValue(value, 10)) {
                if (inputType === "feet") {
                    setInputErrors({
                        ...inputErrors,
                        heightFeetError: "Input must be a positive and less than 10 value",
                    });
                } else if (!isNumberPositiveAndLessThanValue(value, 12)) {
                    setInputErrors({
                        ...inputErrors,
                        heightInchesError: "Input must be a positive and less than 12 value",
                    });
                }
            } else {
                if (inputType === "feet") {
                    setInputErrors({
                        ...inputErrors,
                        heightFeetError: "",
                    });
                } else {
                    setInputErrors({
                        ...inputErrors,
                        heightInchesError: "",
                    });
                }
            }
            setImperialHeight({...imperialHeight, [inputType!!]: value});
        } else {
            if (!isNumberPositiveAndLessThanValue(value, 300)) {
                setInputErrors({
                    ...inputErrors,
                    heightError: "Input must be a positive and less than 300 value",
                });
            } else {
                setInputErrors({...inputErrors, heightError: ""});
            }
            updateTrainingPlan({
                ...planOptions,

                height: event.target.value,
            });
        }
    };

    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        if (!isNumberPositiveAndLessThanValue(val, 110)) {
            setInputErrors({
                ...inputErrors,
                ageError: "Input must be a positive and less than 110 value",
            });
        } else {
            setInputErrors({...inputErrors, ageError: ""});
        }

        updateTrainingPlan({...planOptions, age: val});
    };

    return (
        <>
            <Typography variant={"h5"} color={"text.secondary"}>
                Please provide some details about you
            </Typography>
            <hr/>
            <Paper elevation={7} sx={{p: 2}}>
                <Box display={'flex'} sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    {!isMobile && (
                        <>
                            <ImageWithText label={"General Details"}
                                           image={GeneralImage}
                                           width={560}
                                           height={360}
                            />
                            <Divider orientation={"vertical"} flexItem/>
                        </>
                    )}
                    <Box>
                        <FormControl sx={{mt: 5}}>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={planOptions?.gender}
                                onChange={handleGenderChange}
                            >
                                <FormControlLabel
                                    value={Gender.Female}
                                    control={<Radio/>}
                                    label="Female"
                                />
                                <FormControlLabel
                                    value={Gender.Male}
                                    control={<Radio/>}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value={Gender.Other}
                                    control={<Radio/>}
                                    label="Other"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                mt: 3,
                                gap: 1,
                                justifyContent: "center",
                            }}
                        >
                            <TextField
                                error={Boolean(inputErrors.weightError)}
                                helperText={inputErrors.weightError}
                                id="weight-number"
                                label="Weight"
                                required
                                placeholder={`Weight in ${getWeightUnits(
                                    planOptions?.weightUnits!!
                                )}`}
                                value={planOptions?.weight}
                                onChange={handleWeightChange}
                            />
                            <TextField
                                id="outlined-select-weight-units"
                                select
                                label="Units"
                                value={planOptions?.weightUnits}
                                onChange={handleUnitChange}
                                helperText="Weight units"
                            >
                                {weightUnitsItems.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                mt: 3,
                                gap: 1,
                                justifyContent: "center",
                            }}
                        >
                            {heightUnits === HeightUnits.Centimeters ? (
                                <TextField
                                    error={Boolean(inputErrors.heightError)}
                                    helperText={inputErrors.heightError}
                                    id="height-metric-cm"
                                    label="Height"
                                    required
                                    placeholder={`Height in cm`}
                                    value={planOptions?.height}
                                    onChange={handleHeightChange}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 3,
                                    }}
                                >
                                    <TextField
                                        sx={{
                                            maxWidth: 100,
                                        }}
                                        error={Boolean(inputErrors.heightFeetError)}
                                        helperText={inputErrors.heightFeetError}
                                        id="height-imperial-feet"
                                        label="Feet"
                                        placeholder={`Feet`}
                                        value={imperialHeight.feet}
                                        onChange={(e) => handleHeightChange(e, true, "feet")}
                                    />
                                    <TextField
                                        sx={{
                                            maxWidth: 100,
                                        }}
                                        error={Boolean(inputErrors.heightInchesError)}
                                        helperText={inputErrors.heightInchesError}
                                        id="height-imperial-inches"
                                        label="Inches"
                                        placeholder={`Inches`}
                                        value={imperialHeight.inches}
                                        onChange={(e) => handleHeightChange(e, true, "inches")}
                                    />
                                </Box>
                            )}
                            <TextField
                                id="outlined-select-height-units"
                                select
                                label="Units"
                                value={planOptions?.heightUnits}
                                onChange={handleHeightUnitChange}
                                helperText="Height units"
                            >
                                {heightUnitsItems.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box
                            sx={{
                                mt: 1,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <TextField
                                error={Boolean(inputErrors.ageError)}
                                helperText={inputErrors.ageError}
                                id="age-number"
                                label="Age"
                                required
                                placeholder={"Enter your age"}
                                value={planOptions?.age}
                                onChange={handleAgeChange}
                            />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};
