const Service = require('./base').Service;
const LocationRepository=require('../repository/location').LocationRepository

const locationRepository=new LocationRepository()

class LocationService extends Service {
    constructor() {
        super();
    }

    create=async location=>{
        location['tutor_id']=location.teacher_id
        var result=await locationRepository.create(location)
        return result
    }

    getLocations=async () =>{
        var result=await locationRepository.getAll()
        return result
    }
}

module.exports = {LocationService}
