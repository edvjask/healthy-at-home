import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {CopyrightBox} from "../components/CopyrightBox";
import {ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useEffect} from "react";
import {themeOptions} from "../components/global/ThemeOptions";
import {useUserContext} from "../contexts/UserAuthContext";
import {useThemeContext} from "../contexts/ThemeContext";

export const VerifyEmailPage = () => {

    const {mode} = useThemeContext();
    const theme = createTheme(themeOptions(mode));

    const {user} = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            user?.reload()
                .then(() => {
                    if (user?.emailVerified) {
                        clearInterval(interval)
                        navigate("/");
                    }
                })
        }, 1000);
    }, [navigate, user])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    style={{
                        marginTop: "10px",
                        display: "block",
                        alignItems: "center",
                        alignSelf: "center",
                        textAlign: "center",
                        color: theme.palette.primary.main,
                    }}
                >
                    <FitnessCenterIcon sx={{m: 1, fontSize: 56, fill: "#DC851F"}}/>
                    <Typography component="h1" variant="h4" color={"text.primary"}>
                        Healthy At Home
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h2" variant="h5">
                        Verify Link
                    </Typography>
                    <Typography variant={'body1'} color={'text.secondary'}>
                        A confirmation email has been set. Please check your inbox.
                    </Typography>
                </Box>
                <CopyrightBox sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}