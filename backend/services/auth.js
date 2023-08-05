const Service = require('./base').Service;
const jwt_decode = require('jwt-decode');
const JWT = require('jsonwebtoken');
const AccountRepository=require('../repository/auth').AccountRepository

const accountRepository=new AccountRepository()

class AuthService extends Service {
    constructor() {
        super();
    }

    signup=async user=>{
        var result=await accountRepository.create(user)
        console.log(result)
        return result
    }

    googleLogin=async ({credential})=>{
        return {success:true}
        // try{
        //     var userData= jwt_decode(credential)
        //     var findQuery= `SELECT * FROM auth WHERE gmail=$1 and type=$2`
        //     var findParams=[userData.email,constants.userTypeMapping.USER_TYPE_REGULAR]
        //     var findResult=await this.query(findQuery,findParams)
        //     var tokenObject
        //     if(findResult.data.length===0){
        //         var timestamp=parseInt(Date.now()/1000)
        //         var insertQuery= `
        //             INSERT INTO auth (gmail,name,image,type,joined_at,last_login) 
        //             VALUES ($1,$2,$3,$4,$5,$6)
        //             RETURNING id`
        //         var insertParams=[userData.email,userData.name,userData.picture,constants.userTypeMapping.USER_TYPE_REGULAR,timestamp,timestamp]
        //         var insertResult=await this.query(insertQuery,insertParams)
        //         tokenObject={
        //             id:insertResult.data[0].id,
        //             name:userData.name,
        //             gmail:userData.email,
        //             image:userData.picture,
        //             type:constants.userTypeMapping.USER_TYPE_REGULAR,
        //             joined_at:timestamp,
        //             last_login:timestamp
        //         }
        //     }
        //     else tokenObject=findResult.data[0]
        //     const token=JWT.sign(tokenObject, process.env.JWT_SECRET);
        //     return {success:true,token}
        // }catch(err){
        //     return {success:false}
        // }
    }
}

module.exports = {AuthService}
