import {
    Autocomplete,
    Box,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useMemo, useState} from "react";
import {AddExerciseCue, AddExerciseRequest, exerciseService} from "../../services/exerciseService";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {CueType, ExerciseType, InventoryType, LevelsOfDifficulty, MuscleGroup} from "../../enums/planOptionEnums";
import Typography from "@mui/material/Typography";
import {splitCamelCase} from "../../helpers/inputValidator";
import {Exercise} from "../../helpers/genericModels";
import {FileUpload, FileUploadProps} from "../global/FileUpload";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import {useUserContext} from "../../contexts/UserAuthContext";
import {appendModifiedYoutubeLink} from "../../helpers/genericHelpers";
import {useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {useSnackbarContext} from "../../contexts/SnackbarContext";

export type AddExercise = {
    name: string,
    instructions: string,
    exerciseCues: AddExerciseCue[],
    exerciseDifficulty: LevelsOfDifficulty,
    inventoryTypes: string[],
    muscleGroups: string[],
    exerciseType: ExerciseType,
    youtubeLink: string | null,
    harderVariationId: number | undefined | null,
    easierVariationId: number | undefined | null,
}

const initialFields: AddExercise = {
    name: "",
    instructions: "",
    exerciseCues: [],
    exerciseDifficulty: LevelsOfDifficulty.Novice,
    inventoryTypes: [],
    muscleGroups: [],
    exerciseType: ExerciseType.HorizontalPush,
    youtubeLink: "",
    harderVariationId: undefined,
    easierVariationId: undefined,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

interface ExerciseOptionType {
    id: number,
    label: string,
}

const defaultErrorState = {
    name: "",
    muscleGroups: "",
}

const MAX_GIF_SIZE = 6_000_000;

export const ExerciseAdd = () => {

    const {user} = useUserContext();

    const navigate = useNavigate();

    const [fields, setFields] = useState<AddExercise>(initialFields);
    const [exercises, setExercises] = useState<Exercise[] | null>();
    const [fieldErrors, setFieldErrors] = useState(defaultErrorState);
    const [easierValue, setEasierValue] = useState<ExerciseOptionType | null>(null);
    const [exerciseCues, setExerciseCues] = useState<AddExerciseCue[]>([]);
    const [harderValue, setHarderValue] = useState<ExerciseOptionType | null>(null);
    const [exerciseGif, setExerciseGif] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const {openWithMessage} = useSnackbarContext();

    const anyFieldErrors = Object.values(fieldErrors).some(e => Boolean(e)) || !fields.name || !fields.muscleGroups.length || !fields.instructions;
    const anyCueErrors = exerciseCues.some(cue => !cue.description);
    const fileError = !exerciseGif || exerciseGif.type !== 'image/gif' || exerciseGif.size > MAX_GIF_SIZE;

    const isFormDisabled = anyCueErrors || anyFieldErrors || fileError;

    useEffect(() => {
        const getExercises = async () => {
            setLoading(true);
            const resp = await exerciseService.getAll();
            if (resp && resp.data) {
                const {success, data} = resp.data;
                if (success) {
                    setExercises(data);
                }
            }

            setLoading(false);
        };
        getExercises();
    }, []);

    useEffect(() => {
        //reset harder and easier options
        setEasierValue(null);
        setHarderValue(null);
        setFields(prev => ({
            ...prev,
            easierVariationId: undefined,
            harderVariationId: undefined,
        }));
    }, [fields.exerciseType]);

    const fileUploadProp: FileUploadProps = {
        accept: "image/*",
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            if (
                event.target.files !== null &&
                event.target?.files?.length > 0
            ) {
                if (event.currentTarget.files) setExerciseGif(event.currentTarget.files[0]);
            }
        },
        onDrop: (event: React.DragEvent<HTMLElement>) => {
            if (event.dataTransfer.files[0]) setExerciseGif(event.dataTransfer.files[0]);
        },
        error: fileError,
        file: exerciseGif,
    };

    const filteredExercisesByType = useMemo(() => exercises ?
            exercises.filter(exercise => exercise.exerciseType === fields.exerciseType)
            : [],
        [exercises, fields.exerciseType]);

    const availableEasierExercisesOptions: ExerciseOptionType[] = filteredExercisesByType
        .filter(exercise => !exercise.harderVariationId)
        .map(e => {
            return {
                id: e.id,
                label: e.name
            };
        });
    const availableHarderExercisesOptions: ExerciseOptionType[] = filteredExercisesByType
        .filter(exercise => !exercise.easierVariationId)
        .map(e => {
            return {
                id: e.id,
                label: e.name
            };
        });

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number | string = event.target.value;
        switch (event.target.name) {
            case "exerciseType":
                value = parseInt(value);
                break;
            case "exerciseDifficulty":
                value = parseInt(value);
                break;
            default:
                break;
        }

        setFields(prev => ({
            ...prev,
            [event.target.name]: value
        }));
    };

    const handleMultipleSelectChange = (e: SelectChangeEvent<typeof fields.inventoryTypes | typeof fields.muscleGroups>) => {
        const {target: {value}} = e;

        setFields(prev => ({
            ...prev,
            [e.target.name]: typeof value === "string" ? value.split(",") : value
        }));

    };

    const handleAddCue = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setExerciseCues(prev => [...prev, {cueType: CueType.Do, description: ""}]);
    };

    const handleCueTypeChange = (e: SelectChangeEvent<CueType>, index: number) => {
        const cuesCopy = [...exerciseCues];
        let cue = cuesCopy[index];
        cue.cueType = parseInt(e.target.value as string);
        setExerciseCues(cuesCopy);
    };

    const handleCueDescription = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
                                  index: number) => {
        const cuesCopy = [...exerciseCues];
        let cue = cuesCopy[index];
        cue.description = e.target.value;
        setExerciseCues(cuesCopy);
    };

    const handleRemoveCue = (e: React.MouseEvent<HTMLElement>, index: number) => {
        setExerciseCues(prev => prev.filter((_, i) => i !== index));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        const filteredFields = Object.entries(fields)
            .reduce<Partial<AddExercise>>((acc, [k, v]) => v ? {...acc, [k]: v} : acc, {})

        setLoading(true);
        const token = await user?.getIdToken();

        try {
            if (token && exerciseGif) {
                const data: AddExerciseRequest = {
                    token,
                    addExerciseDto: {
                        ...filteredFields,
                        exerciseCues,
                        youtubeLink: fields.youtubeLink ? appendModifiedYoutubeLink(fields.youtubeLink) : null,
                        easierVariationId: fields.easierVariationId ?? null,
                        harderVariationId: fields.harderVariationId ?? null,
                    },

                }
                const exerciseResponse = await exerciseService.postNewExercise(data);
                if (exerciseResponse) {
                    const {data, success, message} = exerciseResponse.data;
                    if (success) {
                        const gifResponse = await exerciseService.postExerciseGif(exerciseGif, data.id, token);
                        if (gifResponse) {
                            const {success, message} = gifResponse.data;
                            //great, successfully added, show success snack and redirect!
                            if (success) navigate('/exercises');
                            else openWithMessage(message ?? "");
                        } else {
                            openWithMessage("Internal server error posting gif");
                        }
                    } else {
                        openWithMessage(message ?? "");
                    }
                } else {
                    openWithMessage("Internal server error posting exercise");
                }
            }
        } catch {
            setLoading(false);
        } finally {
            setLoading(false);
        }


    }

    return <Box>
        <Typography variant={"h4"} color={"text.secondary"} sx={{mt: 2, mb: 3}}>
            Add Exercise
        </Typography>
        <Grid container spacing={5} rowSpacing={4} sx={{
            textAlign: "left"
        }}>
            <Grid item xs={4}>
                <TextField
                    autoFocus
                    required
                    autoComplete={"off"}
                    variant="outlined"
                    name="name"
                    error={fields.name.length < 5}
                    label="Name"
                    helperText={"Enter exercise name here"}
                    onChange={handleInput}
                    value={fields.name}
                    fullWidth
                />
            </Grid>
            <Grid item xs={4}>
                <FormControl>
                    <FormLabel id="difficulty-radio-buttons-group">Difficulty</FormLabel>
                    <RadioGroup
                        aria-labelledby="difficulty-radio-buttons-group"
                        value={fields.exerciseDifficulty}
                        onChange={handleInput}
                        name="exerciseDifficulty"
                        aria-required={"true"}
                    >
                        <FormControlLabel value={LevelsOfDifficulty.Novice} control={<Radio/>} label="Novice"/>
                        <FormControlLabel value={LevelsOfDifficulty.Intermediate} control={<Radio/>}
                                          label="Intermediate"/>
                        <FormControlLabel value={LevelsOfDifficulty.Advanced} control={<Radio/>} label="Advanced"/>
                    </RadioGroup>
                    <FormHelperText>Select Exercise Difficulty</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{width: 350}}>
                    <InputLabel id="inventory-types-select">Inventory Types</InputLabel>
                    <Select
                        labelId="inventory-types-select"
                        id="inventory-types-chip"
                        multiple
                        fullWidth
                        name={"inventoryTypes"}
                        value={fields.inventoryTypes}
                        onChange={handleMultipleSelectChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Inventory Types"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value}
                                          label={splitCamelCase(InventoryType[value as unknown as number])}/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {Object.values(InventoryType).filter(type => !isNaN(Number(type))).map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {splitCamelCase(InventoryType[name as unknown as number])}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select all the inventory exercise can be completed with or leave empty if doesn't
                        need any</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    variant="outlined"
                    name="instructions"
                    label="Instructions"
                    autoComplete={"off"}
                    rows={4}
                    error={!fields.instructions || fields.instructions.length < 10}
                    inputProps={{maxLength: 300}}
                    onChange={handleInput}
                    value={fields.instructions}
                    multiline
                    helperText={`Enter detailed exercise instructions. ${fields.instructions?.length} / 300`}
                    sx={{
                        width: 350
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <FormControl>
                    <FormLabel id="movement-type-radio-buttons-group">Type of Movement</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="movement-type-radio-buttons-group"
                        value={fields.exerciseType}
                        onChange={handleInput}
                        name="exerciseType"
                        aria-required={"true"}
                    >
                        {Object.values(ExerciseType).filter(t => !isNaN(Number(t))).map((name) => (
                            <FormControlLabel value={name} key={name} control={<Radio/>}
                                              label={splitCamelCase(ExerciseType[name as unknown as number])}/>
                        ))}
                    </RadioGroup>
                    <FormHelperText>Select what kind of exercise it is</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{width: 350}}>
                    <InputLabel id="muscle-groups-select">Muscle Groups</InputLabel>
                    <Select
                        labelId="muscle-groups-select"
                        id="muscle-groups-chip"
                        multiple
                        fullWidth
                        required
                        error={!fields.muscleGroups.length}
                        name={"muscleGroups"}
                        value={fields.muscleGroups}
                        onChange={handleMultipleSelectChange}
                        input={<OutlinedInput id="muscle-groups-chip" label="Muscle Groups"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={MuscleGroup[value as unknown as number]}/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {Object.values(MuscleGroup).filter(type => !isNaN(Number(type))).map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {splitCamelCase(MuscleGroup[name as unknown as number])}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Muscle groups targeted by the exercise</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    autoComplete={"off"}
                    variant="outlined"
                    name="youtubeLink"
                    label="Youtube Link"
                    helperText={"Provide X identifier from YouTube link: https://www.youtube.com/watch?v=XXXXXXXXX"}
                    onChange={handleInput}
                    value={fields.youtubeLink}
                    fullWidth
                />
            </Grid>
            {filteredExercisesByType.length ?
                <>
                    <Grid item xs={4}>
                        <Autocomplete
                            options={availableEasierExercisesOptions}
                            id="easier-variation-select"
                            value={easierValue}
                            onChange={(event: any, newValue: ExerciseOptionType | null) => {
                                setFields(prev => ({...prev, easierVariationId: newValue?.id}));
                                setEasierValue(newValue);
                            }}
                            isOptionEqualToValue={(option, value) => {
                                return option.id === value.id;
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                           label="Easier Variation"
                                           variant="standard"
                                           helperText={"Select easier exercise progression if applicable"}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Autocomplete
                            options={availableHarderExercisesOptions}
                            id="harder-variation-select"
                            value={harderValue}
                            onChange={(event: any, newValue: ExerciseOptionType | null) => {
                                setFields(prev => ({...prev, harderVariationId: newValue?.id}));
                                setEasierValue(newValue);
                            }}
                            isOptionEqualToValue={(option, value) => {
                                return option.id === value.id;
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                           label="Harder Variation"
                                           variant="standard"
                                           helperText={"Select harder exercise progression if applicable"}
                                />
                            )}
                        />
                    </Grid>
                </> : <Grid item xs={8}><CircularProgress/></Grid>}
            <Grid item xs={12}>
                <FileUpload {...fileUploadProp} />
            </Grid>
            <Divider orientation="horizontal" flexItem sx={{mt: 1, mb: 1, width: "100%"}}/>
            <Grid item xs={3}>
                <Box sx={{
                    mb: 5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>
                    <Typography variant={"h5"} color={"text.secondary"}>
                        Exercise Cues
                    </Typography>
                    <Typography variant={"body1"}>
                        (Optional) Provide form cues by clicking "+" icon
                    </Typography>
                    <Fab onClick={handleAddCue} color="primary" aria-label="add">
                        <AddIcon/>
                    </Fab>
                </Box>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{mt: 1, mb: 1,}}/>
            {exerciseCues.map((cue, index) => (
                <Grid key={index} item xs={4}>
                    <Paper elevation={2} sx={{pl: 1, pr: 1, pt: 2, pb: 2}}>
                        <Box sx={{display: "flex", gap: 1,}}>
                            <FormControl>
                                <InputLabel id={`select-cue-type-${index}`}>Type</InputLabel>
                                <Select
                                    labelId={`select-cue-type-${index}`}
                                    id={`select-cue-type-select-${index}`}
                                    value={exerciseCues[index].cueType}
                                    label="Type"
                                    onChange={(e) => handleCueTypeChange(e, index)}
                                >
                                    <MenuItem value={CueType.Do}><CheckIcon/></MenuItem>
                                    <MenuItem value={CueType.Dont}><CloseIcon/></MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                autoFocus
                                required
                                autoComplete={"off"}
                                variant="outlined"
                                name="description"
                                label="Description"
                                helperText={"Enter exercise description here"}
                                onChange={(e) => handleCueDescription(e, index)}
                                value={exerciseCues[index].description}
                            />
                            <IconButton onClick={(e) => handleRemoveCue(e, index)} size={'small'}>
                                <DeleteIcon fontSize={'inherit'}/>
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
        <LoadingButton
            loading={loading}
            loadingPosition={'center'}
            variant={'contained'}
            disabled={isFormDisabled}
            onClick={handleSubmit}
            sx={{m: 4, textAlign: 'center'}}>
            Add
        </LoadingButton>
    </Box>;
};