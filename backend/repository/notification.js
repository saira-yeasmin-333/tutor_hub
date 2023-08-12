const { Notification } = require("../models/models");
const { Repository } = require("./database");
const axios = require('axios');

class NotificationRepository extends Repository {
    constructor() {
        super();
    }

    sendNotification=async (data)=>{
        data['timestamp']=parseInt(Date.now()/1000)
        const notification = await Notification.create(data)
        return notification
    }

    getNotifications=async(data)=>{
        const notifications = Notification.findAll({
            where: {
                to: data,
                is_read:false
            },
            order: [
                ['timestamp', 'DESC']
            ]
        });
        return notifications
    }

    readAllData=async data=>{
        console.log('in notification repo')
        const res=Notification.update(
            { is_read: true },
            { where: { to: data } }
        )
        return res
    }
}
module.exports = {NotificationRepository}