import React, { useState, useEffect, useRef } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Drawer, CssBaseline, styled, Button, Grid, TextField, LinearProgress, Typography, Divider } from '@mui/material';
import CheckboxMenu from '../components/common/checkbox'
import axios from 'axios';
import CardComponent from '../components/common/card/CardComponent';
import { calculateDistance } from '../components/common/distance'
import { showError, showSuccess, showToast, setLoading } from '../App';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import MapComponent from '../components/Location/MapComponent';
import { getAllTutors } from '../actions/auth';
import PrimarySearchAppBar from '../components/Appbar/appbar';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const StyledImageButton = styled(Button)({
  width: '100px', // Set the desired button width
  height: '100px', // Set the desired button height
  padding: 0, // Remove default button padding
  background: 'url("https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg") center/cover', // Set image as background
});

const MyDrawer = styled(Drawer)({
  width: 240
});

const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}));


const StudentFilter = () => {

  const [value, setValue] = useState(0);

  const options = ['rating', 'budget'];
  const options2 = ['Physical', 'Online'];

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);

  const [Fav_location, setPreferredLocations] = useState([])


  const radRef = useRef()

  const [tutors, setTutors] = useState([])
  const [all_tutors, setAllTutors] = useState([])
  const selectedRef = useRef(false)

  const [user, setUser] = useState(null);

  const mapComponentRef = useRef()
  const [mapDialog, setMapDialog] = useState(false)
  const [mapData, setMapData] = useState(null)
  const [rad, setR] = useState(null);

  const handleRadiusCHange = (event) => {
    setR(event.target.value);
    radRef.current = event.target.value
  };




  const [open, setOpen] = useState(true);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const dialogSaveClick = async () => {
    if (mapComponentRef.current.isSelected()) {
      var mapDataTmp = mapComponentRef.current.getData()
      console.log(mapComponentRef.current)
      setMapData(mapDataTmp)
      console.log('maodata :', mapDataTmp)
      setMapDialog(false)
      showSuccess("Location selected")
      selectedRef.current = true
      var dist = []
      var isRange = false

      // console.log(rad)

      if (mapDataTmp !== null) {
        tutors.forEach(tutor => {
          var distance = 100000
          isRange = false
          tutor.preferred_locations.forEach(favLocation => {
            var d = calculateDistance(
              favLocation.latitude,
              favLocation.longitude,
              mapDataTmp.location.lat,
              mapDataTmp.location.lng,
            );

            console.log('rad,d: ', d, radRef.current, distance)

            // Replace 2 with your desired distance limit
            if (d <= radRef.current) {
              isRange = true
              if (d < distance) {
                distance = d
              }

            }
          });
          console.log('end here ', distance)
          if (isRange) {
            dist.push({
              ...tutor,
              distance
            })
          }
        });

        console.log('all dist: ', dist)
        dist = dist.slice().sort((a, b) => a.distance - b.distance);
        setTutors(dist)

      }
    } else
      showError("Please select a location")
  }

  const fetchTutors = async () => {
    setLoading(true)
    var res = await getAllTutors()
    if (res.success) {
      setLoading(false)
      console.log('here appeared')
      setTutors(res.data)
      setAllTutors(res.data)
    }
    else {
      showError('Something is wrong')
      setLoading(false)
    }
    console.log('here')
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get-profile`, { headers: { authorization: 'Bearer ' + cookies.get('token') } })
      .then((response) => {
        setUser(response.data.data); // Set the fetched data to the state

        // console.log('filter response : ',response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
    fetchTutors()
  }, [])

  const filterLocation = () => {


  };


  const applyFilter = () => {
    var temp = []
    selectedItems2.forEach(item => {
      if (item === 'Online') {
        all_tutors.forEach(p => {
          if (p.onlineMedia) {
            temp.push(p)
          }
        })
      }

      if (item === 'Physical') {
        all_tutors.forEach(p => {
          if (p.physicalMedia) {
            temp.push(p)
          }
        })
      }
    })

    if (selectedItems2.length === 0) {
      temp = all_tutors
    }
    selectedItems.forEach(item => {
      if (item === 'budget') {
        temp = temp.slice().sort((a, b) => b.budget - a.budget);
      }
    })

    setTutors(temp)
  };



  const resetFilter = () => {
    setSelectedItems([])
    setSelectedItems2([])
    selectedRef.current = false
    setTutors(all_tutors)
  };




  if (user === null) return <LinearProgress />
  else
    return (

      <div>
        {!tutors ? (
          <div>Loading...</div>

        ) : (
          <div>
            <PrimarySearchAppBar type={user.type} />
            <div style={{ display: 'flex' }}>

              <Dialog
                open={mapDialog}
              >
                <DialogTitle>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5 style={{}}>
                      Select your preferred location
                    </h5>
                    <div style={{}}>
                      <TextField id="outlined-basic" label="radius" variant="outlined" value={rad}
                        onChange={handleRadiusCHange} />
                    </div>
                  </div>
                </DialogTitle>

                <DialogContent>

                  <center style={{ width: '100%' }}>
                    <MapComponent
                      ref={mapComponentRef}
                      height="50vh"
                      width="40vw"
                      initLocation={{ lat: 23.7983, lng: 90.3876 }}
                      initZoom={12}
                      mapId="post-map"
                    />
                  </center>

                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setMapDialog(false)
                      setMapData(null)
                    }}
                    color='error'
                  >
                    Close
                  </Button>
                  <Button
                    onClick={dialogSaveClick}
                    color='primary'
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              <MyDrawer style={{ transform: 'translateY(0px)' }} variant="permanent" anchor="left">
                <div style={{ padding: '10px' }}>
                  <center style={{ marginTop: '10px' }}>
                    <StyledImageButton variant="contained" color="primary" onClick={() => {
                      setMapDialog(true)
                    }} >
                      {/* No content inside the button */}
                    </StyledImageButton>
                  </center>
                  <Divider style={{ marginTop: '20px', marginBottom: '10px' }} />
                  <Typography variant='body2' color='body2'>Filter:</Typography>
                  <CheckboxMenu options={options} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                  <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                  <Typography variant='body2' color='body2'>Platform:</Typography>
                  <CheckboxMenu options={options2} selectedItems={selectedItems2} setSelectedItems={setSelectedItems2} />
                  <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant='contained'
                        startIcon={<DoneAllIcon/>}
                        onClick={applyFilter}>Apply</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        
                        color='error'
                        fullWidth
                        onClick={resetFilter}>Reset</Button>

                    </Grid>
                  </Grid>

                </div>

              </MyDrawer>
              <Content>


                <div> {/* Adjust margin based on your content */}


                  <div style={{ width: 'calc(100vw - 240px)', transform: 'translateX(-50px)' }}>
                    <Grid container spacing={1} >
                      {tutors.map((tutor) => (
                        <Grid item xs={4}>
                          <CardComponent key={tutor.teacher_id} data={tutor} filtered={selectedRef.current} isTutor={true} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>

                </div>

              </Content>
            </div>
          </div>
        )}
      </div>

    );
}

export default StudentFilter;