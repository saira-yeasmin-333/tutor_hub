const Controller = require("./base").Controller;
const NotificationService=require("../services/notification").NotificationService

const notificationService=new NotificationService()

class NotificationController extends Controller{
    constructor(){
        super()
    }

    send=async(req,res)=>{
        var result=await notificationService.send(req.body)
        return res.json({
            success:true,
            notification:result
        })
    }

    getNotifications=async (req,res)=>{
        var result=await notificationService.getNotifications(req.body.account_id)
        return res.status(200).json({
            success:true,
            notification:result
        })
    }

    readAllData=async(req,res)=>{
        var result=await notificationService.readAlldata(req.body.account_id)
        return res.json({
            success:true,
        })
    }
}

module.exports = {NotificationController}