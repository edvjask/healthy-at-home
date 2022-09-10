import {
    Alert,
    Box,
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {themeOptions} from "../components/global/ThemeOptions";
import {CopyrightBox} from "../components/CopyrightBox";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {LoadingButton} from "@mui/lab";
import {createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import {auth} from "../config/firebase-config";
import {useThemeContext} from "../contexts/ThemeContext";


export const Register = () => {

    const {mode} = useThemeContext();
    const theme = createTheme(themeOptions(mode));


    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        setErrorMessage("");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const displayName = `${data.get("firstName")} ${data.get("lastName")}`;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const passwordConfirm = data.get("password-confirm");

        if (password !== passwordConfirm) {
            setErrorMessage("Passwords do not match");
        } else if (!email) {
            setErrorMessage("Email must be valid");
        } else {
            //register
            setLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, email, password);

                if (auth && auth.currentUser) {
                    await sendEmailVerification(auth.currentUser);
                    await updateProfile(auth.currentUser, {
                        displayName
                    });
                }
                navigate("/verify-email");
            } catch (err: any) {
                setErrorMessage(err.message)
            } finally {
                setLoading(false);
            }
        }
    };

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
                    <IconButton aria-label="home" onClick={() => navigate("/")}>
                        <FitnessCenterIcon sx={{m: 1, fontSize: 56, fill: "#DC851F"}}/>
                    </IconButton>
                    <Typography component="h1" variant="h4" color={"text.primary"}>
                        Healthy At Home
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {Boolean(errorMessage) &&
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password-confirm"
                                    label="Confirm Password"
                                    type="password"
                                    id="password-confirm"
                                    autoComplete="password-confirm"
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            loading={loading}
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <CopyrightBox sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}