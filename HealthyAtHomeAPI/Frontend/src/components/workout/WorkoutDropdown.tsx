import {useNavigate} from "react-router-dom";
import * as React from "react";
import {useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import {WorkoutInfo} from "../../helpers/genericModels";

type WorkoutDropdownProps = {
    workoutInfo: WorkoutInfo,
}

export const WorkoutDropdown = ({workoutInfo}: WorkoutDropdownProps) => {

    let navigate = useNavigate();

    const settings = ["Edit Workout"];

    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(
        null
    );

    const handleOpenDropdown = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        setAnchorDropdown(event.currentTarget);
    };

    const handleCloseDropdown = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorDropdown(null);
    };

    const handleMenuOptions = (option: string) => {
        switch (option) {
            case "Edit Workout":
                navigate("edit-workout", {state: workoutInfo});
                break;
            default:
                return;
        }
    };

    return (
        <>
            <IconButton
                aria-label={`workout-options-dropdown`}
                aria-controls={`workout-options`}
                aria-haspopup={"true"}
                onClick={(e) => handleOpenDropdown(e)}
                sx={{}}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id={`workout-options`}
                anchorEl={anchorDropdown}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorDropdown)}
                onClose={handleCloseDropdown}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuOptions(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};