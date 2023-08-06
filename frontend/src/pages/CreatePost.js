import React from 'react';
import { useParams } from 'react-router-dom';

const CreatePost = () => {
  const { id } = useParams();

  // Now you have access to the ID from the URL in the "id" variable
  console.log('User ID:', id);

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default CreatePost;
