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