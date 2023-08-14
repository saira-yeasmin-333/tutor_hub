import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from 'axios';
import {calculateDistance} from '../components/common/distance'
import Cookies from 'universal-cookie';
import { showError, showToast } from '../App';
const cookies = new Cookies();

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

  const changeClass = (event) => {
    setClass(event.target.value);
  };

  const changeSubject = (event) => {
    setSubject(event.target.value);
  };

  const [locations,setLocations]=useState([])
  const [place,setPlace]=useState({ lat: 23.7983, lng: 90.3876 })

  const sendNotification=(tutors)=>{
    tutors.forEach(t=>{
      const body={
        from:0,
        to:t,
        message:"new tuition post in location lat: ${place.lat},long: ${place.lng}",
        is_read:false
      }

      var res=axios.post('http://localhost:5000/api/notification',{})
      console.log(res)
      if(res.data.success){
        showToast('working')
      }else{
        showError('somethins is wrong')
      }
    })
  }

  const checkLocations=()=>{
    axios
    .get(`http://localhost:5000/api/location`)
    .then((response) => {
        const tutors= new Set();
        setLocations(response.data.data); // Set the fetched data to the state
        console.log('we get response : ',response.data.data)
        response.data.data.map((location) => {
          const distance=calculateDistance(location.latitude,location.longitude,place.lat,place.lng)
          console.log('dist,rad,: ',distance,location.radius)
          if (distance<=location.radius){
            console.log('tutor id: ',location.tutor_id)
            tutors.add(location.tutor_id)
          }
        })
        console.log('cnt: ',tutors.size)

        sendNotification(tutors)
    })
    .catch((error) => {
        console.error('Error fetching user profile:', error);
    });
  }

  //---------------------------------------------here is my portion
  useEffect(()=>{
    
  })

  

  return (
    <div>
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


            <Grid item xs={12} sm={5} />
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