import { useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import './signin.css'
import { setLoading, showError, showToast } from "./App";
import {useNavigate} from 'react-router-dom';

const cookies = new Cookies();

const COOKIE_AGE=31536000

const checkAuth=()=>{
    return !(cookies.get('token')===undefined || cookies.get('token')===null)
}

const logout=()=>{
    cookies.remove('token',{ path: '/' })
}

function SignIn(){
    const history=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignIn = async () => {
        try {
            setLoading(true)
            var res=await axios.post('http://localhost:5000/api/signin', {email,password});
            console.log(res.data)
            setLoading(false)
            if(res.data.success){
                cookies.set('token',res.data.token,{ path: '/', maxAge: COOKIE_AGE }) //setting token
                history('/location')
            }else{
                showError(res.data.error)
            }

            // Successful sign-in. You can redirect the user or perform other actions here.
            } catch (error) {
                setLoading(false)
                showToast(error.error)
            console.error('Error signing in:', error.message);
        // Handle sign-in error here.
        }
    }
    return(
        <div>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}
export default SignIn
export {checkAuth,logout}