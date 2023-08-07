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

    
    
}

module.exports = {AuthService}