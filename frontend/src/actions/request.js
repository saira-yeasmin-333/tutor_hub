import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const sendRequest=async data=>{
    try{
        var res=await axios.post('http://localhost:5000/api/request', data,{headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data
    }catch(e){
        console.log(e)
        return null
    }
}

export const getAllRequest=async data=>{
    try{
        var res=await axios.get('http://localhost:5000/api/request', {headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data
    }catch(e){
        console.log(e)
        return null
    }
}

export const getCountReq=async data=>{
    try{
        var res=await axios.get('http://localhost:5000/api/request/count', {headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data
    }catch(e){
        console.log(e)
        return null
    }
}

export const approveRequest=async data=>{
    try{
        var res=await axios.post('http://localhost:5000/api/request/approve', data,{headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data
    }catch(e){
        console.log(e)
        return null
    }
}