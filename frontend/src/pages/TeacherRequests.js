import React, { useState, useEffect, useRef } from 'react';
import { Drawer, CssBaseline , styled, Button, Grid, Tabs, Tab} from '@mui/material';
import CheckboxMenu from '../components/common/checkbox'
import { setLoading, showError } from '../App';
import axios from 'axios';
import CardComponent from '../components/common/card/CardComponent';
import { calculateDistance } from '../components/common/distance'
import { getAllPosts } from '../actions/post';
import { getAllRequest } from '../actions/request';
import RequestCardComponent from '../components/common/request/RequestCardComponent';

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


const TeacherRequests = () => {

  const [requests,setRequests]=useState(null)
  const [all_requests,setAllRequests]=useState(null)
  const options = ['Location', 'budget'];
  const options2 = ['Physical', 'Online'];
  const [value, setValue] = useState(0);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);

  const selectedRef=useRef(false)
  const [open, setOpen] = useState(true);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const applyFilter = () => {
    console.log('apply')
  }

  const resetFilter = () => {
    setSelectedItems([])
    setSelectedItems2([])
    selectedRef.current=false
    setRequests(all_requests)
  };

  const fetchAllRequests=async()=>{
    setLoading(true)
    var reqResult=await getAllRequest()
    console.log('req result :',reqResult)
    setLoading(false)
    if(reqResult.success){
      setRequests(reqResult.data)
      setAllRequests(reqResult.data)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect( () =>{
    fetchAllRequests()
  }, [])

  


  return (

    <div>
    {!requests? (
      <div>Loading...</div>
     
    ) : (
      <div style={{ display: 'flex' }}>
      <CssBaseline />
      <ParentContainer>
      <MyDrawer variant="permanent" anchor="left">
        <div style={{ marginTop:'64px' }} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}/> {/* Adjust margin based on your content */} 
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
        <p>Filter</p>
        <CheckboxMenu options={options} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
        <p>Platform</p>
        <CheckboxMenu options={options2} selectedItems={selectedItems2} setSelectedItems={setSelectedItems2} />
        <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={applyFilter}>Apply</Button>
        <Button onClick={resetFilter}>Reset</Button>
        </div>
      </MyDrawer>

      
      <Content >

      
 
      <div style={{ marginTop: 64 }}> {/* Adjust margin based on your content */}
            

        {value === 0 && (
            <div>
              <Grid container spacing={1}>
                  {requests.map((r) => (
                    <Grid item xs={10}>
                        <RequestCardComponent key={r.id} data={r} filtered={selectedRef.current} isTutor={false}/>
                    </Grid>
                   ))}
               </Grid>
            </div>
        )}

        {value === 1 && (
            <div>
              hi this is tab 2
            </div>
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
