const Controller = require("./base").Controller;
const RequestService=require("../services/request").RequestService

const requestService=new RequestService()

class RequestController extends Controller{
    constructor(){
        super()
    }

    sendRequest=async(req,res)=>{
        var result=await requestService.sendRequest(req.body)
        return res.json({
            success:true,
            Request:result
        })
    }

    cntReq=async (req,res)=>{
        var result=await requestService.cntReq(req.body.account_id)
        return res.status(200).json({
            success:true,
            data:result
        })
    }

    getRequests=async (req,res)=>{
        var result=await requestService.getRequests(req.body.account_id)
        console.log('res, id: ',req.body.account_id,result)
        return res.status(200).json({
            success:true,
            data:result
        })
    }

    getApprovedRequests=async (req,res)=>{
        var result=await requestService.getApprovedRequests(req.body.account_id)
        console.log('res, id: ',req.body.account_id,result)
        return res.status(200).json({
            success:true,
            data:result
        })
    }
    

    approveRequest=async(req,res)=>{
        var result=await requestService.approveRequest(req.body)
        return res.json({
            success:true,
            result:result
        })
    }

    getMyStudents=async(req,res)=>{
        var result = await requestService.getMyStudents(req.body.account_id)
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = {RequestController}