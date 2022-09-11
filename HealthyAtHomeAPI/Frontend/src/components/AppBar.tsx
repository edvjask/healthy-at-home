import {Box, IconButton, styled, Switch, Toolbar, Tooltip, useMediaQuery, useTheme} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {useUserContext} from "../contexts/UserAuthContext";
import {Link, useNavigate} from "react-router-dom";
import {UserInfoBox} from "./UserInfoBox";
import {useThemeContext} from "../contexts/ThemeContext";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type GlobalAppBarProps = {
  drawerWidth: number;
  open: boolean;
  toggleDrawer: () => void;
};

export const GlobalAppBar: React.FC<GlobalAppBarProps> = ({
                                                            drawerWidth,
                                                            open,
                                                            toggleDrawer,
                                                          }) => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

    const {mode, toggleMode} = useThemeContext();
    const theme = useTheme();

    const {user} = useUserContext();

    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    toggleMode(isChecked ? "dark" : "light");
  }

  return (
      <AppBar position="absolute" open={open}>
        <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
        >
          <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                  marginRight: "36px",
                  ...(open && {display: "none"}),
              }}
          >
              <MenuIcon/>
          </IconButton>
            <FitnessCenterIcon sx={{mr: 2, fill: "#DC851F"}}/>
            {!Boolean(isMobile) && (
                <Typography
                    component={Link}
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1, textDecoration: "none"}}
                    to={"/"}
                >
                    Healthy At Home
                </Typography>
            )}
            <Box sx={{display: "flex", gap: 1, alignItems: 'center',}}>
                <Typography>Dark Mode</Typography>
                <Switch
                    checked={mode === 'dark'}
                    onChange={handleSwitchChange}
                    inputProps={{'aria-label': 'controlled'}}
                />
                {user ? (
                    <UserInfoBox/>
                ) : (
                <Tooltip title="Login">
                  <IconButton onClick={handleRedirectToLogin}>
                    <LoginIcon/>
                  </IconButton>
                </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>
  );
};
