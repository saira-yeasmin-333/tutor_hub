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

    delete = async (locationId) =>{
        try {
            const deleteResult = await locationRepository.delete(locationId);
            return deleteResult; // You can return a success/failure boolean or any relevant information
        } catch (error) {
            console.error('Error deleting location:', error);
            throw error; // Rethrow the error to be handled at the higher level
        }
    }
}

module.exports = {LocationService}
