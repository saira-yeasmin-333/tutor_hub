const Service = require('./base').Service;
const ProfileRepository=require('../repository/profile').ProfileRepository

const profileRepository=new ProfileRepository()

class ProfileService extends Service {
    constructor() {
        super();
    }

    getProfile=async (userId) =>{
        var result=await profileRepository.getProfile(userId)
        return result
    }
}

module.exports = {ProfileService}
