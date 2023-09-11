import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import enUS from 'date-fns/locale/en-US'
import { useState } from "react";
import { useEffect } from "react";

import Cookies from 'universal-cookie';
import axios from "axios";
import { showSuccess } from "../App";
import PrimarySearchAppBar from "../components/Appbar/appbar";
import { Button, LinearProgress } from "@mui/material";
const cookies = new Cookies();

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const events = [
    
];

function Planner() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [user, setUser] = useState(null);

    const fetchPlanner=async ()=>{
        const res=await axios.get(`http://localhost:5000/api/plan`,{headers:{authorization:'Bearer '+cookies.get('token')}})
        console.log(res.data.result)
        if(res.data.result)
            setAllEvents(res.data.result.plan.events)
    }

    useEffect(()=>{
        axios
      .get(`http://localhost:5000/api/get-profile`, { headers: { authorization: 'Bearer ' + cookies.get('token') } })
      .then((response) => {
        setUser(response.data.data); // Set the fetched data to the state

        // console.log('filter response : ',response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
        fetchPlanner()
    },[])

    

    const handleAddEvent=async ()=> {

        for (let i = 0; i < allEvents.length; i++) {

            const d1 = new Date(allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
            /*
                console.log(d1 <= d2);
                console.log(d2 <= d3);
                console.log(d1 <= d4);
                console.log(d4 <= d3);
                  */

            if (
                ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
                    (d4 <= d3))
            ) {
                alert("CLASH");
                break;
            }

        }


        setAllEvents([...allEvents, newEvent]);

        await axios.post(`http://localhost:5000/api/plan`,{
            plan:{events:[...allEvents, newEvent]}
        },{headers:{authorization:'Bearer '+cookies.get('token')}})
        
        showSuccess('Event Added Successfully...')
        
    }
    if (user === null) return <LinearProgress />
    return (
        
        <div className="App" >
            <PrimarySearchAppBar type={user.type} />
            <div style={{padding:'20px'}}>
            <h2>Add New Event</h2>
            <div>
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker
                    placeholderText="Start Date"
                    style={{ marginRight: "10px" }}
                    selected={newEvent.start}
                    onChange={(date) =>
                        setNewEvent({ ...newEvent, start: date })
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <DatePicker
                    placeholderText="End Date"
                    selected={newEvent.end}
                    style={{ marginLeft: "10px" }}
                    onChange={(date) => setNewEvent({ ...newEvent, end: date })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
                <Button variant='contained' color='primary' style={{ marginLeft:'10px' }} onClick={handleAddEvent}>
                    Add Event
                </Button>
            </div>
            <Calendar key={Date.now()} localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
            </div>
        </div>
    )
}

export default Planner;