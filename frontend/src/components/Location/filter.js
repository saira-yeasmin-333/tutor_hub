import React, { useState, useEffect, useRef } from 'react';
import { Drawer, CssBaseline , styled, Button, Grid} from '@mui/material';
import CheckboxMenu from '../common/checkbox'
import { setLoading, showError } from '../../App';
import axios from 'axios';
import CardComponent from '../common/card/CardComponent';
import { getAllPosts } from '../../actions/post'
import { calculateDistance } from '../common/distance';
import PrimarySearchAppBar from '../Appbar/appbar';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const MyDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  top: '64px',
  
});

// const Content = styled('div')(({ theme }) => ({
//   // flexGrow: 1,
//   // padding: theme.spacing(2),
//   // marginTop: '64px',
//   display: 'flex',
// }));

const Container = styled('div')({
  display: 'flex',
});

const Content = styled('div')({
  flexGrow: 1,
  padding: '16px', // Adjust padding as needed
  
});

const StyledImageButton = styled(Button)({
  width: '100px', // Set the desired button width
  height: '100px', // Set the desired button height
  padding: 0, // Remove default button padding
  background: 'url("https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg") center/cover', // Set image as background
});

const MyComponent = () => {
    const options = ['Location', 'budget'];
    const options2 = ['Physical', 'Online'];
    
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItems2, setSelectedItems2] = useState([]);

    const [Fav_location,setPreferredLocations]=useState([])

    const[posts,setPosts]=useState([])
    const selectedRef=useRef(false)
    const [all_posts,setAllPsts]=useState([])
    
    const [user, setUser] = useState(null);

    const [open, setOpen] = useState(true);

    const toggleDrawer = (isOpen) => () => {
      setOpen(isOpen);
    };

    const fetchLocations=async()=>{
      setLoading(true)
      var url=`http://localhost:5000/api/location`
      var res= await axios.get(url)
      if(res.data.success){
        console.log('success data')
          setPreferredLocations(res.data.data)
          
      }else{
        showError('failed to fetch data')
      }
      setLoading(false)
    }
  
  const fetchPosts=async()=>{
    setLoading(true)
    var res=await getAllPosts()
    if(res.success){
      console.log('here appeared')
      setPosts(res.data)
      setAllPsts(res.data)
    }
  }

  useEffect( () =>{
    axios
        .get(`http://localhost:5000/api/get-profile`,{headers:{authorization:'Bearer '+cookies.get('token')}})
        .then((response) => {
            setUser(response.data.data); // Set the fetched data to the state

            console.log('filter response : ',response.data.data)
        })
        .catch((error) => {
            console.error('Error fetching user profile:', error);
        });
    fetchPosts()
    console.log('posts: ',posts)
    
    fetchLocations()
  }, [])

  const handleClick = () => {
    selectedRef.current=true
    const filteredPosts2 = [];
    var dist=[]
    Fav_location.forEach(favLocation => {
      posts.forEach(post => {
        var distance = calculateDistance(
          favLocation.latitude,
          favLocation.longitude,
          post.latitude,
          post.longitude
        );

        // Replace 2 with your desired distance limit
        if (distance <= favLocation.radius) {
          filteredPosts2.push(post);
          const dist_obj={
            ...post,
            "my_address":favLocation.address,
            "post_address":post.address,
            "distance":distance
          }

          console.log('dist obj: ',dist_obj)

          dist.push(dist_obj)
        }
      });
    });
    dist=dist.slice().sort((a, b) => a.distance - b.distance);
    setPosts(dist)
  };


  const applyFilter = () => {
    var temp=[]
    selectedItems2.forEach(item=>{
      if(item==='Online'){
        console.log('here appeared')
        all_posts.forEach(p=>{
          if(p.platform==='online'){
            temp.push(p)
          }
        })
      }

      if(item==='Physical'){
        all_posts.forEach(p=>{
          console.log('here : ',p.platform)
          if(p.platform==='physical'){
            
            temp.push(p)
          }
        })
      }
    })

    if(selectedItems2.length===0){
      console.log('hi')
      temp=all_posts
    }
    selectedItems.forEach(item=>{
      if(item==='budget'){
        temp=temp.slice().sort((a, b) => b.budget- a.budget);
      }
    })

    setPosts(temp)

  };



  const resetFilter = () => {
    setSelectedItems([])
    setSelectedItems2([])
    selectedRef.current=false
    setPosts(all_posts)
  };


  if (!user) {
    return <div>Loading...</div>; // Display a loading message while fetching data
   }
  
  return (

    <div style={{ backgroundColor: '#BDCDF5', minHeight: '100vh' }}>
      <PrimarySearchAppBar type={user.type} />
      {!posts? (
      <p>Loading...</p>
     
        ) : (
        <Container>
          <CssBaseline />
            <MyDrawer variant="permanent" anchor="left">
            <StyledImageButton variant="contained" color="primary" onClick={handleClick} >
              {/* No content inside the button */}
            </StyledImageButton>
            <p>Filter</p>
            <CheckboxMenu options={options} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            <p>Platform</p>
            <CheckboxMenu options={options2} selectedItems={selectedItems2} setSelectedItems={setSelectedItems2} />
            <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={applyFilter}>Apply</Button>
            <Button onClick={resetFilter}>Reset</Button>
            </div>
          </MyDrawer> 

      <Content> 
        <Grid container spacing={1}>
          {posts.map((post) => (
            <Grid item xs={4}>
                <CardComponent key={post.id} data={post} filtered={selectedRef.current} isTutor={false}/>
            </Grid>
            ))}
        </Grid>

      </Content>
    </Container>
    )}
     </div>
    
  );
}

export default MyComponent;