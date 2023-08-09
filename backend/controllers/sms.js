const Controller = require("./base").Controller;
const SMSService=require("../services/sms").SMSService

const smsService=new SMSService()

class SMSController extends Controller{
    constructor(){
        super()
    }

    sendSMS=async(req,res)=>{
        var result=await smsService.sendSMS(req.body)
        return res.json({
            result
        })
    }

}

module.exports = {SMSController}