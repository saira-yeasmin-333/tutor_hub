import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Location from './components/Location/location';
import SignIn from "./signin";
import Signup from "./signup";
import toast, { Toaster } from 'react-hot-toast';
import Filter from "./components/Location/filter";
import { useState } from 'react';
import { Rings } from 'react-loader-spinner';
import { Route, BrowserRouter , Routes } from 'react-router-dom';
import CreatePost from './pages/post/CreatePost';
import ProfilePage from "../pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import Notification from "./pages/notification";
import Requests from "./pages/StudentFilter";
import StudentFilter from "./pages/StudentFilter";

var showToast
var showError
var showSuccess
var setLoading

function App() {
  
  const [loading, setL] = useState(false)
  setLoading = setL

  const typeNo = 2;


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
           
           <Route path='/create-post' Component={CreatePost} >
            </Route>
            <Route path='/get-profile/' Component={ProfilePage} >
            </Route>
            <Route path='/create-review' Component={ReviewPage}>
            </Route>
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

          <Route
            path="/notification"
            exact
            element={<Notification />}
          />

          <Route
            path="/student/filter"
            exact
            element={<StudentFilter />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
export {showToast,setLoading,showSuccess,showError}

