const Controller = require("./base").Controller;
const AuthService=require("../services/auth").AuthService

const authService=new AuthService()

class AuthController extends Controller{
    constructor(){
        super()
    }

    signup=async(req,res)=>{
        console.log('controller arived')
        var result=await authService.signup(req.body)
        return res.status(200).json(result)
    }

    signin=async (req,res)=>{
        var result=await authService.signin(req.body)
        return res.status(200).json(result)
    }

    findById=async (req,res)=>{
        var result=await authService.findById(req.body.account_id)
        return res.status(200).json(result)
    }

    updateProfileImage=async(req,res)=>{
        var result=await authService.updateProfileImage(req.body);
        return res.json(result)
    }
    
}

module.exports = {AuthController}