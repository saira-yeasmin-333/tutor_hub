const {Account} = require('../models/models');
const Repository=require('./database').Repository

class ProfileRepository extends Repository {
    constructor() {
        super();
    }

    getProfile= async (userId)=>{
        var account = await Account.findByPk(userId);
        return account;
    } 

}

module.exports = {ProfileRepository}