import { useRef, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";
import axios from 'axios';
import '../post/Post.css';
import {calculateDistance} from '../../components/common/distance'
import { showError, showSuccess, showToast } from '../../App';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MapComponent from '../../components/Location/MapComponent';
import { sendNotification } from '../../actions/notification';
import { getAllPreferredLocations } from '../../actions/location';
import { createPost } from "../../actions/post";
import Cookies from 'universal-cookie';
import PrimarySearchAppBar from "../../components/Appbar/appbar";

const cookies = new Cookies();

const CreatePost = () => {
  const [platform, setPlatform] = useState('');
  const [budget, setBudget] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const mapComponentRef=useRef()
  const [mapDialog,setMapDialog]=useState(false)
  const [mapData,setMapData]=useState(null)

  const [user, setUser] = useState(null);


  const SettingRoleinGrade = async () => {
    axios
        .get(`http://localhost:5000/api/get-profile`, { headers: { authorization: 'Bearer ' + cookies.get('token') } })
        .then((response) => {
            setUser(response.data.data);
            console.log('we get response : ', response.data.data);
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
        });
  };

  useEffect(() => {
    SettingRoleinGrade();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('p: ',platform)
    // return
    // Make an API request to your server to create the new post
    if(mapData!==null){
      try {

        const post_body={
          selectedSubjects,
          platform,
          budget: parseFloat(budget),
          class: parseInt(classLevel),
          latitude:mapData.location.lat,
          longitude:mapData.location.lng,
          address:mapData.placeName,
          subjectIdsToAssociate:selectedSubjects
        }
        const response = await createPost(post_body)
      
        console.log(response); // You can handle the response as needed
        if(response.success){
          showSuccess('post created successfully')
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }else{
      showError('Please select your location')
    }
  };

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
            var message=`new tuition post in location lat: ${mapData.placeName}`
            notificationPromises.push(sendNotification(l.tutor_id,message))
          }
        }
      })

      var allResponses=await Promise.all(notificationPromises)

      console.log(allResponses)
    }else{
      //showError('Please select your location')
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

  const handleSubjectChange = (e) => {
    const subjectId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <PrimarySearchAppBar type={user.role} />
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

      <Typography variant="h6" gutterBottom sx={{ color: "#0067AB", paddingBottom: 5 }} style={{margin:'20px'}}>
          Create new post here...
      </Typography>
      
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Choose a Subject:
        </label>

        <div style={{display:'flex'}}>
          <div>
          <label>
        <input
          type="checkbox"
          value="1"
          checked={selectedSubjects.includes(1)}
          onChange={handleSubjectChange}
        />
        biology
      </label>
      <label>
        <input
          type="checkbox"
          value="2"
          checked={selectedSubjects.includes(2)}
          onChange={handleSubjectChange}
        />
        physics
      </label>
      <label>
        <input
          type="checkbox"
          value="3"
          checked={selectedSubjects.includes(3)}
          onChange={handleSubjectChange}
        />
        math
      </label>


      <label>
        <input
          type="checkbox"
          value="4"
          checked={selectedSubjects.includes(4)}
          onChange={handleSubjectChange}
        />
        chemistry
      </label>

          </div>
        </div>

        <label className="form-label">
          Choose a Platform:
          <select className="form-select" value={platform} onChange={(e) => {
              console.log(e.target.value)
              setPlatform(e.target.value);
          }}>
            <option value="online">Online</option>
            <option value="physical">Physical</option>
          </select>
        </label>

        <label className="form-label">
          Budget:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>

        <label className="form-label">
          Choose a Class:
          <select className="form-select"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2">3</option>
            <option value="2">4</option>
            <option value="2">5</option>
            <option value="2">6</option>
            <option value="2">7</option>
            <option value="2">8</option>
            <option value="2">9</option>
            <option value="2">10</option>
            <option value="2">11</option>
            <option value="2">12</option>
            {/* ... Include options for classes 3 to 12 */}
          </select>
        </label>

        <div id="location-icon" style={{marginTop:'20px',marginRight:'80px',marginBottom:'20px',display:'flex',flexDirection:'row-reverse',width:'100vw'}}>
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

      <button className="form-button" type="submit" onClick={checkLocations}>
        Create Post
      </button>
      </form>

    </div>
    </div>
  );
};

export default CreatePost;