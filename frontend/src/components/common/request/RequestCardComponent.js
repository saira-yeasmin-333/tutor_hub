import { Avatar } from '@mui/material';

import './request.css';
import { approveRequest } from '../../../actions/request';
import { sendNotification } from '../../../actions/notification';
import { showSuccess } from '../../../App';
import { getRole } from '../../../actions/auth';
import { getFirestore,collection,addDoc, FieldValue, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from 'react';


const RequestCardComponent = ({data,filtered,isTutor,profile,deleteMe}) => {

  const db=getFirestore()

  const [myProfile,setMyProfile]=useState(profile)

  useEffect(()=>{
    setMyProfile(profile)
  },[profile])

  const addInboxes=async ()=>{
    Promise.all([addDoc(collection(db, "inbox"), {
      uid: myProfile.account_id,
      name:data.name,
      image:data.image,
      unread:1,
      link:[],
      updatedAt:parseInt(Date.now()/1000),
      lastMsg:'Say Hi to your new connection'
    }),
    addDoc(collection(db, "inbox"), {
      uid: data.account_id,
      name:myProfile.name,
      image:myProfile.image,
      unread:1,
      link:[],
      updatedAt:parseInt(Date.now()/1000),
      lastMsg:'Say Hi to your new connection'
    })]).then(r=>{
      Promise.all(r.map(d=>{
        var arr=[]
        r.map(a=>{if(a.id!==d.id)arr.push(a.id)})
        return updateDoc( doc(db, "inbox", d.id),{
         link:arr
        })
      }))
    });
  }

  const approve=async()=>{
    addInboxes()
    var approveResult=await approveRequest({"status":"approved"});
    if(approveResult.success){
      var name=await getRole()
      var messgae=`${name.name} approved your friend request`
      sendNotification(data.account_id,messgae)
      showSuccess('Request approved successfully')
      deleteMe(data.id)
    }
    console.log('approved: ',approveResult)
  }

  const reject=async()=>{
    var approveResult=await approveRequest({"status":"rejected"});
    deleteMe(data.id)
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
