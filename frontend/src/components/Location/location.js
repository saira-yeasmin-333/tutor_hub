import { useEffect, useMemo,useState } from "react";
import {TextField,Button} from '@mui/material';
import axios from 'axios';
import {setLoading, showToast} from "../../App";
var mapOptions;
var map;
var plusCode = "R85H+MJ"; // Replace this with the plus code you received
const apiKey = 'AIzaSyB3h0X_Z41DnMPduk98Uhwrvoumlz4yMDM';
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${plusCode}`;


function Location() {
  const center = useMemo(() => ({ lat: 23.7983, lng: 90.3876 }), []);
  const [location, setLocation] = useState(null);
  const [placename, setplacename] = useState(null);
  const [rad, setR] = useState(null);

  const handleRadiusCHange = (event) => {
    setR(event.target.value);
  };

  const findPlusCode = (map, latLng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                const plusCode = results[0].plus_code.compound_code;
                console.log("Plus Code:", plusCode);

                const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${plusCode}`;

                fetch(apiUrl)
                  .then(response => response.json())
                  .then(data => {
                    if (data.status === 'OK') {
                      const result = data.results[0];
                      const formattedAddress = result.formatted_address;
                      console.log("Formatted Address:", formattedAddress);
                      setplacename(formattedAddress)
                      // Now you have the human-readable address, which may include local place names
                    } else {
                      console.error('Geocoding API request failed:', data.status);
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching geocoding data:', error);
                  });
                // Now you can use the plus code as needed
            } else {
                console.error('No results found');
            }
        } else {
            console.error('Geocoding request failed:', status);
        }
    });
  };



  useEffect(()=>{
    var location = new window.google.maps.LatLng(23.8103, 90.4125)
    mapOptions = {
        zoom: 12,
        center: location,
        mapTypeId: window.google.maps.MapTypeId.RoadMap
    }
    map = new window.google.maps.Map(document.getElementById('map-canvas'), mapOptions)
    const geocoder = new window.google.maps.Geocoder();
    const infowindow = new window.google.maps.InfoWindow();
    const myLatlng = { lat: 23.822350, lng: 90.365417 };
    

    let infoWindow = new window.google.maps.InfoWindow({
        // content: "Click the map to get Lat/Lng!",
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
      setLocation(mapsMouseEvent.latLng.toJSON())

      geocoder
      .geocode({ location: mapsMouseEvent.latLng })
      .then((response) => {
        if (response.results[0]) {
          console.log('results form: ',response.results[0])
          infoWindow.setContent(response.results[0].formatted_address);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));

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