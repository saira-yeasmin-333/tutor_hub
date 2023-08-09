const { Repository } = require("./database");
const axios = require('axios');

class SMSRepository extends Repository {
    constructor() {
        super();
    }

    sendSMS=async (data)=>{
        var res=await axios.get(`http://66.45.237.70/api.php?username=01775568572&password=9K8SXRCB&number=${data.number}&message=${data.message}`)
        console.log('here we start :,',res,'here we end')
        if(res.status=200){
            return "success"
        }
        else{
            return "failed"
        }
        
    }

}

module.exports = {SMSRepository}