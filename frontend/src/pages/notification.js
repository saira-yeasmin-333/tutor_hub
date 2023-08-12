import axios from "axios";
import { useEffect, useState } from "react";

const Notification=()=>{
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notification/2');
        console.log("response: ",response.data)
        setNotifications(response.data.notification);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    useEffect(() => {
        // Fetch notifications initially
        fetchNotifications();
    
        // Set up interval to fetch notifications periodically
        const intervalId = setInterval(fetchNotifications, 3600*5000); // Fetch every 5 seconds
    
        return () => {
          clearInterval(intervalId); // Clean up interval on unmount
        };
      }, []);
    
    return (
      <div>
        <h1>Real-Time Notifications</h1>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{JSON.stringify(notification)}</li>
          ))}
        </ul>
      </div>
    );
}

export default Notification