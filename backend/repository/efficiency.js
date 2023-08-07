const { Efficiency } = require('../models/models');
var db = require('../models/models')
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

    insertEfficiency = async (data) => {
        try {
            const efficiency = await Efficiency.create({
                teacher_account_id: data.teacher_account_id,
                subject_id: data.subject_id
            })
            return efficiency
        } catch (e) {
            console.log('here2')
            console.log(e)
        }

    }

}

module.exports = { EfficiencyRepository }