import { useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import './signin.css'
import { setLoading, showError, showToast } from "./App";
import {useNavigate} from 'react-router-dom';

import FormControl from '@mui/base/FormControl';
import { Rating } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { Container, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link } from '@mui/material'; // Import Material-UI components

const cookies = new Cookies();

const COOKIE_AGE=31536000

const checkAuth=()=>{
    return !(cookies.get('token')===undefined || cookies.get('token')===null)
}

const logout=()=>{
    cookies.remove('token',{ path: '/' })
}

function SignIn(){
    const history=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignIn = async () => {
        try {
            setLoading(true)
            var res=await axios.post('http://localhost:5000/api/signin', {email,password});
            console.log(res.data)
            setLoading(false)
            if(res.data.success){
                cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE }) //setting token
                history('/location')
            }else{
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
    return(
        <Container component="main" maxWidth="xl" sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#bdcdf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box
                    sx={{
                        borderColor : "#ffffff",
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                <Typography component="h1" variant="h5" sx={{ color: '#000099' }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1, borderColor: '#ffffff', border : "none"}}>
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
                            InputProps={{
                                style: {
                                    color: '#ffffff', // Replace with your desired text color
                                    borderColor: '#ffffff', // Replace with your desired border color
                                },
                            }}
                            sx={{
                                backgroundColor: '#eeb4b4', // Replace with your desired background color
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'white', // Label text color
                                },
                            }}
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
                            InputProps={{
                                style: {
                                    color: '#ffffff', // Replace with your desired text color
                                    borderColor: '#ffffff', // Replace with your desired border color
                                },
                            }}
                            sx={{
                                backgroundColor: '#eeb4b4', // Replace with your desired background color
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'white', // Label text color
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent = "center">
                            <Grid item>
                            <Link href="#" variant="body2" sx={{ color: '#ffffff'}}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    )
}
export default SignIn
export {checkAuth,logout}