const Controller = require("./base").Controller;
const LocationService=require("../services/location").LocationService

const locationService=new LocationService()

class LocationController extends Controller{
    constructor(){
        super()
    }

    create=async(req,res)=>{
        var result=await locationService.create(req.body)
        return res.json({
            success:true,
            data:result
        })
    }

    getLocations=async (req,res)=>{
        var result=await locationService.getLocations()
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = {LocationController}