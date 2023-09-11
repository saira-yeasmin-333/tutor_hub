const Service = require('./base').Service;
const bcrypt=require('bcryptjs')
const JWT = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const { sq } = require('../repository/database');
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

    getAllUsers=async ()=>{
        var accounts=await accountRepository.getAll()
        return accounts
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

        var graph

        if(result.get({plain:true})['role']==='teacher'){
            teacherResult=await teacherRepository.fetchTutor(id)
            combined={...teacherResult.get({ plain: true }),...result.get({ plain: true })}
            var res=await sq.query(`select count(r.review_id) as n, r.rating as rating from reviews r, teachers t where r.teacher_id=t.teacher_id and t.account_id=${id} group by rating`)
            var arr=res[0]

    
            var labels = arr.map(a=>a.rating)
            //var labels = []

            const data = {
            labels,
            datasets: [
                {
                label: 'Review Count',
                data: arr.map(a=>(a.n)),
                backgroundColor: '#0090ff',
                }
            ],
            };

            graph=data
        }else{
            var res=await sq.query(`select sum(g.mark_received) as obtained,sum(g.total_marks) as total, s.sub_name as subject from grades g, subjects s where g.subject_id=s.id and g.student_id=${id} group by subject`)
            var arr=res[0]

    
            var labels = arr.map(a=>a.subject)
            //var labels = []

            const data = {
            labels,
            datasets: [
                {
                label: 'Grades in %',
                data: arr.map(a=>(a.obtained*100/a.total)),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                }
            ],
            };

            graph=data

            combined=combined.get({ plain: true })

        }
        
        // console.log('here teacher ',teacherResult)
        // console.log('here account ',result)
        

        return{
            success:true,
            data: {...combined,graph}
        }
    }
}

module.exports = {AuthService}