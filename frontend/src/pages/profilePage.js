import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, CardContent, CardHeader, Tab, Tabs, Rating } from '@mui/material';
import PrimarySearchAppBar from '../components/Appbar/appbar';
import Efficiencies from './Efficiencies';
import Cookies from 'universal-cookie';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { setLoading, showToast } from '../App';

const cookies = new Cookies();

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [currentTab, setCurrentTab] = useState(0);
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState(null);
    const imageRef = ref(storage, `images/${v4()}${imageUpload?.name}`);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };
    

    // const uploadFile = () => {
    //     console.log(imageUpload)
    //     if (imageUpload == null) return;
    //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //         console.log(url)
    //         setImageUrls(url);
    //         updateProfile(url)
    //     }).catch(e=>{
    //         console.log(e)
    //     })
    // }).catch(e=>{
    //     console.log(e)
    // });

    // };

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
        <div style={{ backgroundColor: '#BDCDF5', minHeight: '100vh' }}>
          <PrimarySearchAppBar type={user.type} />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <Card sx={{ width: 600, marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, padding: '20px' }}>
                {user.image ? (
                  <img alt="User" src={user.image} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                ) : (
                  <img alt="Default" src="/PICT0018.jpg" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                )}
              </div>
              <div style={{ flex: 2, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{user.name}</h1>
                <p style={{ fontSize: '14px', margin: '0', color: '#007bff' }}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <Rating name="half-rating" defaultValue={2.5} precision={0.5} readOnly />
                  <p style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px', color: 'black' }}>2.5</p>
                </div>
    
                <Tabs value={currentTab} onChange={handleTabChange} style={{ marginTop: '20px' }}>
                  <Tab label="About"  />
                  <Tab label="Reviews" />
                  <Tab label="Overview" />
                </Tabs>
    
                {currentTab === 0 && (
                     <CardContent>
                        <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                        Phone: {'\t'} {/* Tabbed space */}
                        <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#007bff' }}>{user.phone}</span>
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                        Email: {'\t'} {/* Tabbed space */}
                        <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#007bff' }}>{user.email}</span>
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                        Efficiency: {'\t'} {/* Tabbed space */}
                        <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                            {user.subjects.map((sub, i) => (
                            <span key={i}>{
                                <span
                                    key={i}
                                    style={{
                                    display: 'inline-block',
                                    margin: '2px',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    }}
                                >
                                    {sub.sub_name}
                                </span>
                                }{i < user.subjects.length - 1 ? ', ' : ''}</span>
                            ))}
                        </span>
                        </p>
                   </CardContent>
                )}

                {currentTab === 1 && (
                     <CardContent>
                        <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                        Phone: {'\t'} {/* Tabbed space */}
                        <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#007bff' }}>{user.phone}</span>
                        </p>
                   </CardContent>
                )}

    
                {/* Add content for other tabs here */}
              </div>
            </Card>
          </div>
        </div>
      );
};

export default ProfilePage;
