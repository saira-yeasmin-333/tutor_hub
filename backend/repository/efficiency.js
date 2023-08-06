const { Efficiency } = require('../models/models');
const Repository = require('./database').Repository

class EfficiencyRepository extends Repository {
    constructor() {
        super();
    }

    getEfficiency = async teacher_id => {
        const subjects = Efficiency.findAll({
            where: {
                teacher_account_id: teacher_id,
            }
        });
    }

}

module.exports = { EfficiencyRepository }