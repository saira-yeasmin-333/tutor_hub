import { Avatar, Button,Typography } from '@mui/material';
import '../card/Card.css'; // Create this CSS file for styling
import ApprovalIcon from '@mui/icons-material/Approval';
import { sendRequest } from '../../../actions/request';
import { showSuccess } from '../../../App';
import { getRole } from '../../../actions/auth';
import { sendNotification } from '../../../actions/notification';
import defaultImage from '../../../assets/PICT0018.JPG'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const CardComponent = ({ data , filtered,isTutor}) => {

  const handleApply=async()=>{
    var to=0
    if(isTutor)to=data.account_id
    else to=data.student_id
    try{
      const sendObject={
        to:to,
        status:"pending"
      }
      var sendResult=await sendRequest(sendObject)
      console.log('send result :',sendResult)
      if(sendResult.success){
        var name=await getRole()
        var messgae=`${name.name} sent friend request to ${data.account.name}`
        sendNotification(to,messgae)
        showSuccess('Request sent successfully')
      }
    }catch(e){
      console.log('error: ',e)
    }
  }
  const convertTimestampToDateTime = () => {
    if (data.timestamp) {
      // Convert timestamp to Date object
      const date = new Date(data.timestamp * 1000); // Multiply by 1000 for milliseconds

      // Format the date and time as strings
      const formattedDateTime = date.toLocaleString(); // Change this format as needed

      return formattedDateTime;
    } else {
      return 'Loading...';
    }
  };

  return(
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Image"
        height="140"
        image={data.account.image?data.account.image:defaultImage}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.account.name}
        </Typography>
        {
          isTutor?(
            <>
              <Typography variant="body2" color="text.secondary">
                  <b>Preferref Locations:</b>
                    {data.preferred_locations.map((l,i)=>{
                        return <span>{l.address}{i<data.preferred_locations.length-1?',':''}</span>
                    })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  <b>Sub:</b>
                    {data.subjects.map((sub,i)=>{
                        return <span>{sub.sub_name}{i<data.subjects.length-1?',':''}</span>
                    })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                 {data.onlineMedia && 
                  (<p>platform :online</p>)}
                   {data.physicalMedia && (
                    <p>platform:physical</p>
                  )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Budget:</b> {data.budget}K
              </Typography>
            </>
            
          ):(
            <>
              <Typography variant="body2" color="text.secondary">
                  <b>Class:</b> {data.class}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  <b>Address:</b> {data.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  <b>Sub :</b>
                  {data.subjects.map((sub,i)=>{
                      return <span>{sub.sub_name}{i<data.subjects.length-1?',':''}</span>
                  })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  <b>Platform:</b> {data.platform}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  <b>Date:</b> {convertTimestampToDateTime()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  <b>Budget:</b> {data.budget}
              </Typography>
            </>
          )
        }

        {filtered && !isTutor &&(
          <div style={{padding:'2%',margin:'10%'}}>
            <p>Distance between {data.my_address} and {data.post_address} is {data.distance.toFixed(3)} km</p>
          </div>
        )}

        {filtered && isTutor &&(
          <center >
            <p>Min distance  is {data.distance.toFixed(3)} km</p>
          </center>
        )}
      </CardContent>
      <CardActions>
        <Button variant='contained' startIcon={<ApprovalIcon/>} size="small" onClick={handleApply}>Apply</Button>
      </CardActions>
    </Card>
  )



  return (
    <div className="card" >
      <div style={{display:'flex',justifyContent:'space-between'}}>
        {
          data.account.image?(
            <Avatar
              alt="Homer Sharp"
              src={data.account.image}
              sx={{ width: 80, height: 80 }}
              style={{margin:"5%"}}
            />
          ):(
            <Avatar
              alt="Homer Sharp"
              src={'/PICT0018'}
              sx={{ width: 80, height: 80 }}
              style={{margin:"5%"}}
            />
          )
        }
        <button className="card-button" onClick={handleApply}>Apply</button>
      </div>
      <div>
        <center style={{color:'#000000',marginBottom:'15%',marginTop:'-1%'}}>
          {
            isTutor?(

              <div>
                  
                  <div>Name :{data.account.name}</div>
                  <div>
                    Preferref Locations :
                    {data.preferred_locations.map((l,i)=>{
                        return <span>{l.address}{i<data.preferred_locations.length-1?',':''}</span>
                    })}
                  </div>
                  <div>
                    Sub :
                    {data.subjects.map((sub,i)=>{
                        return <span>{sub.sub_name}{i<data.subjects.length-1?',':''}</span>
                    })}
                  </div>
                  <div>Platform: {data.platform}</div>
                  <div>Budget: {data.budget}K</div>
              </div>
            ):(
              <div>
                <div>Name :{data.account.name}</div>
                <div>class: {data.class}</div>
                <div>address: {data.address}</div>
                <div>
                  Sub :
                  {data.subjects.map((sub,i)=>{
                      return <span>{sub.sub_name}{i<data.subjects.length-1?',':''}</span>
                  })}
                </div>
                <div>Platform: {data.platform}</div>
                <div>Date :{convertTimestampToDateTime()}</div>
                <div>Budget: {data.budget}K</div>
              </div>
            )
          }
        </center>
        
      </div>
       
        
       
    </div>
  );
};

export default CardComponent;






