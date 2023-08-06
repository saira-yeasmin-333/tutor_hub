import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TeacherProfile from "./pages/TeacherProfile";

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
        <div className="content">
          <Routes>
            <Route path='/teacher-profile/:id' Component={TeacherProfile}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
export { setLoading, showToast };