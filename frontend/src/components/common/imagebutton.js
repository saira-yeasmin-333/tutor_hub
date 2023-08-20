
import { Button, styled } from '@mui/material';
import {calculateDistance} from './distance'
import { forwardRef, useImperativeHandle, useRef } from 'react';

const StyledImageButton = styled(Button)({
  width: '100px', // Set the desired button width
  height: '100px', // Set the desired button height
  padding: 0, // Remove default button padding
  background: 'url("https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg") center/cover', // Set image as background
});

const ImageButton=forwardRef(({ favLocations, posts},ref)=>{
  const postRef=useRef(null)
  const selectedRef=useRef(false)
  const distanceRef=useRef(null)

  useImperativeHandle(ref, () => ({

    getPosts(){
        return postRef.current
    },
    getDistance(){
      return distanceRef.current
    },
    isFiltered(){
        return selectedRef.current
    }

  }));

  const handleClick = () => {
    const filteredPosts2 = [];
    const dist=[]
    favLocations.forEach(favLocation => {
      posts.forEach(post => {
        const distance = calculateDistance(
          favLocation.latitude,
          favLocation.longitude,
          post.latitude,
          post.longitude
        );

        // Replace 2 with your desired distance limit
        if (distance <= favLocation.radius) {
          filteredPosts2.push(post);
          const dist_obj={
            "my_address":favLocation.address,
            "post_address":post.address,
            "distance":distance
          }

          dist.push(dist_obj)
        }
      });
    });
    postRef.current=filteredPosts2
    distanceRef.current=dist
  };
  return (
    <StyledImageButton variant="contained" color="primary" >
      {/* No content inside the button */}
    </StyledImageButton>
  );
});

export default ImageButton;
