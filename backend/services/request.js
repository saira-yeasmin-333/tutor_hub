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

    cntReq=async data=>{
        var result=await requestRepository.countRequest(data)
        return result
    }

    getRequests=async (data) =>{
        var result=await requestRepository.getRequests(data)
        console.log('result in service: ',result)
        return result
    }

    getApprovedRequests=async (data) =>{
        var result=await requestRepository.getApprovedRequests(data)
        console.log('result in service: ',result)
        return result
    }

    approveRequest=async data=>{
        var res=await requestRepository.approveRequest(data)
        return res
    }

    getMyStudents=async (data)=>{
        var res=await requestRepository.getMyStudents(data)
        return res
    }
}

module.exports = {RequestService}
