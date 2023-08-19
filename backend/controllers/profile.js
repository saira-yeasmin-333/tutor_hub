const Controller = require("./base").Controller;
const ProfileService=require("../services/profile").ProfileService

const profileService=new ProfileService()

class ProfileController extends Controller{

    constructor(){
        super()
    }

    
    getProfile=async (req,res)=>{
        const userId = parseInt(req.body.account_id);
        var result=await profileService.getProfile(userId)
        return res.status(200).json({
            success:true,
            data:result
        })
    }

}

module.exports = {ProfileController}