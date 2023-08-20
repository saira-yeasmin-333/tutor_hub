import { useState } from "react";
import axios from 'axios';
import { setLoading, showError, showSuccess, showToast } from "./App";
import { Container, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, Link } from '@mui/material';
import {useNavigate} from 'react-router-dom';

function Signup (){

    const [name, setName] = useState('');
    const [role, setRole] = useState('student');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isOnlineMedia, setIsOnlineMedia] = useState(false);
    const [isPhysicalMedia, setIsPhysicalMedia] = useState(false);
    const [budget, setBudget] = useState('');
    const [password, setPassword] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'student', // Default role set to 'student'
        isOnlineMedia: role === 'tutor' ? isOnlineMedia : undefined,
        isPhysicalMedia: role === 'tutor' ? isPhysicalMedia : undefined,
        budget: role === 'tutor' ? parseFloat(budget) : undefined,

    })
    const history=useNavigate()
    
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform signup logic here, e.g., send the form data to a backend server
        const post_body={
          name,
          phone,
          email,
          role,
          password,
          onlineMedia:isOnlineMedia,
          physicalMedia:isPhysicalMedia,
          budget,
          subjectIdsToAssociate:selectedSubjects
        }

        console.log('here ',post_body);
        await axios.post('http://localhost:5000/api/signup',post_body).then(res=>{  
     
        if(!res.data.success){
            showError(res.data.error)
        }else{
            showSuccess("Successfully Registered")
            history('/signin')
        }

        }).catch(err=>{
            console.log(err)
            switch(err.response.status){
                case 409:
                    showToast('User already exists')
                    break
                case 500:
                    showToast('Internal server error')
                    break
                default:
                    showToast('Connectvity problem')
            }
        
        })
    };

    const handleSubjectChange = (e) => {
      const subjectId = parseInt(e.target.value);
      if (e.target.checked) {
        setSelectedSubjects([...selectedSubjects, subjectId]);
      } else {
        setSelectedSubjects(selectedSubjects.filter((id) => id !== subjectId));
      }
    };

    return (
      <Container component="main" maxWidth="xl" sx={{ width: "100%", backgroundColor: "#c6d9ec", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container component="main" maxWidth="sm" sx={{ width: "100%", backgroundColor: "#c6d9ec", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            backgroundColor: "#c6d9ec",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ color: "#007bff" }}>
              Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: {
                    color: '#ffffff', // Replace with your desired text color
                    borderColor: '#ffffff', // Replace with your desired border color
                  },
                }}
                sx={{
                  backgroundColor: '#eeb4b4', // Replace with your desired background color
                }}
                InputLabelProps={{
                  style: {
                    color: 'white', // Label text color
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="role"
                label="Role"
                select
                SelectProps={{
                  native: true,
                }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                
                sx={{
                  backgroundColor: '#eeb4b4', // Replace with your desired background color
                }}
              >
                <option value="student">Student</option>
                <option value="teacher">Tutor</option>
              </TextField>

              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  style: {
                    color: '#ffffff', // Replace with your desired text color
                    borderColor: '#ffffff', // Replace with your desired border color
                  },
                }}
                sx={{
                  backgroundColor: '#eeb4b4', // Replace with your desired background color
                }}
                InputLabelProps={{
                  style: {
                    color: 'white', // Label text color
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: {
                    color: '#ffffff', // Replace with your desired text color
                    borderColor: '#ffffff', // Replace with your desired border color
                  },
                }}
                sx={{
                  backgroundColor: '#eeb4b4', // Replace with your desired background color
                }}
                InputLabelProps={{
                  style: {
                    color: 'white', // Label text color
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {
                    color: '#ffffff', // Replace with your desired text color
                    borderColor: '#ffffff', // Replace with your desired border color
                  },
                }}
                sx={{
                  backgroundColor: '#eeb4b4', // Replace with your desired background color
                }}
                InputLabelProps={{
                  style: {
                    color: 'white', // Label text color
                  },
                }}
              />

              {role === 'teacher' && (
                <div>
                  <FormControlLabel
                    control={<Checkbox value={isOnlineMedia} onChange={() => setIsOnlineMedia(!isOnlineMedia)} />}
                    label="Online Media"
                  />

                  <FormControlLabel
                    control={<Checkbox value={isPhysicalMedia} onChange={() => setIsPhysicalMedia(!isPhysicalMedia)} />}
                    label="Physical Media"
                  />

                  <div style={{ display: 'flex' }}>
                    <div>
                      <FormControlLabel
                        control={<Checkbox value="1" checked={selectedSubjects.includes(1)} onChange={handleSubjectChange} />}
                        label="Biology"
                      />
                      <FormControlLabel
                        control={<Checkbox value="2" checked={selectedSubjects.includes(2)} onChange={handleSubjectChange} />}
                        label="Physics"
                      />
                      <FormControlLabel
                        control={<Checkbox value="3" checked={selectedSubjects.includes(3)} onChange={handleSubjectChange} />}
                        label="Math"
                      />
                      <FormControlLabel
                        control={<Checkbox value="4" checked={selectedSubjects.includes(4)} onChange={handleSubjectChange} />}
                        label="Chemistry"
                      />
                    </div>
                  </div>

                  <TextField
                    margin="normal"
                    fullWidth
                    name="budget"
                    label="Budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    InputProps={{
                      style: {
                        color: '#ffffff', // Replace with your desired text color
                        borderColor: '#ffffff', // Replace with your desired border color
                      },
                    }}
                    sx={{
                      backgroundColor: '#eeb4b4', // Replace with your desired background color
                    }}
                    InputLabelProps={{
                      style: {
                        color: 'white', // Label text color
                      },
                    }}
                  />
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#007bff", color: "#fff" }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Container>  
      </Container>  
    )
}

export default Signup