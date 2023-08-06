import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
<<<<<<< HEAD

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
=======
import {useState} from 'react'

import CreatePost from './pages/CreatePost'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
>>>>>>> bec7cc1524325104f47422fe067709b6ca29d031

import ProfilePage from "./pages/ProfilePage";


var showToast
var setLoading

function App() {
  
  const typeNo = 2; 

  const typeNo = 2;

  const [loading, setL] = useState(false)
  setLoading = setL

  showToast = message => {
    toast.dark(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Router>
      <div className="App">
        <Dialog open={loading}>
          <DialogContent>
<<<<<<< HEAD
            <Rings color="#00BFFF" height={80} width={80} />
=======
            <Rings color="#00BFFF" height={80} width={80} />       
>>>>>>> bec7cc1524325104f47422fe067709b6ca29d031
          </DialogContent>
        </Dialog>

        <ToastContainer
<<<<<<< HEAD
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="content">
          <Routes>
            <Route path='/create-post/:id' Component={CreatePost} >
            </Route>
            <Route path='/get-profile/:id' Component={ProfilePage} >
=======
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        
        <div className="content">
          <Routes>
            <Route path ='/create-post/:id' Component={CreatePost} >
            </Route>
            <Route path ='/get-profile/:id' Component={ProfilePage} >
>>>>>>> bec7cc1524325104f47422fe067709b6ca29d031
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
export { setLoading, showToast };
