import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const getAllPosts=async()=>{
    try{
        var res=await axios.get('http://localhost:5000/api/post')
        return res.data 
    }catch(e){
        console.log('here error occured')
        console.log(e)
        return null
    }
}

export const createPost=async(data)=>{
    try{
        var res=await axios.post('http://localhost:5000/api/post',data,{headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data 
    }catch(e){
        console.log('here error occured')
        console.log(e)
        return null
    }
}