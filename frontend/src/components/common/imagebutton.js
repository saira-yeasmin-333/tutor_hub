import React from 'react';
import { Button, styled } from '@mui/material';
import {calculateDistance} from './distance'

const StyledImageButton = styled(Button)({
  width: '100px', // Set the desired button width
  height: '100px', // Set the desired button height
  padding: 0, // Remove default button padding
  background: 'url("https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg") center/cover', // Set image as background
});

const ImageButton = ({ favLocations, posts, setFilteredPosts, filteredPosts }) => {
  const handleClick = () => {
    const filteredPosts2 = [];
    favLocations.forEach(favLocation => {
      posts.forEach(post => {
        const distance = calculateDistance(
          favLocation.latitude,
          favLocation.longitude,
          post.latitude,
          post.longitude
        );
        console.log(distance,favLocation.radius)
        const mylatlang={
          'lat':favLocation.latitude,
          'lng':favLocation.longitude
        }

        const stulatlang={
          'lat':post.latitude,
          'lng':post.longitude
        }
        // Replace 2 with your desired distance limit
        if (distance <= favLocation.radius) {
          console.log(distance)
          // const dist={
          //   'my_location':mylatlang,
          //   'stu_location':stulatlang,
          //   'distance':distance,
          //   'radius':favLocation.radius
          // }
          const combinedPost = {
            ...post,
            distance: distance,
            "favLocationLatitude": favLocation.latitude,
            "favLocationLongitude": favLocation.longitude,
            "favLocationRadius": favLocation.radius
          };
          filteredPosts2.push(combinedPost);
          
        }
      });
    });

    setFilteredPosts(filteredPosts2);
  };

  return (
    <StyledImageButton variant="contained" color="primary" onClick={handleClick}>
      {/* No content inside the button */}
    </StyledImageButton>
  );
};

export default ImageButton;
