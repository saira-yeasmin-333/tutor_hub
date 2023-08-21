import { Avatar } from '@mui/material';

import './request.css';
import { approveRequest } from '../../../actions/request';
import { sendNotification } from '../../../actions/notification';
import { showSuccess } from '../../../App';
import { getRole } from '../../../actions/auth';

const RequestCardComponent = ({data,filtered,isTutor}) => {

  const approve=async()=>{
    var approveResult=await approveRequest({"status":"approved"});
    if(approveResult.success){
      var name=await getRole()
      var messgae=`${name.name} approved your friend request`
      sendNotification(data.account_id,messgae)
      showSuccess('Request approved successfully')
    }
    console.log('approved: ',approveResult)
  }

  const reject=async()=>{
    var approveResult=await approveRequest({"status":"rejected"});
    console.log('approved: ',approveResult)
  }

  return (
    <div class="card">
      <Avatar
        alt="Homer Sharp"
        src={'/PICT0018.JPG'}
        className="circular-avatar"
        style={{margin:"5%"}}
      />
      <h2 class="name">Name : {data.name}</h2>
      <p class="class">Class : {10}</p>
      <button class="approve-button" onClick={approve}>Approve</button>
      <button class="cancel-button" onClick={reject}>Cancel</button>
    </div>
  );
};

export default RequestCardComponent;
