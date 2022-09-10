import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {themeOptions} from "../components/global/ThemeOptions";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {Alert, CircularProgress, IconButton} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {useUserContext} from "../contexts/UserAuthContext";
import {CopyrightBox} from "../components/CopyrightBox";
import {useThemeContext} from "../contexts/ThemeContext";


export default function SignIn() {
  const navigate = useNavigate();

  const {mode} = useThemeContext();
  const theme = createTheme(themeOptions(mode));


  const {
    user,
    error,
    loading,
    signInUser,
    signInWithGoogle,
    signInWithFacebook,
  }: any = useUserContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();

    try {
      const resp = await signInUser(email, password);
      if (resp) navigate("/");
    } catch (er) {

    }
  };

  const handleGoogleLogin = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const resp = await signInWithGoogle();
      if (resp) navigate("/");
    } catch (err) {
    }
  };

  const handleFacebookLogin = async (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const resp = await signInWithFacebook();
      if (resp) navigate("/");
    } catch (err) {
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            <Typography component="h2" variant="h5">
              Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{mt: 1}}
            >
              {error && (
                  <Alert sx={{m: 4}} severity="error">
                    {error}
                  </Alert>
              )}

              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
              />
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Remember me"
              />

              {loading && <CircularProgress size={48}/>}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <hr/>
              <Container>
                <Typography variant={"body1"} sx={{textAlign: "center"}}>
                  Other sign in options
                </Typography>
                <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
                  <IconButton onClick={handleGoogleLogin}>
                    <GoogleIcon fontSize={"large"}/>
                  </IconButton>
                  <IconButton onClick={handleFacebookLogin}>
                    <FacebookIcon fontSize={"large"}/>
                  </IconButton>
                </Box>
              </Container>
            </Box>
          </Box>
          <CopyrightBox sx={{mt: 5}}/>
        </Container>
      </ThemeProvider>
  );
}
