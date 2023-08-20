import { Avatar } from '@mui/material';
import '../card/Card.css'; // Create this CSS file for styling
import { sendRequest } from '../../../actions/request';
import { showSuccess } from '../../../App';

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
      console.log('data :',data)
      var sendResult=await sendRequest(sendObject)
      console.log('send result :',sendResult)
      if(sendRequest.success){
        showSuccess('Request sent successfully')
      }
    }catch(e){
      console.log('error: ',e)
    }
  }

  console.log('appeared data: ',data)
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
       
    </div>
  );
};

export default CardComponent;






