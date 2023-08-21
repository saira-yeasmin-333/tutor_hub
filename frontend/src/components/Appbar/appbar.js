import { useState, useEffect, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../../assets/cap.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const cookies = new Cookies();
const teacher_pages = ['Home', 'Message', 'Grade', 'Chats'];
const student_pages = ['Home', 'Message', 'Review' , 'Post', 'Chats'];

const pageLinks = {
  home: '/filter', // Replace with actual route paths
  homestudent: '/student/filter',
  message: '/message',
  messagestudent: '/message',
  grade: '/submit-grade',
  reviewstudent: '/create-review', // Add more as needed
  poststudent: '/create-post',
  chats: '/teacher/request',
  chatsstudent: '/student/request'
  // ...
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar(data) {
  const type = data.type

  const notificationRef=useRef()

  const [notifications, setNotifications] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchornotificationEl, setAnchorNotificationEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(anchornotificationEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [imageUrls, setImageUrls] = useState(null);
  const [user, setUser] = useState(null);

  const fetchImage = async () => {
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
  };

  const fetchNotifications = async () => {
    if(!notificationRef.current){
      try {
        const response = await axios.get('http://localhost:5000/api/notification',{headers:{authorization:'Bearer '+cookies.get('token')}});
        console.log("response: ", response.data.notification.length)
        if(!notificationRef.current)setNotifications(response.data.notification);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch notifications initially
    fetchNotifications();
    fetchImage();

    // Set up interval to fetch notifications periodically
    const intervalId = setInterval(fetchNotifications, 5000*2); // Fetch every 5 seconds
    notificationRef.current=false
    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationMenuClose = () => {
    setAnchorNotificationEl(null);
    notificationRef.current=false
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogOut = () => {
    //Logging Out
    cookies.remove('token');
    window.location.href = '/signin';
  }

  const handleGotoProfile = () => {
    //handleGotoProfile
    window.location.href = '/get-profile';
  }

  const readAlldata=async ()=>{
   
    try{
      console.log('here come')
      console.log({headers:{authorization:'Bearer '+cookies.get('token')}})
      notificationRef.current=true
      var response=await axios.post('http://localhost:5000/api/notification/read',{},{headers:{authorization:'Bearer '+cookies.get('token')}});
      // console.log(response.success)
    }catch(e){
      console.log('hi')
      console.log(e)
    }
    
  }
  const handleNotificationClick = (event) => {
    console.log('icon is clicked')
    if(notifications.length>0){
      setAnchorNotificationEl(event.currentTarget);
    if (anchornotificationEl === null) {
      
      readAlldata();
      
    }else{
      notificationRef.current=false
    }
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  )
  const notificationId = 'primary-search-notification-menu';
  const renderNotificationMenu = (
    <Menu
      anchorEl={anchornotificationEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={notificationId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
    >
      {notifications.map((notification, index) => (
        <MenuItem key={index}>{notification.message}</MenuItem>
      ))}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ textAlign: 'left' }} // Align menu items to the left
    >
      
      <MenuItem onClick={handleNotificationClick}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p >Notifications</p>

      </MenuItem>
      <MenuItem onClick={handleGotoProfile}>
      {imageUrls && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="profile image"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleGotoProfile}
                  color="inherit"
                  sx={{ marginRight: 1 }}
                >
                  <img
                    src={imageUrls}
                    alt="Profile"
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  />
                </IconButton>
              )}
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const TutorHubText = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'cursive',
    // Add any additional styles you want
  }));
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
        <Toolbar>

          <img
            src={logo}
            alt="Logo"
            style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', padding: '10px' },  marginRight: 4 }}
          >
            <TutorHubText variant="h6">TutorHub</TutorHubText>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user !== null && (
              user.role === 'teacher'
                ? teacher_pages.map((page) => (
                    <Link
                      key={page}
                      to={pageLinks[page.toLowerCase()]}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: 'white',
                          display: 'block',
                          color: 'black', // Change color to gray
                          '&:hover': {
                            backgroundColor: '#CC9999', // Darker shade of #EEB4B4
                          },
                        }}
                      >
                        {page}
                      </Button>
                    </Link>
                  ))
                : student_pages.map((page) => (
                    <Link
                      key={page}
                      to={pageLinks[page.toLowerCase()+"student"]}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{
                          my: 2,
                          color: 'white',
                          display: 'block',
                          color: 'black', // Change color to gray
                          '&:hover': {
                            backgroundColor: '#CC9999', // Darker shade of #EEB4B4
                          },
                        }}
                      >
                        {page}
                      </Button>
                    </Link>
                  ))
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              onClick={handleNotificationClick}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx = {{'&:hover': {
                backgroundColor: '#CC9999', // Darker shade of #EEB4B4
              },}}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon style={{ color: 'black' }} />
              </Badge>
              </IconButton>
              {imageUrls && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="profile image"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleGotoProfile}
                  color="inherit"
                  sx={{ marginRight: 1, '&:hover': {
                    backgroundColor: '#CC9999', // Darker shade of #EEB4B4
                  }, }}
                >
                  <img
                    src={imageUrls}
                    alt="Profile"
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  />
                </IconButton>
              )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none', borderRight: '20p', '&:hover': {
                            backgroundColor: '#CC9999', // Darker shade of #EEB4B4
                          }, } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: 'black' }} />
            </IconButton>
          </Box>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2,
              '&:hover': {
                backgroundColor: '#CC9999', // Darker shade of #EEB4B4
              }, }}
          >
            <MenuIcon onClick={handleProfileMenuOpen} style={{ color: 'black' }} />
          </IconButton>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
    </Box>
  );
}

