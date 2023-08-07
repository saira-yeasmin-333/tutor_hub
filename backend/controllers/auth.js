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
        var result=await authService.findById(req.params.id)
        return res.status(200).json(result)
    }

    
}

module.exports = {AuthController}