const {PreferredLocation} = require('../models/models');
const Repository=require('./database').Repository


class LocationRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var locations = await PreferredLocation.findAll();
        return locations
    }

    create=async param=>{
        try{
            const location = await PreferredLocation.create({
                latitude:param.latitude,
                longitude:param.longitude,
                radius:param.radius,
                tutor_id:param.tutor_id,
                address:param.address
            })
            return location
        }catch(e){
            console.log(e)
        }

    }


}

module.exports = {LocationRepository}