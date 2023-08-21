import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import PrimarySearchAppBar from '../components/Appbar/appbar';
import { Typography, FormControl, Select, MenuItem, InputLabel, Rating, Avatar } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { getTeachersWithName } from '../actions/auth';
import { showSuccess } from '../App';

const cookies = new Cookies();




const ReviewPage = () => {
    
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
    
    const [selectedTeacher, setSelectedTeacher] = useState([]);
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
    const [finalTeacher,setFinalTeacher] = useState('');

    const handleSubmitReview = () => {
        // Create an object with the review data
        const reviewData = {
            teacher_id: finalTeacher, // Use the selected teacher ID from the state
            rating: rating,
            review_text: review
        };
        console.log('Teacher:', finalTeacher);
        console.log('Rating:', rating);
        console.log('Review:', review);
        //Make an API call to send the review data to the server
        axios.post('http://localhost:5000/api/review', reviewData, {
            headers: { authorization: 'Bearer ' + cookies.get('token') }
        })
        .then(response => {
            // Handle the response from the server
            console.log('Review submitted successfully:', response.data);
            showSuccess('Review created successfully')
            // You can also show a success message to the user if needed
        })
        .catch(error => {
            console.error('Error submitting review:', error);
            // Handle the error and display an error message to the user
        });
    };
    
  
    const handleTeacherChange = (event) => {
        setFinalTeacher(event.target.value);
    };
  
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
      };
    
      const handleReviewChange = (content, editor) => {
        setReview(content);
        };

        // const handleSubmitReview = () => {
        // console.log('Teacher:', selectedTeacher);
        // console.log('Rating:', rating);
        // console.log('Review:', review);
        // // You can perform further actions here, like sending data to a server.
        // };

    const fetchTutors=async ()=>{
        var teachers=await getTeachersWithName()
        console.log('teachers : ',teachers.data)
        var teacherNames = teachers.data.map(request => request.account);
        console.log('teacher name: ',teacherNames)
        setSelectedTeacher(teachers.data)
    }


    useEffect(() => {
        // Make the HTTP GET request to the backend API
        SettingRoleinGrade();
        fetchTutors()
    }, []); // Add "id" as a dependency

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <PrimarySearchAppBar type={user.role}/>
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
            Teacher Review Page
        </Typography>
        <FormControl fullWidth margin="normal">
            <InputLabel id="teacher-label">Select a teacher:</InputLabel>
            <Select
            labelId="teacher-label"
            id="teacher"
            value={finalTeacher}
            onChange={handleTeacherChange}
            >
            {selectedTeacher.map((teacherN,index) => (
                <MenuItem key={index} value={teacherN.teacher_id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {teacherN.account.image ? (
                    <Avatar alt="User" src={teacherN.account.image} />
                  ) : (
                    <Avatar alt="User" src={'/cap.png'} />
                  )}
                  <span style={{ marginLeft: '10px' }}>{teacherN.account.name}</span>
                </div>
                </MenuItem>
            ))}
            {/* Add more teacher options here */}
            </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
            <InputLabel id="rating-label">Rating:</InputLabel>
            <Rating
            labelId="rating-label"
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            />
        </FormControl>
        <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="review">Write a review:</InputLabel>
            <Editor
            apiKey="lfaaxmlev7glbfcwexiq8mu7mus3mspo4jjgg7vh4mxmythp"
            initialValue=""
            value={review}
            onEditorChange={handleReviewChange}
            />
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmitReview}>
            Submit Review
        </Button>
        </div>
  
        </div>
    );
};

export default ReviewPage