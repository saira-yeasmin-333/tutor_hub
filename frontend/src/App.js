import Dialog from "@mui/material/Dialog";
import { Rings } from 'react-loader-spinner';
import DialogContent from "@mui/material/DialogContent";
import { ToastContainer, toast } from 'react-toastify';
import {useState} from 'react'

import CreatePost from './pages/CreatePost'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import PrimarySearchAppBar from "./components/Appbar/appbar";

var showToast
var setLoading

function App() {

  const [loading,setL]=useState(false)
  setLoading=setL

  showToast=message=>{
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
            <Rings color="#00BFFF" height={80} width={80} />       
          </DialogContent>
        </Dialog>

        <ToastContainer
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
        <PrimarySearchAppBar/>
        <div className="content">
          <Routes>
            <Route path ='/create-post/:id' Component={CreatePost} >
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
export {showToast,setLoading}