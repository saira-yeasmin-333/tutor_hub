const Service = require('./base').Service;
const bcrypt=require('bcryptjs')
const JWT = require('jsonwebtoken');
const AccountRepository=require('../repository/auth').AccountRepository
const TeacherRepository=require('../repository/teacher').TeacherRepository
const LocationRepository=require('../repository/location').LocationRepository

const accountRepository=new AccountRepository()
const teacherRepository=new TeacherRepository()
const locationRepository=new LocationRepository()

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
        var teacherResult=null
        var encode=checkuser[0].get({ plain: true })
        if(checkuser[0].role==='teacher'){
            teacherResult=await teacherRepository.fetchTutor(checkuser[0].account_id)
            encode={...checkuser[0].get({ plain: true }),...teacherResult.get({plain:true})}
        }
        // generate token
        const token = JWT.sign(encode, process.env.JWT_SECRET_KEY);        
        
        return{
            success:true,
            token
        }
    }

    updateProfileImage=async data=>{
        const res=await accountRepository.updateProfileImage(data)
        return res
    }

    findById=async (id)=>{
        const result=await accountRepository.findById(id)
        var  teacherResult=null
        var combined=result
        if(result.get({plain:true})['role']==='teacher'){
            teacherResult=await teacherRepository.fetchTutor(id)
            combined={...teacherResult.get({ plain: true }),...result.get({ plain: true })}
        }
        
        console.log('here teacher ',teacherResult)
        console.log('here account ',result)
        

        return{
            success:true,
            data: combined
        }
    }
}

module.exports = {AuthService}