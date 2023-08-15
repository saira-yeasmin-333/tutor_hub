import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import {calculateDistance} from '../components/common/distance'
import { showError, showSuccess, showToast } from '../App';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MapComponent from '../components/Location/MapComponent';
import { sendNotificationCall } from '../actions/notification';
import { getAllPreferredLocations } from '../actions/location';

const platforms = [
  "offline",
  "online",
  "both"
];

const CreatePost = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const [subject, setSubject] = useState("");
  const [class_, setClass] =useState("");
  const [budget, setBudget] =useState("");
  const [platform, setPlatform] = useState("");

  const mapComponentRef=useRef()
  const [mapDialog,setMapDialog]=useState(false)
  const [mapData,setMapData]=useState(null)
  const [locations,setLocations]=useState(null)

  const changeClass = (event) => {
    setClass(event.target.value);
  };

  const changeSubject = (event) => {
    setSubject(event.target.value);
  };

  const sendNotification=async(t)=>{
    const body={
      to:t,
      message:`new tuition post in location lat: ${mapData.placeName}`,
      is_read:false
    }
    // console.log('bpdy : ',body)
    try{
      var res=await sendNotificationCall(body)
      // console.log(res)
      return res
      
    }catch(Err){
      showError('An error occured')
    }
  }

  const checkLocations=async()=>{
    if(mapData){
      var response=await getAllPreferredLocations()
      // console.log('we get response : ',response)
      // setLocations(response);
      const tutors= new Set();
      var notificationPromises=[]
      response.data.map((l)=>{
        // console.log('entered')
        // console.log('tutors: ',tutors)
        if(tutors.has(l.tutor_id)===false)
        {
          const distance=calculateDistance(l.latitude,l.longitude,mapData.location.lat,mapData.location.lng)
          console.log('dist,rad,: ',distance,l.radius)
          if (distance<=l.radius){
            tutors.add(l.tutor_id)
            console.log('tutor id: ',l.tutor_id)
            // console.log()
            notificationPromises.push(sendNotification(l.tutor_id))
          }
        }
      })

      var allResponses=await Promise.all(notificationPromises)

      console.log(allResponses)


      // response.data.map((l) => {
      //   console.log('entered')
      //   console.log('tutors: ',tutors)
      //   if(tutors.has(l.tutor_id)===false)
      //   {
      //     const distance=calculateDistance(l.latitude,l.longitude,mapData.location.lat,mapData.location.lng)
      //     // console.log('dist,rad,: ',distance,l.radius)
      //     if (distance<=l.radius){
      //       tutors.add(l.tutor_id)
      //       // console.log('tutor id: ',l.tutor_id)
      //       sendNotification(l.tutor_id)
      //     }
      //   }
      // })
    }else{
      showError('Please select your location')
    }  
    
  }

  //---------------------------------------------here is my portion



  const dialogSaveClick=async ()=>{
      if(mapComponentRef.current.isSelected()){
        var mapData=mapComponentRef.current.getData()
        console.log(mapComponentRef.current)
        setMapData(mapData)
        setMapDialog(false)
        showSuccess("Location selected")
      }else
        showError("Please select a location")
  }

  

  return (
    <div>
      <Dialog
        open={mapDialog}
        >
          <DialogTitle>
            Select Your Location
          </DialogTitle>

          <DialogContent>

          <center style={{width:'100%'}}>
            <MapComponent
                ref={mapComponentRef}
                height="55vh" 
                width="40vw" 
                initLocation={{lat: 23.7983, lng: 90.3876}} 
                initZoom={12}
                mapId="post-map"
              />
          </center>

          </DialogContent>
          <DialogActions>
            <Button
            onClick={()=>{
              setMapDialog(false)
              setMapData(null)
            }}
              color='error'
              >
                Close
              </Button>
              <Button
              onClick={dialogSaveClick}
              color='primary'
              >
                Save
              </Button>
          </DialogActions>
      </Dialog>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#0067AB", paddingBottom: 5 }}>
              Create new post here...
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{
                  display: "flex",
                  fontWeight: 700
                }}
              >
                Choose Subject
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subject}
                  label="Subject"
                  onChange={changeSubject}
                >
                  {subjects.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel
                sx={{
                  display: "flex",
                  fontWeight: 700
                }}
              >
                Choose Class
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={class_}
                  label="Class"
                  onChange={changeClass}
                >
                  {classes.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputLabel
                sx={{
                  display: "flex",
                  fontWeight: 700
                }}
              >
                Budget
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="lower_budget"
                    name="lower_budget"
                    label="Lower Limit"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="upper_budget"
                    name="upper_budget"
                    label="Upper Limit"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                />
            </Grid>



            <Grid item xs={12} sm={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={platform}
                  label="Platform"
                  onChange={setPlatform}
                >
                  {platforms.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

              <div id="location-icon" style={{marginTop:'20px',display:'flex',flexDirection:'row-reverse',width:'100vw'}}>
                <Button
                  variant='contained'
                  onClick={()=>{
                    setMapDialog(true)
                  }}
                  startIcon={<LocationOnIcon/>}
                  >
                    Set Location
                  </Button>
              </div>
            

            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={12}>
                <Button variant="contained" sx={{ justifyContent: "center" }} onClick={checkLocations}>
                  Submit
                </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default CreatePost;