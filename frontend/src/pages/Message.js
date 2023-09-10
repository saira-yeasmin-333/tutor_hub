import React, { useEffect, useState } from 'react'
import defaultImage from '../assets/PICT0018.JPG'
import SendIcon from '@mui/icons-material/Send';
import PrimarySearchAppBar from '../components/Appbar/appbar';
import Cookies from 'universal-cookie';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { setLoading } from '../App';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, Grid, LinearProgress, Paper, TextField, Zoom } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const cookies = new Cookies();

const Message=props=>{
    const [user, setUser] = useState(null);
    const [friends,setFriends]=useState(null)
    const [filteredFriends,setFilteredFriends]=useState(null)

    const [searchString,setSearchString]=useState("")
    const [message,setMessage]=useState("")

    const searchFields=[
        `name`,
        `phone`,
        `email`
    ]

    useEffect(()=>{
        if(friends){
            var arr=[]
            friends.map(f=>{
                var isMatched=false
                searchFields.map(s=>{
                    if(f[s] && f[s].toLowerCase().trim().indexOf(searchString.toLowerCase().trim())>=0)
                        isMatched=true
                })
                if(isMatched)arr.push(f)
            })
            setFilteredFriends(arr)
        }
    },[searchString])

    const fetchProfile=async ()=>{
        setLoading(true)
        var response=await axios
        .get(`http://localhost:5000/api/get-profile`,{headers:{authorization:'Bearer '+cookies.get('token')}})
        setUser(response.data.data)
        setLoading(false)
    }

    const fetchFriends=async ()=>{
        var response=await axios
        .get(`http://localhost:5000/api/request/approvedList`,{headers:{authorization:'Bearer '+cookies.get('token')}})
        setFriends(response.data.data)
        setFilteredFriends(response.data.data)
    }

    useEffect(()=>{
        fetchProfile()
        fetchFriends()
    },[])

    if (!user) {
        return <LinearProgress/>; // Display a loading message while fetching data
    }

    return(
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <PrimarySearchAppBar type={user.type} />
            <Grid container spacing={1} padding={1}>
                <Grid item xs={2.5}/>
                <Grid item xs={7}>
                    {filteredFriends===null&&<LinearProgress/>}
                    {
                        filteredFriends&& <Paper style={{padding:'20px'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper style={{width:'100%'}}>
                                        <TextField
                                            variant='outlined'
                                            label='Type Your Message'
                                            value={message}
                                            fullWidth
                                            multiline
                                            rows={6}
                                            onChange={e=>{setMessage(e.target.value)}}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper style={{width:'100%'}}>
                                        <TextField
                                            variant='outlined'
                                            label='Search Your Friend'
                                            value={searchString}
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><ZoomInIcon/></InputAdornment>,
                                            }}
                                            onChange={e=>{setSearchString(e.target.value)}}
                                        />
                                    </Paper>
                                </Grid>
                                {
                                    filteredFriends.map(f=>{
                                        return <SingleFriend message={message} f={f} key={f.account_id}/>
                                    })
                                }
                            </Grid>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={2.5}/>
            </Grid>
        </div>
    )
}

const SingleFriend=({f,message})=>{

    const [msg,setMsg]=useState(message)
    const [sending,setSending]=useState(false)

    useEffect(()=>{
        setMsg(message)
    },[message])

    const sendClick=async ()=>{
        if(message.trim().length===0)
            toast.error(`Please type your message`)
        else{
            setSending(true)
            try{
                var res=await axios.post('http://localhost:5000/api/sms',{
                    number:f.phone,
                    message:msg
                })
                if(res.data.result==='success')
                    toast.success(`Message sent to ${f.name}`)
                else
                    toast.error(`Couldn't send message to ${f.name}`)
            }catch(err){
                toast.error(`Couldn't send message to ${f.name}`)
            }
            setSending(false)
        }
    }

    return (
        <Grid item xs={12}>
            <Paper style={{padding:'10px'}}>
                <div style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'space-between'
                }}>

                    <div style={{
                        display:'flex',
                        alignItems:'center'
                    }}>
                        <img src={f.image?f.image:defaultImage}
                            style={{
                                height:'50px',
                                width:'50px',
                                borderRadius:'50%'
                            }}
                        />
                        <div style={{marginLeft:'10px'}}>
                            <b>{f.name}</b><br/>
                            {f.phone}
                        </div>
                    </div>

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={sendClick}
                        disabled={sending}
                        startIcon={<SendIcon/>}
                        >
                            Send
                    </Button>

                </div>
            </Paper>
        </Grid>
    )
}

export default Message