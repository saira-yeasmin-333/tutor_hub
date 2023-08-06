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
}

module.exports = { EfficiencyService }