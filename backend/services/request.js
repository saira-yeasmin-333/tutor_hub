const Service = require('./base').Service;
const RequestRepository=require('../repository/request').RequestRepository

const requestRepository=new RequestRepository()

class RequestService extends Service {
    constructor() {
        super();
    }

    sendRequest=async request=>{
        var result=await requestRepository.sendRequest(request)
        return result
    }

    getRequests=async (data) =>{
        var result=await requestRepository.getRequests(data)
        console.log('result in service: ',result)
        return result
    }

    approveRequest=async data=>{
        var res=await requestRepository.approveRequest(data)
        return res
    }
}

module.exports = {RequestService}
