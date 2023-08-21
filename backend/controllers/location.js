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

    delete = async(req,res)=>{
        const locationIdToDelete = req.body.location_id; // Assuming you're passing the location ID in the request parameter

        try {
        const deleteResult = await locationService.delete(locationIdToDelete);
        if (deleteResult) {
            return res.json({
            success: true,
            message: "Location deleted successfully",
            });
        } else {
            return res.status(404).json({
            success: false,
            message: "Location not found",
            });
        }
        } catch (error) {
        console.error("Error deleting location:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the location",
        });
        }
    }
}

module.exports = {LocationController}