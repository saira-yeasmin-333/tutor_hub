import { useRef,useState } from "react";
import {TextField,Button} from '@mui/material';
import {setLoading, showError, showSuccess, showToast} from "../../App";
import MapComponent from "./MapComponent";
import { saveTutorLocation } from "../../actions/location";
import Cookies from 'universal-cookie';
import React, { useEffect } from 'react';
import axios from 'axios';
import PrimarySearchAppBar from "../Appbar/appbar";

const cookies = new Cookies();

function Location() {

  const [rad, setR] = useState(null);
  const [user, setUser] = useState(null);
  const mapComponentRef=useRef()

  const handleRadiusCHange = (event) => {
    setR(event.target.value);
  };

  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
        .get(`http://localhost:5000/api/get-profile`,{headers:{authorization:'Bearer '+cookies.get('token')}})
        .then((response) => {
            setUser(response.data.data); // Set the fetched data to the state

            console.log('we get response : ',response.data.data)
            if(response.data.data.image){
                console.log('here entered')
            }
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
        });
}, []); // Add "id" as a dependency

 const setRadius=async ()=>{
    if(mapComponentRef.current.isSelected()){
      const selectedLocation=mapComponentRef.current.getData()
      console.log(selectedLocation)
      console.log('now clicked rad : ',rad)
      if(rad!==null){
        const data = {
          latitude:selectedLocation.location.lat,
          longitude:selectedLocation.location.lng,
          address:selectedLocation.placeName,
          radius:rad
        }
        setLoading(true)
        console.log('before sending location dta: ',data)
        var res=await saveTutorLocation(data)
        setLoading(false)
        if(res){
          console.log('fetch resukt: ',res)        
          showSuccess("Location saved successfully")
        }
        else showError("An error occurred")
      }
      else{
        showError('please select your radius')
      }
    }else{
      showError("Please select your location")
    }
 }

 if (!user) {
  return <div>Loading...</div>; // Display a loading message while fetching data
 }

  return (
    <div style={{ backgroundColor: '#BDCDF5', minHeight: '100vh' }}>
        <PrimarySearchAppBar type={user.type} />
        <div style={{width:"100%",display:'flex',justifyContent:'space-between'}}>
          <h2 style={{marginLeft:'5vw'}}>
              Select your preferred location
          </h2>
          <div style={{marginTop:'10px',marginRight:'5vw'}}>
              <TextField id="outlined-basic" label="radius" variant="outlined" value={rad} 
              onChange={handleRadiusCHange}/>
          </div>
        </div>
        
        <center style={{width:'100%'}}>
          <MapComponent 
              ref={mapComponentRef}
              height="70vh" 
              width="90vw" 
              initLocation={{lat: 23.7983, lng: 90.3876}} 
              initZoom={12}
              mapId="main-map"
            />
        </center>
        
        <div className = "add" style={{width:'100%',marginTop:'20px',display:'flex',justifyContent:'center'}}>
            <Button variant={"contained"} onClick={setRadius} style={{borderRadius:15}}> Set Location</Button>
        </div>
    </div>
  );
}

export default Location