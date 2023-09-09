import React, { useEffect, useRef, useState } from "react";
import { deepOrange, deepPurple } from '@mui/material/colors';
import defaultPic from '../assets/profilePic.jpg'

import { MessageBox } from 'react-chat-elements'
import { LinearProgress, TextField } from "@mui/material";
import { collection, doc,query, where, onSnapshot,updateDoc, getFirestore, orderBy, increment, addDoc } from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import { toast } from "react-hot-toast";

const ChatComponent=({profile,inb})=>{

    const db=getFirestore()

    const [messages,setMessages]=useState(null)

    const [inbox,setInbox]=useState(inb)
    const [myProfile,setMyProfile]=useState(profile)

    const unsubscribeRef=useRef()


    const msgRef=useRef()

   

    const listenToMessages=async ()=>{

        const q = query(collection(db, "message"), where("iId", "==", inbox.inboxId),orderBy('timestamp'));
        unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
          const cities = [];
          querySnapshot.forEach((doc) => {
              cities.push({msgId:doc.id,...doc.data()});
          });
          console.log(cities)
          setMessages(cities)
        });
        
      }

    useEffect(()=>{
        if(inb!==null){
            setInbox(inb)
            listenToMessages()
            return () => { unsubscribeRef.current() };
        }
       
    },[inb])

    useEffect(()=>{
        setMyProfile(profile)
    },[profile])

    const sendClick=async ()=>{
        var msg=msgRef.current.value
        if(msg.length===0)
            toast.error('Message cannot be empty...')
        else{
            Promise.all([
                ...[inbox.inboxId,...inbox.link].map(i=>{
                    //send message
                    return addDoc(collection(db, "message"), {
                        iId: i,
                        uid:myProfile.data.account_id,
                        name:myProfile.data.name,
                        image:myProfile.data.image,
                        timestamp:parseInt(Date.now()/1000),
                        msg
                      })
                }),
                ...[inbox.inboxId,...inbox.link].map(i=>{
                    //update inboxes
                    return updateDoc( doc(db, "inbox", i),{
                        unread:increment(1),
                        updatedAt:parseInt(Date.now()/1000),
                        lastMsg:msg
                    })
                })
            ])
        }
    }

    return(
        <div>
            {messages===null && <LinearProgress/>}
            <div style={{position:'absolute',bottom:'80px',left:'320px',width:'calc(100vw - 320px)',padding:'20px',overflowY:'scroll'}}>
                {
                    messages&&messages.map(m=>{
                        return (
                            <MessageBox
                                title={m.name}
                                date={new Date(m.timestamp*1000)}
                                avatar={m.image?m.image:defaultPic}
                                id={m.msgId}
                                position={m.uid===myProfile.data.account_id?'right':'left'}
                                type={'text'}
                                text={m.msg}
                                />
                        )
                    })
                }
            </div>
            <div style={{position:'absolute',bottom:'0',left:'320px',width:'calc(100vw - 320px)',padding:'20px'}}>
                <TextField
                    inputRef={msgRef}
                    style={{width:'calc(100vw - 400px)'}}
                    variant='outlined'
                    label='Type your message here...'
                    />
                <SendIcon onClick={sendClick} color='primary' style={{transform:'translateY(15px)',marginLeft:'10px',cursor:'pointer'}}/>
            </div>
        </div>
    )
}

export default ChatComponent