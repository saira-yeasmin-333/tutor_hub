import Dialog from "@mui/material/Dialog";
import { Rings } from 'react-loader-spinner';
import DialogContent from "@mui/material/DialogContent";
import {useState} from 'react'
import Location from './components/Location/location';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./signin";
import Signup from "./signup";
import toast, { Toaster } from 'react-hot-toast';
import Filter from "./components/Location/filter";


var showToast
var showError
var showSuccess
var setLoading

function App() {

  const [loading,setL]=useState(false)
  setLoading=setL

  showToast=message=>{
    toast(message)
  }

  showError=message=>{
    toast.error(message)
  }

  showSuccess=message=>{
    toast.success(message)
  }

  return (
    <div className="App">
      <Dialog open={loading}>
        <DialogContent>
          <Rings color="#00BFFF" height={80} width={80} />       
        </DialogContent>
      </Dialog>

      <Toaster
         position="top-right"
         reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            exact
            element={<SignIn />}
          />
          <Route
            path="/location"
            exact
            element={<Location />}
          />
          <Route
            path="/signup"
            exact
            element={<Signup />}
          />
          <Route
            path="/filter"
            exact
            element={<Filter />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export {showToast,setLoading,showSuccess,showError}