import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import React from "react";
import {DrawerHeader} from "./global/MuiStyledHelpers";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../contexts/UserAuthContext";

type AppDrawerProps = {
    drawerWidth: number;
    open: boolean;
    toggleDrawer: () => void;
};

export const AppDrawer: React.FC<AppDrawerProps> = ({
                                                        drawerWidth,
                                                        toggleDrawer,
                                                        open,
                                                    }) => {
    const theme = useTheme();

    const navigate = useNavigate();
    const {user, isAdmin} = useUserContext();

    const handleNavigate = (path: string) => {
        navigate(path);
        toggleDrawer();
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={toggleDrawer}>
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon/>
                    ) : (
                        <ChevronRightIcon/>
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItemButton onClick={() => handleNavigate("/")}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"}/>
                </ListItemButton>
                <Divider/>
                <ListItemButton onClick={() => handleNavigate("/exercises")}>
                    <ListItemIcon>
                        <FitnessCenterIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Exercises"}/>
                </ListItemButton>
                {isAdmin && (
                    <ListItemButton sx={{pl: 10}} onClick={() => handleNavigate("/exercises/add")}>
                        <ListItemText secondary="Add Exercise"/>
                    </ListItemButton>
                )}
                {user && !isAdmin && <><ListItemButton onClick={() => handleNavigate("/training-plans")}>
                    <ListItemIcon>
                        <NoteAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"My Plans"}/>
                </ListItemButton>
                    <ListItemButton onClick={() => handleNavigate("/schedules")}>
                        <ListItemIcon>
                            <EventNoteIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"My Schedules"}/>
                    </ListItemButton></>}
            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Options"}/>
                </ListItem>
            </List>
        </Drawer>
    );
};
