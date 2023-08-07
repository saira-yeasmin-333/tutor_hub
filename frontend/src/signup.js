import { useState } from "react";
import axios from 'axios';
import { setLoading, showError, showSuccess, showToast } from "./App";
import {useNavigate} from 'react-router-dom';
function Signup (){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'student', // Default role set to 'student'
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
        console.log('here ',formData);
        await axios.post('http://localhost:5000/api/signup',formData).then(res=>{  
     
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

    return (
        <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div>
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div>
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            </div>
            <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
    </div>
    )
}

export default Signup