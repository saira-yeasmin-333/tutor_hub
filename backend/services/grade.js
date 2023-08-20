const Service = require('./base').Service;
const GradeRepository = require('../repository/grade').GradeRepository

const gradeRepository = new GradeRepository()

class GradeService extends Service {
    constructor() {
        super();
    }

    create = async grade => {
        var result = await gradeRepository.create(grade)
        return result
    }

    getGrades = async (studentId) => {
        var result = await gradeRepository.getGrades(studentId)
        return result
    }
}

module.exports = { GradeService }