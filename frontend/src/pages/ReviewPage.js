import Button from '@mui/material/Button';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import PrimarySearchAppBar from '../components/Appbar/appbar';
import { Typography, FormControl, Select, MenuItem, InputLabel, Rating } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

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
    
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
  
    const handleTeacherChange = (event) => {
      setSelectedTeacher(event.target.value);
    };
  
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
      };
    
      const handleReviewChange = (content, editor) => {
        setReview(content);
        };

        const handleSubmitReview = () => {
        console.log('Teacher:', selectedTeacher);
        console.log('Rating:', rating);
        console.log('Review:', review);
        // You can perform further actions here, like sending data to a server.
        };


    useEffect(() => {
        // Make the HTTP GET request to the backend API
        SettingRoleinGrade();
        // axios
        //     .get(`http://localhost:5000/api/teachers`)
        //     .then((response) => {
        //         console.log('review response; ', response)
        //         setTeachers(response.data.data); // Set the fetched data to the state
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching user profile:', error);
        //     });
        // console.log(teachers)
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
            value={selectedTeacher}
            onChange={handleTeacherChange}
            >
            <MenuItem value="teacher1">Teacher 1</MenuItem>
            <MenuItem value="teacher2">Teacher 2</MenuItem>
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