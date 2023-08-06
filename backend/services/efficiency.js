const Service = require('./base').Service;
const EfficiencyRepository = require('../repository/efficiency').EfficiencyRepository

const efficiencyRepository = new EfficiencyRepository()

class EfficiencyService extends Service {
    constructor() {
        super();
    }

    getEfficiency = async (teacher_id) => {
        var result = await efficiencyRepository.getEfficiency(teacher_id)
        return result
    }

    insertEfficiency = async (efficiency) => {
        var result = await efficiencyRepository.insertEfficiency(efficiency)
        console.log(result)
        return result
    }
}

module.exports = { EfficiencyService }