import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import PrimarySearchAppBar from '../components/Appbar/appbar';
import { Typography, FormControl, Select, MenuItem, InputLabel, Rating, Avatar, IconButton } from '@mui/material';
import TimestampToDate from '../components/common/timestamptodate';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const cookies = new Cookies();




const GradeSubmit = () => {

    const [user, setUser] = useState(null);

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

    const [selectedStudent, setSelectedStudent] = useState([]);
    const [finalStudent, setFinalStudent] = useState('');
    const [showGradeSheet, setShowGradeSheet] = useState(false);
    const [gradeSheetStudent, setGradeSheetStudent] = useState('')
    const [newGrade, setNewGrade] = useState({
        title: '',
        student_id: 0,
        teacher_id: 0,
        subject_id: 0,
        mark_received: 0,
        total_marks: 0,
        timestamp: 0,
        timestamp_of_exam: '',
        submit_for_review: '',
    });

    const handleNewGradeChange = (field, value) => {
        setNewGrade({
            ...newGrade,
            [field]: value,
        });
        console.log(newGrade)
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/request/getmystudents`, {
                headers: { authorization: 'Bearer ' + cookies.get('token') },
            });
            console.log("Fetching Students:")
            setSelectedStudent(response.data.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching my students:', error);
        }
    }

    const handleStudentChange = (event) => {
        setFinalStudent(event.target.value);
        console.log("Logging over here:")
        console.log(finalStudent)
    };


    const [grades, setGrades] = useState([]);

    const fetchGrades = async () => {
        // Fetch grades from the server and set them in the grades state.
        const data = {
            student_id: parseInt(finalStudent.account_id),
            teacher_id: parseInt(user.account_id)
        }
        console.log("data")
        console.log(data)
        try {
            const response = await axios.post(`http://localhost:5000/api/getgrade`, data);

            setGrades(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    };



    const handleGetGrades = () => {
        fetchGrades();
        setShowGradeSheet(true);
        console.log('showGradeSheet: ', showGradeSheet)
        setGradeSheetStudent(finalStudent)
    };


    useEffect(() => {
        // Make the HTTP GET request to the backend API
        SettingRoleinGrade();
        fetchStudents();

    }, []); // Add "id" as a dependency


    const handleEditGradeClick = (row) => {
        // This function will be called when the Edit button is clicked
        // `row` contains the data of the clicked row, such as grade details
        // Implement your logic for editing the grade here
    };

    const handleDeleteGradeClick = (row) => {
        // This function will be called when the Delete button is clicked
        // `row` contains the data of the clicked row, such as grade details
        // Implement your logic for deleting the grade here
    };

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const parseDateToTimestamp = (dateString) => {
        // Split the date string into components
        const dateComponents = dateString.split('/');

        // Ensure there are three components (year, month, and day)
        if (dateComponents.length !== 3) {
            return null; // Invalid date format
        }

        // Extract year, month, and day
        const [year, month, day] = dateComponents.map(Number);

        // Check if year, month, and day are valid
        if (
            isNaN(year) || isNaN(month) || isNaN(day) ||
            year < 0 || month < 1 || month > 12 || day < 1 || day > 31
        ) {
            return null; // Invalid date values
        }

        // Check for February and validate day for leap years
        if (month === 2) {
            if (day > 29 || (day === 29 && !isLeapYear(year))) {
                return null; // Invalid day for February
            }
        }

        // Check for months with 30 days
        if ([4, 6, 9, 11].includes(month) && day > 30) {
            return null; // Invalid day for a 30-day month
        }

        // Create a JavaScript Date object (months are 0-based, so subtract 1 from the month)
        const date = new Date(year, month - 1, day);

        // Check if the Date object represents a valid date
        if (isNaN(date.getTime())) {
            return null; // Invalid date (e.g., February 30)
        }

        // Return the timestamp (milliseconds since January 1, 1970)
        return date.getTime();
    };

    const handleAddNewGrade = () => {
        if (newGrade.title === '' || newGrade.subject_id === 0 || newGrade.mark_received === 0 || newGrade.total_marks === 0 || newGrade.timestamp_of_exam === '') {
            toast.error('Invalid Input', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        if (parseDateToTimestamp(newGrade.timestamp_of_exam)===null){
            console.log("entered here")
            toast.error('Invalid Date', {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        var temp = {
            title: newGrade.title,
            student_id: gradeSheetStudent.account_id,
            teacher_id:  user.account_id,
            mark_received: newGrade.mark_received,
        }
        console.log("newGrade",temp);

    };


    if (!user) {
        return <div>Loading...</div>;
    }


    //
    return (
        <div>
            <PrimarySearchAppBar type={user.role} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                    <Typography variant="h4" gutterBottom>
                        Student Grade Page
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <FormControl fullWidth margin="normal" style={{ flex: 1, marginRight: '10px' }}>
                        <InputLabel id="teacher-label">Select a student:</InputLabel>
                        <Select
                            labelId="student-label"
                            id="student"
                            value={finalStudent}
                            onChange={handleStudentChange}
                        >
                            {selectedStudent.length > 0 ? (
                                selectedStudent.map((studentN, index) => (
                                    <MenuItem key={index} value={studentN}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {studentN.image ? (
                                                <Avatar alt="User" src={studentN.image} />
                                            ) : (
                                                <Avatar alt="User" src={'/cap.png'} />
                                            )}
                                            <span style={{ marginLeft: '10px' }}>{studentN.name}</span>
                                        </div>
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value="">
                                    <em>No students available</em>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={handleGetGrades}>
                        Submit
                    </Button>
                </div>
                {showGradeSheet /* Add your GradeSheet component here */ && (
                    <div>
                        Gradesheet of {gradeSheetStudent.name}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">Subject</TableCell>
                                        <TableCell align="right">Marks Received</TableCell>
                                        <TableCell align="right">Total Marks</TableCell>
                                        <TableCell align="right">Date of Exam</TableCell>
                                        <TableCell align="right">Review Status</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {grades.map((row) => (
                                        <TableRow
                                            key={row.grade_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell align="right">{row.subject.sub_name}</TableCell>
                                            <TableCell align="right">{row.mark_received}</TableCell>
                                            <TableCell align="right">{row.total_marks}</TableCell>
                                            <TableCell align="right"><TimestampToDate timestamp={row.timestamp_of_exam} /></TableCell>
                                            <TableCell align="right">{row.submit_for_review}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditGradeClick(row)} aria-label="Edit Profile">
                                                    <EditIcon /> {/* Use the appropriate icon component */}
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteGradeClick(row)} aria-label="Edit Profile">
                                                    <DeleteIcon /> {/* Use the appropriate icon component */}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                label="Title"
                                                variant="outlined"
                                                value={newGrade.title}
                                                onChange={(e) => handleNewGradeChange('title', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel id="subject-label">Subject</InputLabel>
                                                <Select
                                                    labelId="subject-label"
                                                    id="subject"
                                                    label="Subject"
                                                    value={newGrade.subject}
                                                    onChange={(e) => handleNewGradeChange('subject_id', e.target.value)}
                                                >
                                                    {user.subjects.map((sub) => (
                                                        <MenuItem key={sub.id} value={sub.id}>
                                                            {sub.sub_name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                label="Marks Received"
                                                variant="outlined"
                                                value={newGrade.mark_received}
                                                onChange={(e) => handleNewGradeChange('mark_received', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                label="Total Marks"
                                                variant="outlined"
                                                value={newGrade.total_marks}
                                                onChange={(e) => handleNewGradeChange('total_marks', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                label="Exam date (yy/mm/dd)"
                                                variant="outlined"
                                                value={newGrade.timestamp_of_exam}
                                                onChange={(e) => handleNewGradeChange('timestamp_of_exam', e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">none</TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" color="primary" onClick={handleAddNewGrade}>
                                                Add Grade
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <ToastContainer />
                    </div>

                )}
            </div>
        </div>

    );
};

export default GradeSubmit