const Service = require('./base').Service;
const SMSRepository=require('../repository/sms').SMSRepository

const smsRepository=new SMSRepository()

class SMSService extends Service {
    constructor() {
        super();
    }

    sendSMS=async data=>{
        var result=await smsRepository.sendSMS(data)
        return result
    }
}

module.exports = {SMSService}
