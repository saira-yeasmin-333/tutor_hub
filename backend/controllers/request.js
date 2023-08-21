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

    getRequests=async (req,res)=>{
        var result=await requestService.getRequests(req.body.account_id)
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
}

module.exports = {RequestController}