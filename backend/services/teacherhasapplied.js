const Service = require('./base').Service;
const TeacherHasAppliedRepository=require('../repository/teacherhasapplied').TeacherHasAppliedRepository

const teacherhasappliedRepository=new TeacherHasAppliedRepository()

class TeacherHasAppliedService extends Service {
    constructor() {
        super();
    }

    create=async review=>{
        var result=await teacherhasappliedRepository.create(review)
        return result
    }

    getReviews=async (teacherId) =>{
        var result=await teacherhasappliedRepository.getReviews(teacherId)
        return result
    }

}

module.exports = {TeacherHasAppliedService}