import { Card, CardContent, Grid, TextField, Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import PrimarySearchAppBar from "../components/Appbar/appbar";
import { getRole } from "../actions/auth";
import Cookies from 'universal-cookie';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Badge from '@mui/material/Badge';
import SendIcon from '@mui/icons-material/Send';

const cookies = new Cookies();


const TrialChat = () => {

    const [students, setStudents] = useState([]);
    const [subject, setSubject] = React.useState("");
    const [student, setStudent] = React.useState("");
    const [user, setUser] = useState(null);

    const changeSubject = (event) => {
        setSubject(event.target.value);
    };

    const [range, setRange] = useState([20, 80]);

    const handleRangeChange = (event, newValue) => {
        setRange(newValue);
    };

    const changeStudent = (event) => {
        setStudent(event.target.value);
    };

    const handleNotificationClick = (event) => {
        console.log('icon is clicked')
      };

    useEffect(() => {

    }, []);

    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div >
            {/* <PrimarySearchAppBar type={user.role} /> */}

            <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "5%" }}>
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
                <Slider
                    value={range}
                    onChange={handleRangeChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    valueLabelFormat={(value) => `${value}%`}
                    aria-labelledby="range-slider"
                />
                <p>Range: {range[0]}% - {range[1]}%</p>

                <IconButton
                    onClick={changeStudent}
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    sx={{
                        '&:hover': {
                            backgroundColor: '#CC9999', // Darker shade of #EEB4B4
                        },
                    }}
                >
                    <Badge badgeContent={students.length} color="error">
                        <SendIcon style={{ color: 'black' }} />
                    </Badge>
                </IconButton>

            </div>

        </div>
    );
}

export default TrialChat;
