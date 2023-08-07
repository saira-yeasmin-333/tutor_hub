const Service = require('./base').Service;
const bcrypt=require('bcryptjs')
const JWT = require('jsonwebtoken');
const AccountRepository=require('../repository/auth').AccountRepository

const accountRepository=new AccountRepository()

class AuthService extends Service {
    constructor() {
        super();
    }

    signup=async user=>{
        var lookup=await accountRepository.findUser(user.email)
        console.log('lookup in service ,',lookup)
        if(lookup.length>0){
            return {
                success:false,
                error:'user already exists'
            }
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password,salt)
        var result=await accountRepository.create({...user,password:hashPassword})
        return {
            success:true,
            data:result
        }
    }
    signin=async user=>{
        const checkuser=await accountRepository.findUser(user.email)
        if(checkuser.length===0){
            return {
                success:false,
                error:'user does not exist'
            }
        }
        const isValid=await bcrypt.compare(user.password,checkuser[0].password)
        if(!isValid)
            return{
                success:false,
                error:'wrong password'
            }
        // generate token
        const token = JWT.sign(checkuser[0].get({ plain: true }), "tutor hub");        
        
        return{
            success:true,
            token
        }
    }

    findById=async (id)=>{
        const result=await accountRepository.findById(id)
        return{
            success:true,
            data:result
        }
    }
}

module.exports = {AuthService}