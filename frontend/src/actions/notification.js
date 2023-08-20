import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const sendNotificationCall=async data=>{
    try{
        var res=await axios.post('http://localhost:5000/api/notification', data,{headers:{authorization:'Bearer '+cookies.get('token')}})
        return res.data
    }catch(e){
        console.log(e)
        return null
    }
}