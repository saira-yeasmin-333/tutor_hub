const {Account} = require('../models/models');
const Repository=require('./database').Repository
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
            const account = await Account.create({
                name:user.name,
                role:user.role,
                phone:user.phone,
                email:user.email,
                image:user.image,
                password:bcrypt.hashSync(user.password, 10)
            })
            return account
        }
        catch(e){
            console.log(e)
        }
    }

    signin=async data=>{
        const account=Account.findAll({
            where: {
              email: data.email
            }
        });

        if(account){
            
        }
    }

    

}

module.exports = {AccountRepository}