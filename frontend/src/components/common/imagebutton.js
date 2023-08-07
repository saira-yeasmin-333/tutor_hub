import React from 'react';
import { Button, styled } from '@mui/material';

const StyledImageButton = styled(Button)({
  width: '100px', // Set the desired button width
  height: '100px', // Set the desired button height
  padding: 0, // Remove default button padding
  background: 'url("https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg") center/cover', // Set image as background
});

function toRad($Value) {
  return $Value * Math.PI / 180;
}

function calculateDistance($lat1, $lon1, $lat2, $lon2){
  var $R = 6371; // km
  var $dLat = toRad($lat2-$lat1);
  var $dLon = toRad($lon2-$lon1);
  var $lat1 = toRad($lat1);
  var $lat2 = toRad($lat2);

  var $a = Math.sin($dLat/2) * Math.sin($dLat/2) +Math.sin($dLon/2) * Math.sin($dLon/2) * Math.cos($lat1) * Math.cos($lat2); 
  var $c = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1-$a)); 
  var $d = $R * $c;
  return $d;
}

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
          filteredPosts2.push({...post,distance});
          
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
