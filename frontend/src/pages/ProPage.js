import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Card, CardContent, CardHeader, Tab, Tabs, Rating, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PrimarySearchAppBar from '../components/Appbar/appbar';
import Efficiencies from './Efficiencies';
import Cookies from 'universal-cookie';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { setLoading, showToast } from '../App';
import EditIcon from '@mui/icons-material/Edit';
import TextEditor from '../components/common/TextEditor';
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const ProfilePage = () => {
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);
  const imageRef = ref(storage, `images / ${ v4() }${ imageUpload?.name }`);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [media, setMedia] = useState([]);
  const [isDeleteLocationDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenDeleteLocationDialog = (index) => {
    console.log("trying to delete ",index)
    setSelectedLocationIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteLocationDialog = () => {
    setSelectedLocationIndex(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteLocation = () => {
    if (selectedLocationIndex !== null) {
      // Delete the preferred location at the selected index
      const locationToDelete = user.preferred_locations[selectedLocationIndex];
      DeleteLocation(locationToDelete.id);
      const updatedLocations = user.preferred_locations.filter((_, index) => index !== selectedLocationIndex);
      // Update the state
      setUser({ ...user, preferred_locations: updatedLocations });
      // Close the dialog
      handleCloseDeleteLocationDialog();
    }
  };

  const DeleteLocation = (locationIdToDelete) => {
    axios.delete('http://localhost:5000/api/delete-location', {
      data: {
          location_id: locationIdToDelete
      }
    })
    .then(response => {
        // Handle success
        console.log('Location deleted successfully:', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error deleting location:', error);
    });
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

  const updateProfile = async (url) => {
    console.log('url ;', url)
    setLoading(true)
    await axios.post('http://localhost:5000/api/profile', { "url": url }, { headers: { authorization: 'Bearer ' + cookies.get('token') } }).then(res => {
      setLoading(false)
      showToast('Profile Updated Successfully')
      setUser({ ...user, image: url })
    }).catch(err => {
      setLoading(false)
      showToast('Connectvity problem')
    })
  }

  const handleEditProfileClick = () => {
    // Navigate to the edit profile page
    // You need to implement this navigation logic based on your routing setup
  };

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-rating`,{headers:{authorization:'Bearer '+cookies.get('token')}});
        setRating(response.data.data);
      console.log("Rating:")
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/review`,{headers:{authorization:'Bearer '+cookies.get('token')}});
        setReviews(response.data.data);
      console.log("Review:")
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  }


  useEffect(() => {
    // Make the HTTP GET request to the backend API
    axios
      .get(`http://localhost:5000/api/get-profile`,{headers:{authorization:'Bearer '+cookies.get('token')}})
            .then((response) => {
        setUser(response.data.data); // Set the fetched data to the state

        console.log('we get response : ', response.data.data)
        if (response.data.data.image) {
          console.log('here entered')
          setImageUrls(response.data.data.image)
        }
        if (response.data.data.role === 'teacher') {
          fetchUserRating();
          fetchReviews();
          if (response.data.data.physicalMedia === true){
            const updatedMedia = [...media, "Physical"];
            // Update the state with the new array
            setMedia(updatedMedia);
          }
          if (response.data.data.onlineMedia === true){
            const updatedMedia = [...media, "Online"];
            // Update the state with the new array
            setMedia(updatedMedia);
          }
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
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <PrimarySearchAppBar type={user.type} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <Card sx={{ width: 1200, marginTop: '20px', display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1, padding: '20px' }}>
            {user.image ? (
              <img alt="User" src={user.image} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            ) : (
              <img alt="Default" src="/PICT0018.jpg" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
            )}
          </div>
          <div style={{ flex: 2, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>{user.name}</h1>
              <IconButton onClick={handleEditProfileClick} aria-label="Edit Profile">
                <EditIcon /> {/* Use the appropriate icon component */}
              </IconButton>
            </div>
            <p style={{ fontSize: '14px', margin: '0', color: '#007bff' }}>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Rating name="half-rating" value={rating} precision={0.5} readOnly />
              <p style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px', color: 'black' }}>{rating}</p>
            </div>

            <Tabs value={currentTab} onChange={handleTabChange} style={{ marginTop: '20px' }}>
              <Tab label="About" />
              {user.role === "teacher" ? <Tab label="Reviews" /> : <Tab label="Grades" />}
              <Tab label="Overview" />
            </Tabs>

            <div >
              {currentTab === 0 && (
                
                <CardContent style={{ overflowY: 'auto', height: '200px' }}>
                  <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    Phone: {'\t'} {/* Tabbed space */}
                    <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#007bff' }}>{user.phone}</span>
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    Email: {'\t'} {/* Tabbed space */}
                    <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#007bff' }}>{user.email}</span>
                  </p>
                  {user.role === "teacher" && (
                    <div>
                      <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                      Media: {'\t'} {/* Tabbed space */}
                      <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                      {media.map((med, i) => (
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
                              {med}
                            </span>
                          }{i < media.length - 1 ? ', ' : ''}</span>
                        ))}
                      </span>
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
                    <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    Locations: {'\t'} {/* Tabbed space */}
                    <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                      {user.preferred_locations.map((loca,i) => (
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
                              cursor: 'pointer'
                            }}
                            onClick={() => handleOpenDeleteLocationDialog(i)}
                          >
                            {loca.address}
                          </span>
                          
                        }{i < user.preferred_locations.length - 1 ? ', ' : ''}</span>
                      ))}
                      <span
                        style={{
                          display: 'inline-block',
                          margin: '2px',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                        onClick={() => history('/location')}
                      >
                        +
                      </span>
                      <Dialog open={isDeleteLocationDialogOpen} onClose={handleCloseDeleteLocationDialog}>
                        <DialogTitle>Delete Preferred Location</DialogTitle>
                        <DialogContent>
                          Are you sure you want to delete the preferred location:
                          <strong>{selectedLocationIndex !== null && user.preferred_locations[selectedLocationIndex]?.address}</strong>?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseDeleteLocationDialog} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={handleDeleteLocation} color="secondary">
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </span>
                  </p>

                    </div>
                    
                    )
                    
                  }
                </CardContent>
              )}

              {currentTab === 1 && (
                <CardContent style={{ overflowY: 'auto', height: '200px' }}>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <Card key={index} style={{ marginBottom: '10px', padding: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt="User" src={review.account.image} />
                          <div style={{ marginLeft: '10px' }}>
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>{review.account.name}</h4>
                            <p style={{ fontSize: '14px', margin: '0' }}>{new Date(review.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                          <Rating name={`review-rating-${index}`} value={review.rating} precision={0.5} readOnly />
                          <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0', marginLeft: '10px' }}>{review.rating}</h4>
                        </div>
                        <div>
                          <TextEditor review={review.review_text} readonly_val={true} />
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p>No reviews available.</p>
                  )}
                </CardContent>
              )}

              {currentTab === 2 && (
                <CardContent style={{ overflowY: 'auto', height: '200px' }}>
                  <p style={{ margin: '5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    Phone: {'\t'} {/* Tabbed space */}
                    <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#007bff' }}>{user.phone}</span>
                  </p>
                </CardContent>
              )}

            </div>

            {/* Add content for other tabs here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;