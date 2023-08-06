const { Efficiency, Subject } = require('../models/models');
const Repository = require('./database').Repository

class EfficiencyRepository extends Repository {
    constructor() {
        super();
    }

    getEfficiency = async account_id => {
        const subject = Efficiency.findAll({
            where: {
                
            }
        });
    }

}

module.exports = { AccountRepository }