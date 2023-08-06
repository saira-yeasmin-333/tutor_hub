const { Subject } = require('../models/models');
const Repository = require('./database').Repository


class SubjectRepository extends Repository {
    constructor() {
        super();
    }

    getAll = async () => {
        var subjects = await Subject.findAll();
        return subjects
    }

    create = async (data) => {
        try {
            const subject = await Subject.create({
                sub_name: data.sub_name,
            })
            return subject
        } catch (e) {
            console.log('here2')
            console.log(e)
        }

    }

}

module.exports = { SubjectRepository }