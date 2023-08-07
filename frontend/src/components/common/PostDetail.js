import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { setLoading, showError, showToast } from "../../App";
import axios from 'axios';
const PostDetail = ({ post }) => {
  
  const [stu,setStu]=useState([])
  const [timestamp, setTimestamp] = useState(post.timestamp);

  const fetchStudent=async()=>{
    setLoading(true)
    var url=`http://localhost:5000/api/account/${post.student_id}`
    var res= await axios.get(url)
    if(res.data.success){
        setStu(res.data.data)
        setLoading(false)
    }else{
      setLoading(false)
      showError('failed to fetch data')
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchStudent()
    setLoading(false)
  },[post.student_id])
  
  const convertTimestampToDateTime = () => {
    if (timestamp) {
      // Convert timestamp to Date object
      const date = new Date(timestamp * 1000); // Multiply by 1000 for milliseconds

      // Format the date and time as strings
      const formattedDateTime = date.toLocaleString(); // Change this format as needed

      return formattedDateTime;
    } else {
      return 'Loading...';
    }
  };

  return (
    
    stu?(
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="body1">location in latitude ={post.latitude}</Typography>
          <Typography variant="body1">location in longitude ={post.longitude}</Typography>
          <Typography variant="body1">class: {post.class}</Typography>
          <Typography variant="body1">Name :{stu.name}</Typography>
          <Typography variant="body1">Budget {post.budget}</Typography>
          <Typography variant="body1">Date :{convertTimestampToDateTime()}</Typography>
        </Paper>
      </Grid>
    </Grid>
    ):(
      <div>

      </div>
    )
  );
};

export default PostDetail;
