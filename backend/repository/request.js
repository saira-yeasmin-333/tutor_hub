const { Request ,Account} = require("../models/models");
const { Repository } = require("./database");

class RequestRepository extends Repository {
    constructor() {
        super();
    }

    sendRequest=async (data)=>{
        data['timestamp']=parseInt(Date.now()/1000)
        data['from']=data.account_id
        console.log('data sending request : ',data)
        const request = await Request.create(data)
        return request
    }

    countRequest=async(data)=>{
        const froms=await Request.findAll({
            where:{
                from:data,
            }, // Select only the 'to' attribute
            raw: true, // Return plain data objects
        })
        console.log('size: ',froms.length)
        return froms.length
        // var returnList=[]
        // teachers.map(t=>{
        //     var teacherObj=t.get({plain:'true'})
        //     if(teacherObj.budget<10000)
        //         returnList.push(teacherObj)
        // })
    }

    getRequests=async(data)=>{
        const froms=await Request.findAll({
            where:{
                to:data,
                status:"pending"
            }, // Select only the 'to' attribute
            raw: true, // Return plain data objects
        })
        console.log('froms: ',froms)
        const fromIds = froms.map(request => request.from);
        console.log('froms ID : ',fromIds)
        const res=await  Account.findAll({
            where: {
              account_id: fromIds // Find accounts with matching account IDs
            }
        })
        console.log('res: ',res)
        return res
    }


    getApprovedRequests=async(data)=>{
        const froms=await Request.findAll({
            where:{
                to:data,
                status:"approved"
            }, // Select only the 'to' attribute
            raw: true, // Return plain data objects
        })
        console.log('froms: ',froms)
        const fromIds = froms.map(request => request.from);
        console.log('froms ID : ',fromIds)
        const res=await  Account.findAll({
            where: {
              account_id: fromIds // Find accounts with matching account IDs
            }
        })
        console.log('res: ',res)
        return res
    }
    

    approveRequest=async(data)=>{
        const res=await Request.update(
            { status: data.status },
            { where: { to: data.account_id } }
        )
        return res
    }
}
module.exports = {RequestRepository}