import React, { useState, useEffect, useRef } from 'react';
import Multiselect from 'multiselect-react-dropdown';

import { ref, getDownloadURL, uploadBytes,getStorage } from "firebase/storage";
import { v4 } from "uuid";

import { Drawer, CssBaseline, styled, Button, Grid, Tabs, Tab, List, ListItem, ListItemAvatar, Avatar, ListItemText, Dialog, DialogTitle, DialogActions, DialogContent, Typography, TextField, LinearProgress } from '@mui/material';
import CheckboxMenu from '../components/common/checkbox'
import defaultPic from '../assets/profilePic.jpg'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { setLoading, showError } from '../App';
import axios from 'axios';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { ChatItem } from 'react-chat-elements'
import Cookies from 'universal-cookie';
import { collection,addDoc, doc, query, where, onSnapshot, updateDoc, getFirestore, orderBy } from "firebase/firestore";
import CardComponent from '../components/common/card/CardComponent';
import { calculateDistance } from '../components/common/distance'
import { getAllPosts } from '../actions/post';
import { getAllRequest } from '../actions/request';
import RequestCardComponent from '../components/common/request/RequestCardComponent';
import 'react-chat-elements/dist/main.css'
import ChatComponent from './ChatComponent';
import { toast } from 'react-hot-toast';

const ParentContainer = styled('div')({
  display: 'flex',
});

const MyDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  flexDirection: 'row',
});

const Content = styled('div')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const cookies = new Cookies();

const TeacherRequests = () => {

  const db = getFirestore()
  const storage=getStorage()

  const unsubscribeRef = useRef()

  const [groupImage,setGroupImage]=useState(null)

  const [groupDialog, setGroupDialog] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [groupLoading,setGroupLoading]=useState(false)
  const [requests, setRequests] = useState(null)
  const [all_requests, setAllRequests] = useState(null)
  const options = ['Location', 'budget'];
  const options2 = ['Physical', 'Online'];
  const [value, setValue] = useState(0);

  const [inboxes, setInboxes] = useState(null)

  const [selectedInbox, setSelectedInbox] = useState(null)

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const imageRef = ref(storage, `images / ${ v4() }${ imageUpload?.name }`);

  const selectedRef = useRef(false)
  const [open, setOpen] = useState(true);


  const titleRef=useRef()
  const usersRef=useRef()

  const [myProfile, setMyprofile] = useState(null)


  const inboxRef = useRef(null)

  const [users, setUsers] = useState([])

  const getAllUsers = async (uid) => {
    var res = await axios.get(`http://localhost:5000/api/getAllUsers`)
    var arr = []
    res.data.map(r => {
      if (r.account_id !== uid)
        arr.push({
          id: r.account_id,
          name: r.name
        })
    })
    setUsers(arr)
  }





  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const applyFilter = () => {
    console.log('apply')
  }

  const resetFilter = () => {
    setSelectedItems([])
    setSelectedItems2([])
    selectedRef.current = false
    setRequests(all_requests)
  };

  const fetchAllRequests = async () => {
    setLoading(true)
    var reqResult = await getAllRequest()
    console.log('req result :', reqResult)
    setLoading(false)
    if (reqResult.success) {
      setRequests(reqResult.data)
      setAllRequests(reqResult.data)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };

  const listenToInBoxes = async (uid) => {
    console.log(uid)
    const q = query(collection(db, "inbox"), where("uid", "==", uid), orderBy('updatedAt', 'desc'));
    unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push({ inboxId: doc.id, ...doc.data() });
      });
      setInboxes(cities)

      cities.map(c => {
        if (c.inboxId === inboxRef.current)
          updateDoc(doc(db, "inbox", c.inboxId), {
            unread: 0
          })
      })
    });

  }

  const fetchProfile = async () => {
    var profileRes = await axios
      .get(`http://localhost:5000/api/get-profile`, { headers: { authorization: 'Bearer ' + cookies.get('token') } })
    var profileData = profileRes.data
    getAllUsers(profileData.data.account_id)
    listenToInBoxes(profileData.data.account_id)
    setMyprofile(profileData)
  }

  useEffect(() => {
    fetchAllRequests()
    fetchProfile()
    return () => { unsubscribeRef.current() };
  }, [])


  const createGroupClick = async () => {
    const title=titleRef.current.value.trim()
    const selectedUsers=usersRef.current.getSelectedItems()
    if(selectedUsers.length===0)
      toast.error('No user selected')
    else if(title.length===0)
      toast.error('Enter a title')
    else if(imageUpload===null)
      toast.error('Select group photo')
    else{
      setGroupLoading(true)
      var snapshot=await uploadBytes(imageRef, imageUpload)
      var url=await getDownloadURL(snapshot.ref)


      var r=await Promise.all([
        ...[myProfile.data.account_id,...selectedUsers.map(s=>s.id)].map(i=>{
            return addDoc(collection(db, "inbox"), {
              uid: i,
              name:title,
              image:url,
              unread:1,
              link:[],
              updatedAt:parseInt(Date.now()/1000),
              lastMsg:'You are added to this new group...'
            })
        })
      ])

      await Promise.all(r.map(d=>{
        var arr=[]
        r.map(a=>{if(a.id!==d.id)arr.push(a.id)})
        return updateDoc( doc(db, "inbox", d.id),{
         link:arr
        })
      }))
      toast.success(`Successfully created group ${title}`)
      setGroupLoading(false)
      setGroupDialog(false)
      setImageUpload(null)
    }
    console.log(selectedUsers)
    // setGroupLoading(true)
  }


  return (

    <div>
      <Dialog open={groupDialog}>
        <DialogTitle>
          Create a new group
        </DialogTitle>
        <DialogContent>
          {groupLoading && <LinearProgress/>}
          <div style={{ width: '30vw', height: '40vh' }}>

            <Typography type='h6'>
              Select Users
            </Typography>
            <Multiselect
              options={users} // Options to display in the dropdown
              ref={usersRef}
              displayValue="name" // Property name to display in the dropdown options
            />

            <TextField
              label='Group Name'
              fullWidth
              variant='outlined'
              inputRef={titleRef}
              style={{ marginTop: '10px' }}
            />

            <Typography   type='h6' style={{marginTop:'10px'}}>
              Select group photo
            </Typography>

            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />

          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            disabled={groupLoading}
            onClick={() => { setGroupDialog(false) }}
          >
            Close
          </Button>
          <Button
            disabled={groupLoading}
            color='primary'
            onClick={createGroupClick}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {!requests ? (
        <div>Loading...</div>

      ) : (
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <ParentContainer>
            <MyDrawer variant="permanent" anchor="left">
              <div style={{ marginTop: '64px' }} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }} /> {/* Adjust margin based on your content */}
              <Tabs
                value={value}
                onChange={handleChange}
                orientation="horizontal"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="vertical tabs example"
                className="bg-white rounded-lg shadow"
              >
                <Tab label="Requests" />
                <Tab label="Chats" />
              </Tabs>
              {
                value === 0 && <>
                  <p>Filter</p>
                  <CheckboxMenu options={options} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                  <p>Platform</p>
                  <CheckboxMenu options={options2} selectedItems={selectedItems2} setSelectedItems={setSelectedItems2} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button onClick={applyFilter}>Apply</Button>
                    <Button onClick={resetFilter}>Reset</Button>
                  </div>
                </>
              }
              {
                value === 1 && <List sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}>
                  <ListItem >
                    <Button fullWidth
                      variant='contained'
                      color='primary'
                      startIcon={<GroupAddIcon />}
                      onClick={() => { setGroupDialog(true) }}
                    >
                      Create New Group
                    </Button>
                  </ListItem>
                  {
                    inboxes?.map(i => {
                      return (
                        <ListItem button selected={selectedInbox?.inboxId === i.inboxId} onClick={() => {
                          setSelectedInbox(i);
                          inboxRef.current = i.inboxId
                          updateDoc(doc(db, "inbox", i.inboxId), {
                            unread: 0
                          })
                        }}>
                          {/* <ListItemAvatar>
                            <Avatar  sx={{ bgcolor: deepPurple[500] }} src={i.image}>
                              {i.name.substr(0,1)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={i.name} secondary={new Date(i.updatedAt*1000).toLocaleString()} /> */}
                          <div style={{ width: '100%' }}>
                            <ChatItem
                              avatar={i.image ? i.image : defaultPic}
                              alt={i.name.substr(0, 1)}
                              title={i.name}
                              subtitle={i.lastMsg}
                              date={new Date(i.updatedAt * 1000)}
                              unread={i.unread}
                            />
                          </div>
                        </ListItem>
                      )
                    })
                  }
                </List>
              }
            </MyDrawer>


            <Content >



              <div style={{ marginTop: 64 }}> {/* Adjust margin based on your content */}


                {value === 0 && (
                  <div>
                    <Grid container spacing={1}>
                      {requests?.map((r) => (
                        <Grid item xs={10}>
                          <RequestCardComponent profile={myProfile?.data} key={r.id} data={r} filtered={selectedRef.current} isTutor={false} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                )}

                {value === 1 && selectedInbox !== null && (
                  <ChatComponent key={selectedInbox.inboxId} inb={selectedInbox} profile={myProfile} />
                )}

              </div>

            </Content>
          </ParentContainer>
        </div>
      )}
    </div>

  );
}

export default TeacherRequests;
