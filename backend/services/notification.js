const Service = require('./base').Service;
const NotificationRepository=require('../repository/notification').NotificationRepository

const notificationRepository=new NotificationRepository()

class NotificationService extends Service {
    constructor() {
        super();
    }

    send=async notification=>{
        var result=await notificationRepository.sendNotification(notification)
        return result
    }

    getNotifications=async (data) =>{
        var result=await notificationRepository.getNotifications(data)
        return result
    }

    readAlldata=async data=>{
        var res=await notificationRepository.readAllData(data)
        return res
    }
}

module.exports = {NotificationService}
