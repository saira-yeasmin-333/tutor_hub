
const {Account,Teacher} = require('../models/models');
const Repository = require('./database').Repository
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenExpiryDuration=86400

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

    updateProfileImage=async(data)=>{
        const res=Account.update(
            { image: data.url},
            { where: { account_id: data.account_id } }
        )
        return res
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
        var result=await Account.findByPk(data)
        return result
    }
    

}

module.exports = {AccountRepository}