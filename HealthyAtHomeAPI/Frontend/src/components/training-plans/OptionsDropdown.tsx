import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useState} from "react";
import {GetTrainingPlan} from "../../services/trainingPlanService";
import {useNavigate} from "react-router-dom";

type OptionsDropdownProps = {
    trainingPlan: GetTrainingPlan;
};

export const OptionsDropdown = ({trainingPlan}: OptionsDropdownProps) => {
    let navigate = useNavigate();

    const settings = ["Generate Schedule", "Edit Plan", "Remove Plan"];

    const [anchorDropdown, setAnchorDropdown] = useState<null | HTMLElement>(
        null
    );

    const handleOpenDropdown = (
        event: React.MouseEvent<HTMLElement>,
        planId: number
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
            case "Generate Schedule":
                navigate(`${trainingPlan.id}/generate-schedule`);
                break;
            case "Edit Plan":
                navigate(`${trainingPlan.id}/edit`, {state: trainingPlan});
                break;
            default:
                return;
        }
    };

    return (
        <>
            <IconButton
                aria-label={`plan-${trainingPlan.id}-options`}
                aria-controls={`${trainingPlan.id}-options`}
                aria-haspopup={"true"}
                onClick={(e) => handleOpenDropdown(e, trainingPlan.id)}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: 5,
                }}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id={`${trainingPlan.id}-options`}
                anchorEl={anchorDropdown}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
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
