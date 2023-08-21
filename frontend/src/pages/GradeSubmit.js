import { Card, CardContent, Grid, TextField, Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import PrimarySearchAppBar from "../components/Appbar/appbar";
import { getRole } from "../actions/auth";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
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
    const [user, setUser] = useState(null);

    const changeSubject = (event) => {
        setSubject(event.target.value);
    };

    const changeStudent = (event) => {
        setStudent(event.target.value);
    };

    const SettingRoleinGrade = async () => {
        axios
            .get(`http://localhost:5000/api/get-profile`, { headers: { authorization: 'Bearer ' + cookies.get('token') } })
            .then((response) => {
                setUser(response.data.data);
                console.log('we get response : ', response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    };

    useEffect(() => {
        SettingRoleinGrade();

        axios
            .get(`http://localhost:5000/api/students`)
            .then((response) => {
                setStudents(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <PrimarySearchAppBar type={user.role} />
            
            <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding:"5%" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#0067AB", marginBottom: 2 }}>
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
                                        backgroundColor: 'white',
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

                            {/* Rest of the form fields */}


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
                                        backgroundColor: 'white', // Replace with your desired background color
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
                                        backgroundColor: 'white', // Replace with your desired background color
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
                                    >
                                </TextField>
                            </Grid>

                            
                            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Button variant="contained" sx={{ width: 150 }}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
            </div>
            
        </div>
    );
}

export default GradeSubmit;
