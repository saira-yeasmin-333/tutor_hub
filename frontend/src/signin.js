import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Link,
    Card,
    CardContent,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { setLoading, showError, showToast } from "./App";

const cookies = new Cookies();
const COOKIE_AGE = 31536000;

const checkAuth = () => {
    return !(cookies.get("token") === undefined || cookies.get("token") === null);
};

const logout = () => {
    cookies.remove("token", { path: "/" });
};

function SignIn() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            var res = await axios.post('http://localhost:5000/api/signin', { email, password });
            console.log(res.data)
            setLoading(false)
            if (res.data.success) {
                cookies.set('token', res.data.token, { path: '/', maxAge: COOKIE_AGE }) //setting token
                history('/location')
            } else {
                showError(res.data.error)
            }

            // Successful sign-in. You can redirect the user or perform other actions here.
        } catch (error) {
            setLoading(false)
            showToast(error.error)
            console.error('Error signing in:', error.message);
            // Handle sign-in error here.
        }
    }

    const TutorHubText = styled(Typography)(({ theme }) => ({
        color: "black",
        fontWeight: "bold",
        fontFamily: "cursive",
        // Add any additional styles you want
    }));

    return (
        <Container
            component="main"
            maxWidth="xl"
            sx={{
                width: "100%",
                minHeight: "100vh",
                backgroundColor: '#BDCDF5',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Card sx={{ width: "100%", maxWidth: 400, p: 3 }}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{ color: "#007bff", textAlign: "center", mb: 2 }}
                        >
                            Sign in
                        </Typography>
                        <form onSubmit={handleSignIn}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={handleEmailChange}
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
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Link href="/forgot-password" variant="body2">
                                    Forgot Password?
                                </Link>
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                                onClick={handleSignIn}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default SignIn;
export { checkAuth, logout };