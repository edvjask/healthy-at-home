import React, {useState} from "react";
import {Box, Container, createTheme, CssBaseline, ThemeProvider,} from "@mui/material";
import {AppDrawer} from "../components/AppDrawer";
import {GlobalAppBar} from "../components/AppBar";
import {DrawerHeader, Main} from "../components/global/MuiStyledHelpers";
import {themeOptions} from "../components/global/ThemeOptions";
import "../styles/App.css";
import {Outlet} from "react-router-dom";
import {SnackBar} from "../components/SnackBar";
import {useSnackbarContext} from "../contexts/SnackbarContext";
import {CopyrightBox} from "../components/CopyrightBox";
import {useThemeContext} from "../contexts/ThemeContext";

function App() {
  const drawerWidth: number = 240;
  const {mode} = useThemeContext();

  const mdTheme = createTheme(themeOptions(mode));
  const [drawerOpen, setDrawerOpen] = useState(false);


  const {open, setOpen, message, handleClose} = useSnackbarContext();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{display: "flex"}}>
          <CssBaseline/>
          <GlobalAppBar
              drawerWidth={drawerWidth}
              open={drawerOpen}
              toggleDrawer={toggleDrawer}
          />
          <AppDrawer
              drawerWidth={drawerWidth}
              open={drawerOpen}
              toggleDrawer={toggleDrawer}
          />
          <Main>
            <div className="background-wrap">
              <div className="content">
                <Container
                    sx={{
                      textAlign: "center",
                    }}
                >
                  <DrawerHeader/>
                  <Outlet/>
                  <CopyrightBox sx={{mt: 5}}/>
                  <SnackBar open={open} handleClose={handleClose} message={message}/>
                </Container>
              </div>
            </div>


          </Main>
        </Box>

      </ThemeProvider>
  );
}

export default App;
