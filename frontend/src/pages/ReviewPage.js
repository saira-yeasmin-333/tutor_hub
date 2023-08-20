import FormControl from '@mui/base/FormControl';
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

const subjects = [
    "Physics",
    "Chemistry",
    "Math",
    "Biology",
    "ICT",
    "English",
    "Bangla"
];


const ReviewPage = () => {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = React.useState("");
    const [teacher, setTeacher] = React.useState("");

    const changeSubject = (event) => {
        setSubject(event.target.value);
    };

    const changeTeacher = (event) => {
        setTeacher(event.target.value);
    };


    useEffect(() => {
        // Make the HTTP GET request to the backend API
        axios
            .get(`http://localhost:5000/api/teachers`)
            .then((response) => {
                console.log('review response; ', response)
                setTeachers(response.data.data); // Set the fetched data to the state
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
        console.log(teachers)
    }, []); // Add "id" as a dependency


    return (
        <div>
            <Container component="main" maxWidth="xl" sx={{ width: "100%", backgroundColor: "#c6d9ec", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container component="main" maxWidth="md" sx={{ width: "100%", backgroundColor: "#c6d9ec", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{ padding: 5 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#0067AB" }}>
                        Create a Review
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            name="teacher"
                            select
                            SelectProps={{
                                native: true,
                            }}
                            value={teacher}
                            onChange={changeTeacher}
                            sx={{
                                backgroundColor: '#eeb4b4', // Replace with your desired background color
                            }}
                        >
                                <option value="">Choose  A Teacher</option>
                            {teachers.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </TextField>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    fontWeight: 700,
                                    color: "#000080"
                                }}
                            >
                                Grade Submit
                            </InputLabel>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                size="small"
                                name="subject"
                                select
                                SelectProps={{
                                    native: true,
                                }}
                                value={subject}
                                onChange={changeSubject}
                                sx={{
                                    backgroundColor: '#eeb4b4', // Replace with your desired background color
                                }}
                            >
                                <option value="">Choose Subject</option>
                                {subjects.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="normal"
                                required
                                id="grade_expected"
                                name="grade_expected"
                                label="Grade Expected"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                                sx={{
                                    backgroundColor: '#eeb4b4', // Replace with your desired background color
                                }}>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="normal"
                                required
                                id="grade_received"
                                name="grade_received"
                                label="Grade Received"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                                sx={{
                                    backgroundColor: '#eeb4b4',
                                }}>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    fontWeight: 700,
                                    color: "#000080"
                                }}
                            >
                                Comment here...
                            </InputLabel>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField sx={{
                                backgroundColor: '#eeb4b4',
                            }}
                                id="outlined-multiline-static"
                                label="Comment"
                                multiline
                                fullWidth
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div style={{ width: "50%" }}>
                                <Typography sx={{color: "#000080" }}>Give A Rating</Typography>
                                <Rating name="half" defaultValue={2}
                                    precision={0.25} size="large" />
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" sx={{ justifyContent: "center" }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                </Container>
            </Container>
                
        </div>
    );
};

export default ReviewPage