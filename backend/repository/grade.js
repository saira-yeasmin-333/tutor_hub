const { Grade, Account } = require('../models/models');
const Repository = require('./database').Repository


class GradeRepository extends Repository {
    constructor() {
        super();
    }

    getGrades = async (studentId) => {
        console.log('here data appeared: ', studentId)
        try {
            var grades = await Grade.findAll({
                where: {
                    student_id : studentId
                }
            });
            console.log("testing grade")
            console.log(grades)
            return grades
        } catch (e) {
            console.log('error: ', e)
        }
    }

    create = async grade => {
        try {
            console.log('grade :',grade)
            grade['timestamp'] = parseInt(Date.now() / 1000)
            const create_grade = await Grade.create(grade)
            return create_grade
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = { GradeRepository }