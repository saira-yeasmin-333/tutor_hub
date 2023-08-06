import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:5000/api/get-profile/${id}`)
      .then((response) => {
        setUser(response.data.data); // Set the fetched data to the state
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [id]); // Add "id" as a dependency

  if (!user) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div>
      <h1>User Profile</h1>
      <Avatar
        alt="Homer Sharp"
        src="/pp.jpg"
        sx={{ width: 156, height: 156 }}
      />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Account Type: {user.role}</p>
    </div>
  );
};

export default ProfilePage;
