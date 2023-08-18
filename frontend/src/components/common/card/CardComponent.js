import { Avatar } from '@mui/material';
import '../card/Card.css'; // Create this CSS file for styling
import { useState } from 'react';

const CardComponent = ({ post , filtered}) => {
  const [timestamp, setTimestamp] = useState(post.timestamp);

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
    <div className="card" >
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <Avatar
          alt="Homer Sharp"
          src={post.account.image}
          sx={{ width: 80, height: 80 }}
          style={{margin:"5%"}}
        />
        <button className="card-button">Apply</button>
      </div>
      <div>
        <center style={{color:'#000000',marginBottom:'15%',marginTop:'-1%'}}>
          <div>Name :{post.account.name}</div>
          <div>class: {post.class}</div>
          <div>address: {post.address}</div>
          <div>
            Sub :
            {post.subjects.map((sub,i)=>{
                return <span>{sub.sub_name}{i<post.subjects.length-1?',':''}</span>
            })}
          </div>
          <div>Platform: {post.platform}</div>
          <div>Date :{convertTimestampToDateTime()}</div>
          <div>Budget: {post.budget}K</div>
        </center>
        
      </div>
       
        {filtered &&(
          <div style={{padding:'2%',margin:'10%'}}>
            <p>Distance between {post.my_address} and {post.post_address} is {post.distance.toFixed(3)} km</p>
          </div>
        )}
       
    </div>
  );
};

export default CardComponent;






