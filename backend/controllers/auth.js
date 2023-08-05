const Controller = require("./base").Controller;
const AuthService=require("../services/auth").AuthService

const authService=new AuthService()

class AuthController extends Controller{
    constructor(){
        super()
    }

    signup=async(req,res)=>{
        console.log('hi')
        var result=await authService.signup(req.body)
        console.log(result)
        return res.json({
            success:true,
            data:result
        })
    }

    googleLogin=async (req,res)=>{
        var result=await authService.googleLogin(req.body)
        return res.status(200).json({
            success:result.success,
            token:result.success?result.token:null
        })
    }
}

module.exports = {AuthController}