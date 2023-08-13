import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button } from '@mui/material';
import PrimarySearchAppBar from '../components/Appbar/appbar'
import Efficiencies from './Efficiencies';
import Cookies from 'universal-cookie';
import { ref, getDownloadURL,uploadBytes} from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { setLoading, showToast } from '../App';

const cookies = new Cookies();

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState(null);
    const imageRef = ref(storage, `images/${v4()}${imageUpload?.name}`);

    const uploadFile = () => {
        console.log(imageUpload)
        if (imageUpload == null) return;
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            console.log(url)
            setImageUrls(url);
            updateProfile(url)
        }).catch(e=>{
            console.log(e)
        })
    }).catch(e=>{
        console.log(e)
    });

    };

   const updateProfile=async(url)=>{
    console.log('url ;',url)
        setLoading(true)
        await axios.post('http://localhost:5000/api/profile',{"url":url},{headers:{authorization:'Bearer '+cookies.get('token')}}).then(res=>{
            setLoading(false)
            showToast('Profile Updated Successfully')
            setUser({...user,image:url})
        }).catch(err=>{
            setLoading(false)
            showToast('Connectvity problem')
        })
    }

    useEffect(() => {
        // Make the HTTP GET request to the backend API
        axios
            .get(`http://localhost:5000/api/get-profile`,{headers:{authorization:'Bearer '+cookies.get('token')}})
      .then((response) => {
                setUser(response.data.data); // Set the fetched data to the state

                console.log('we get response : ',response.data.data)
                if(response.data.data.image){
                    console.log('here entered')
                    setImageUrls(response.data.data.image)
                }
                
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
            });
    }, [id]); // Add "id" as a dependency

    if (!user) {
        return <div>Loading...</div>; // Display a loading message while fetching data
    }

    return (
        <div>
            <PrimarySearchAppBar type={user.type} />
            <h1>User Profile</h1>


            {
                user.image?(
                    <Avatar
                        alt="Homer Sharp"
                        src={user.image}
                        sx={{ width: 156, height: 156 }}
                    />
                ):(
                    <Avatar
                        alt="Homer Sharp"
                        src="/PICT0018.jpg"
                        sx={{ width: 156, height: 156 }}
                    />
                )
            }
            <input
                type="file"
                onChange={(event) => {
                setImageUpload(event.target.files[0]);
                }}
            />

            <Button variant="raised" component="span"  style={{
                backgroundColor: '#007bff', // Blue color
                color: '#fff', // White color
                padding: '10px 20px', // Padding for the button (top/bottom left/right)
                borderRadius: '8px', // Rounded corners
                padding: '8px 16px', // Padding for the button
                fontSize: '14px', // Font size
                fontWeight: 'bold', // Bold text
                margin: '10px' // Margin around the button
            }} onClick={uploadFile}>
                Upload
            </Button>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Account Type: {user.role}</p>
            <Efficiencies id ={user.account_id} role={user.role} />
        </div>
    );
};

export default ProfilePage;