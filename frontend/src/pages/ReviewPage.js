import FormControl from '@mui/base/FormControl';
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
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
                console.log('review response; ',response)
                setTeachers(response.data.data); // Set the fetched data to the state
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
        console.log(teachers)
    }, []); // Add "id" as a dependency


    return (
        <div>
            <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
                <Box sx={{ padding: 5 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#0067AB", paddingBottom: 5 }}>
                        Create a Review
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    fontWeight: 700
                                }}
                            >
                                Choose Teacher
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Teacher Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={teacher}
                                    label="Teacher"
                                    onChange={changeTeacher}
                                >
                                    {teachers.map((item) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    fontWeight: 700
                                }}
                            >
                                Grade Submit
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Choose Subject</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subject}
                                    label="Subject"
                                    onChange={changeSubject}
                                >
                                    {subjects.map((item) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="grade_expected"
                                name="grade_expected"
                                label="Grade Expected"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="grade_received"
                                name="grade_received"
                                label="Grade Received"
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    fontWeight: 700
                                }}
                            >
                                Comment here...
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Comment"
                                multiline
                                fullWidth
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} />
                        <Grid item xs={12} sm={12}>
                            <div style={{ width: "50%" }}>
                                <Typography>Give A Rating</Typography>
                                <Rating name="half" defaultValue={2}
                                    precision={0.25} size="large" />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={5} />
                        <Grid item xs={12} sm={5} />
                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" sx={{ justifyContent: "center" }}>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={5} />
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
};

export default ReviewPage