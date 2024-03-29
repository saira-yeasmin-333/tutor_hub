import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const getAllTutors=async()=>{
    try{
        var res=await axios.get('http://localhost:5000/api/teachers')
        return res.data 
    }catch(e){
        console.log('here error occured')
        console.log(e)
        return null
    }
}

export const getAllTutorsWithParams=async(params)=>{
    try{
        var res=await axios.get(`http://localhost:5000/api/teachers?budget=${params.budget}&budgetType=${params.budgetType}`)
        return res.data 
    }catch(e){
        console.log('here error occured')
        console.log(e)
        return null
    }
}

export const getRole=async()=>{
    try{
        var res=await axios.get('http://localhost:5000/api/role',{headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data 
    }catch(e){
        console.log('here error occured')
        console.log(e)
        return null
    }
}

export const getTeachersWithName=async()=>{
    try{
        var res=await axios.get('http://localhost:5000/api/teachers/name',{headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data 
    }catch(e){
        console.log('here error occured')
        console.log(e)
        return null
    }
}