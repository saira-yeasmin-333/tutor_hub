import { useEffect, useMemo,useState } from "react";
import {TextField,Button} from '@mui/material';
import axios from 'axios';
import {setLoading, showToast} from "../../App";
var mapOptions;
var map;

function Location() {
  const center = useMemo(() => ({ lat: 23.7983, lng: 90.3876 }), []);
  const [location, setLocation] = useState(null);

  

  const [rad, setR] = useState(null);

  const handleRadiusCHange = (event) => {
    setR(event.target.value);
  };



  const findplaceName=(l)=>{
    const geocoder = new window.google.maps.Geocoder();
    geocoder
    .geocode({ location: l })
    .then((response) => {
      if (response.results[0]) {
        // map.setZoom(11);

        // const marker = new google.maps.Marker({
        //   position: latlng,
        //   map: map,
        // });

        // infowindow.setContent(response.results[0].formatted_address);
        console.log(response.results[0].formatted_address)
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
 }

  useEffect(()=>{
    var location = new window.google.maps.LatLng(23.8103, 90.4125)
    mapOptions = {
        zoom: 12,
        center: location,
        mapTypeId: window.google.maps.MapTypeId.RoadMap
    }
    map = new window.google.maps.Map(document.getElementById('map-canvas'), mapOptions)
    const myLatlng = { lat: 23.822350, lng: 90.365417 };
    

    let infoWindow = new window.google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng,
      });
    
      infoWindow.open(map);
      // Configure the click listener.
      map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new window.google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        console.log("select place :",mapsMouseEvent.latLng.toJSON())
        findplaceName(mapsMouseEvent.latLng)
        setLocation(mapsMouseEvent.latLng.toJSON())
        infoWindow.setContent(
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
        );
        infoWindow.open(map);
      });
  },[])

  
  



 const setRadius=async ()=>{
    console.log(`befor creating location :,${location}`)
    if(location && rad){
        const data = {
            latitude:location.lat,
            longitude:location.lng,
            tutor_id:6,
            address:"dont know",
            radius:rad
        }

        setLoading(true)
        axios.post('http://localhost:5000/api/location', data).then(res=>{
            console.log(res.data)
            showToast('location added successfully')
        }).catch(err=>{
        console.log(err)

        }).finally(()=>{
            setLoading(false)
        })
    } 
 }

// Converts numeric degrees to radians


 const findTutionsClick=async ()=>{

 }


  return (
    <div>
        <h2>
            Map hi
        </h2>
        <div style={{width:"100%"}}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={rad} 
            onChange={handleRadiusCHange} style={{float:"right"}}/>
        </div>
        <div id="map-canvas" style={{height: "70vh", width: "100vw"}}></div>
        <div className = "add">
            <Button variant={"contained"} onClick={setRadius} style={{borderRadius:15}}> Set Location</Button>
        </div>
    </div>
  );
}

export default Location