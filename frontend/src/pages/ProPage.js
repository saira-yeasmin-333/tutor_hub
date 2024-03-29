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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { setLoading, showToast } from '../App';
import EditIcon from '@mui/icons-material/Edit';
import TextEditor from '../components/common/TextEditor';
import { useNavigate } from "react-router-dom";
import { getCountReq } from '../actions/request';
import TimestampToDate from '../components/common/timestamptodate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}


const cookies = new Cookies();

const ProfilePage = () => {
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(null);
  const imageRef = ref(storage, `images / ${v4()}${imageUpload?.name}`);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [media, setMedia] = useState([]);
  const [isDeleteLocationDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);
  const [cnt, setcnt] = useState(0)

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenDeleteLocationDialog = (index) => {
    console.log("trying to delete ", index)
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

  const uploadFile = () => {
    console.log(imageUpload)
    if (imageUpload == null) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        setImageUrls(url);
        updateProfile(url)
      }).catch(e => {
        console.log(e)
      })
    }).catch(e => {
      console.log(e)
    });

  };

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
      const response = await axios.get(`http://localhost:5000/api/get-rating`, { headers: { authorization: 'Bearer ' + cookies.get('token') } });
      setRating(response.data.data);
      console.log("Rating:")
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const fetchStudentRating = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-student-rating`, { headers: { authorization: 'Bearer ' + cookies.get('token') } });
      setRating(response.data.data);
      console.log("Rating of a student:")
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/review`, { headers: { authorization: 'Bearer ' + cookies.get('token') } });
      setReviews(response.data.data);
      console.log("Review:")
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  }

  const [grades, setGrades] = useState([])

  const sendForReview = async (row) =>{
    console.log("over here")
    const updatedRow = { ...row, submit_for_review: "pending" };
    const rowIndex = grades.findIndex((grade) => grade.grade_id === updatedRow.grade_id);
    if (rowIndex !== -1) {
      // If the grade is found in the array, update it
      const updatedGrades = [...grades];
      updatedGrades[rowIndex] = updatedRow;

      // Update the grades state with the modified array
      setGrades(updatedGrades);
    }
    try {
      // Replace with your API endpoint and payload
      const response = await axios.put(`http://localhost:5000/api/updategrade`, updatedRow);
      console.log("API Response:", response.data);
      // Handle success if needed
    } catch (error) {
      console.error("API Error:", error);
      // Handle the error, e.g., show an error message or revert the change
      // You can also reset the grades state if needed
      // setGrades([...grades]); // Revert to the previous state
    }
    
  };

  const handleSubmitForReview = (row) => {
    // This function will be called when the Edit button is clicked
    // `row` contains the data of the clicked row, such as grade details
    // Implement your logic for editing the grade here
    console.log("changed: ", row.submit_for_review)
    if (row.submit_for_review === "none") sendForReview(row);
    else if(row.submit_for_review === "reviewed") {
      toast.error('This grade has already been reviewed', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else {
      toast.error('This grade has already been sent for review', {
        position: toast.POSITION.TOP_CENTER,
      });
    }

  };


  const fetchGrades = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gradebyId`, { headers: { authorization: 'Bearer ' + cookies.get('token') } });
      setGrades(response.data.data);
      console.log("Grades:")
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching user rating:', error);
    }
  }

  const getCouReq = async () => {
    try {
      const response = await getCountReq();
      console.log('res: ', response)
      setcnt(response.data)
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  }

  useEffect(() => {
    // Make the HTTP GET request to the backend API

    getCouReq()
    axios
      .get(`http://localhost:5000/api/get-profile`,{headers:{authorization:'Bearer '+cookies.get('token')}})
            .then((response) => {
            console.log(response.data.data)

        setUser(response.data.data); // Set the fetched data to the state

        console.log('we get response : ', response.data.data)
        if (response.data.data.image) {
          console.log('here entered')
          setImageUrls(response.data.data.image)
        }
        if (response.data.data.role === 'teacher') {
          fetchUserRating();
          fetchReviews();
          if (response.data.data.physicalMedia === true) {
            const updatedMedia = [...media, "Physical"];
            // Update the state with the new array
            setMedia(updatedMedia);
          }
          if (response.data.data.onlineMedia === true) {
            const updatedMedia = [...media, "Online"];
            // Update the state with the new array
            setMedia(updatedMedia);
          }
        }
        else {
          fetchStudentRating();
          fetchGrades();
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
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <Button variant="raised" component="span" style={{
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
              <Rating name="half-rating" value={rating} precision={0.25} readOnly />
              <p style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px', color: 'black' }}>{rating.toFixed(2)}</p>
            </div>

            <Tabs value={currentTab} onChange={handleTabChange} style={{ marginTop: '20px' }}>
              <Tab label="About" />
              {user.role === "teacher" ? <Tab label="Reviews" /> : <Tab label="Grades" />}
              <Tab label="Overview" />
            </Tabs>

            <div >
              {currentTab === 0 && (

                <CardContent style={{ overflowY: 'auto', height: '200px' }}>
                  {/* <p>count : {cnt}</p> */}
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
                          {user.preferred_locations.map((loca, i) => (
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

              {currentTab === 1 && user.role==='teacher' && (
                <CardContent style={{ overflowY: 'auto', height: '200px' }}>
                  {user.role === "teacher" ? (
                    <div>
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
                    </div>
                  ) : (
                    <div>

                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell align="right">Subject</TableCell>
                              <TableCell align="right">Marks Received</TableCell>
                              <TableCell align="right">Total Marks</TableCell>
                              <TableCell align="right">Date of Exam</TableCell>
                              <TableCell align="right">Review Status</TableCell>
                              <TableCell align="right">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {grades.map((row) => (
                              <TableRow
                                key={row.grade_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.title}
                                </TableCell>
                                <TableCell align="right">{row.subject.sub_name}</TableCell>
                                <TableCell align="right">{row.mark_received}</TableCell>
                                <TableCell align="right">{row.total_marks}</TableCell>
                                <TableCell align="right"><TimestampToDate timestamp={row.timestamp_of_exam} /></TableCell>
                                <TableCell align="right">{row.submit_for_review}</TableCell>
                                <TableCell align="right">
                                  <IconButton onClick={() => handleSubmitForReview(row)} aria-label="Edit Profile">
                                    <EditIcon /> {/* Use the appropriate icon component */}
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                    </div>
                  )}
                </CardContent>
              )}

              {currentTab === 2 && <div>
                  <Bar options={options} data={user.graph} />;   
                </div>}


              
            </div>

            {/* Add content for other tabs here */}

            {currentTab === 1 && (
                <CardContent style={{ overflowY: 'auto', height: '200px' }}>
                  {user.role === "teacher" ? (
                    <div>
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
                    </div>
                  ) : (
                    <div>

                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Title</TableCell>
                              <TableCell align="right">Subject</TableCell>
                              <TableCell align="right">Marks Received</TableCell>
                              <TableCell align="right">Total Marks</TableCell>
                              <TableCell align="right">Date of Exam</TableCell>
                              <TableCell align="right">Review Status</TableCell>
                              <TableCell align="right">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {grades.map((row) => (
                              <TableRow
                                key={row.grade_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.title}
                                </TableCell>
                                <TableCell align="right">{row.subject.sub_name}</TableCell>
                                <TableCell align="right">{row.mark_received}</TableCell>
                                <TableCell align="right">{row.total_marks}</TableCell>
                                <TableCell align="right"><TimestampToDate timestamp={row.timestamp_of_exam} /></TableCell>
                                <TableCell align="right">{row.submit_for_review}</TableCell>
                                <TableCell align="right">
                                  <IconButton onClick={() => handleSubmitForReview(row)} aria-label="Edit Profile">
                                    <EditIcon /> {/* Use the appropriate icon component */}
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                    </div>
                  )}
                </CardContent>
              )}
          </div>
        </Card>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default ProfilePage;