import React,{forwardRef,useEffect, useRef,useImperativeHandle} from "react"
import { showError } from "../../App";
import { toast } from "react-hot-toast";

const MapComponent=forwardRef(({height,width,initLocation,initZoom,mapId},ref)=>{

    const dataRef=useRef(null)
    const selectedRef=useRef(false)
    const mapRef=useRef(null)
    const geoCoderRef=useRef(null)
    const infoWindowRef=useRef(null)

    function showPosition(position) {
        var marker = new window.google.maps.Marker({
            position: {lat:position.coords.latitude,lng:position.coords.longitude},
            title:"Hello World!"
        });
        marker.setMap(mapRef.current);
        mapRef.current.panTo({lat:position.coords.latitude,lng:position.coords.longitude})
    }

    useImperativeHandle(ref, () => ({

        getData(){
            return dataRef.current
        },
        isSelected(){
            return selectedRef.current
        }

    }));

    const getPlaceName=async (location)=>{
        try{
            let response=await geoCoderRef.current.geocode({ location })
            if (response.results[0]) {
                infoWindowRef.current.setContent(response.results[0].formatted_address);
                dataRef.current={...dataRef.current,placeName:response.results[0].formatted_address}
                infoWindowRef.current.open(mapRef.current);
            } else {
                showError("No results found");
            }
        }catch(e){
            showError("Geocoder failed due to: " + e)
        }
    }

    const attachMapListeners=async ()=>{
         // Configure the click listener.
        mapRef.current.addListener("click", (mapsMouseEvent) => {
            selectedRef.current=true
            if(infoWindowRef.current)infoWindowRef.current.close()
            infoWindowRef.current = new window.google.maps.InfoWindow({
                position: mapsMouseEvent.latLng
            });
            console.log("select place :",mapsMouseEvent.latLng.toJSON())

            dataRef.current={location:mapsMouseEvent.latLng.toJSON()}

            getPlaceName(mapsMouseEvent.latLng)
          });
    }

    const initializeMap=async ()=>{
        var mapOptions = {
            zoom: initZoom,
            center: new window.google.maps.LatLng(initLocation.lat,initLocation.lng),
            mapTypeId: window.google.maps.MapTypeId.RoadMap,
            draggableCursor:'crosshair'
        }
        mapRef.current = new window.google.maps.Map(document.getElementById(mapId), mapOptions)
        geoCoderRef.current = new window.google.maps.Geocoder();
        infoWindowRef.current = new window.google.maps.InfoWindow(); 
        
        attachMapListeners()
    }

    useEffect(()=>{
        initializeMap()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            toast.error("Geolocation is not supported by this browser.")
        }    
    },[])


    return (
        <div id={mapId} style={{height: height, width: width}}></div>
    );
})

export default MapComponent