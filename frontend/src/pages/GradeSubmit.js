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

const GradeSubmit = () => {
    const [students, setStudents] = useState([]);

    const [subject, setSubject] = React.useState("");
    const [student, setStudent] = React.useState("");

    const changeSubject = (event) => {
        setSubject(event.target.value);
    };

    const changeStudent = (event) => {
        setStudent(event.target.value);
    };


    useEffect(() => {
        // Make the HTTP GET request to the backend API
        axios
            .get(`http://localhost:5000/api/students`)
            .then((response) => {
                console.log('review response; ', response)
                setStudents(response.data.data); // Set the fetched data to the state
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
        console.log(students)
    }, []); // Add "id" as a dependency


    return (
        <div>
            <Container component="main" maxWidth="xl" sx={{ width: "100%", backgroundColor: "#c6d9ec", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Container component="main" maxWidth="md" sx={{ width: "100%", backgroundColor: "#c6d9ec", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box sx={{ padding: 5 }}>
                        <Typography variant="h6" gutterBottom sx={{ color: "#0067AB" }}>
                            Submit Grade
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    size="small"
                                    name="student"
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={student}
                                    onChange={changeStudent}
                                    sx={{
                                        backgroundColor: '#eeb4b4', // Replace with your desired background color
                                    }}
                                >
                                    <option value="">Name of the Student</option>
                                    {students.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>


                            <Grid item xs={12} sm={8}>
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

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="received_marks"
                                    name="received_marks"
                                    label="Mark Received"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#eeb4b4', // Replace with your desired background color
                                    }}>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    id="total_marks"
                                    name="total_marks"
                                    label="Total Marks"
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

export default GradeSubmit