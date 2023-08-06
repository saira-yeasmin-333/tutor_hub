const Service = require('./base').Service;
const SubjectRepository = require('../repository/subject').SubjectRepository

const subjectRepository = new SubjectRepository()

class SubjectService extends Service {
    constructor() {
        super();
    }

    create = async (subject) => {
        var result = await subjectRepository.create(subject)
        console.log(result)
        return result
    }

    getSubjects = async () => {
        var result = await subjectRepository.getAll()
        return result
    }
}

module.exports = { SubjectService }
