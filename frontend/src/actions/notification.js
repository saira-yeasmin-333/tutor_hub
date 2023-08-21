import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const sendNotificationCall=async data=>{
    try{
        var res=await axios.post('http://localhost:5000/api/notification', data,{headers:{authorization:'Bearer '+cookies.get('token')}})
        console.log('notification data: ',res.data)
        return res.data
    }catch(e){
        console.log(e)
        return null
    }
}

export const sendNotification=async(t,message)=>{
    const body={
      to:t,
      message:message,
      is_read:false
    }
    // console.log('bpdy : ',body)
    try{
      var res=await sendNotificationCall(body)
      // console.log(res)
      return res
    }catch(e){
      console.log(e)
        return null
    }
  }