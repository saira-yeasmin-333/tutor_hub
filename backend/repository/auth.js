const {Account} = require('../models/models');
const Repository=require('./database').Repository

class AccountRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var accounts = await Account.findAll();
        return accounts
    }

    create=async user=>{
        try{
            const account = await Account.create(user)
            return account
        }catch(e){
            console.log('error creating account: ',e)
        }

        
    }

    findUser=async email=>{
        console.log('email: ',email)
        var result=await Account.findAll({
            where:{
                email:email
            }
        })
        return result
    }

    signin=async data=>{
        var result=await Account.findAll({
            where:{
                email:data.email,
                password:data.password
            }
        })
        return result
    }

    findById=async data=>{
        console.log('in repo ',typeof data)
        var result=await Account.findByPk(data)
        return result
    }
    

}

module.exports = {AccountRepository}