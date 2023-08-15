import { useRef,useState } from "react";
import {TextField,Button} from '@mui/material';
import {setLoading, showError, showSuccess, showToast} from "../../App";
import MapComponent from "./MapComponent";
import { saveTutorLocation } from "../../actions/location";


function Location() {

  const [rad, setR] = useState(null);
  const mapComponentRef=useRef()

  const handleRadiusCHange = (event) => {
    setR(event.target.value);
  };

 const setRadius=async ()=>{
    if(mapComponentRef.current.isSelected()){
      const selectedLocation=mapComponentRef.current.getData()
      console.log(selectedLocation)
      if(rad){
        const data = {
          latitude:selectedLocation.location.lat,
          longitude:selectedLocation.location.lng,
          address:selectedLocation.placeName,
          radius:rad
        }
        console.log('data: ',data)
        setLoading(true)
        var res=await saveTutorLocation(data)
        setLoading(false)
        if(res)
          showSuccess("Location saved successfully")
        else showError("An error occurred")
      }
    }else{
      showError("Please select a location")
    }
 }
  return (
    <div>
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