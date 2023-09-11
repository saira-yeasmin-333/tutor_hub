const Service = require('./base').Service;
const GradeRepository=require('../repository/grade').GradeRepository
const AccountRepository=require('../repository/auth').AccountRepository

const gradeRepository=new GradeRepository()
const accountRepository=new AccountRepository()

class GradeService extends Service {
    constructor() {
        super();
    }

    create=async grade=>{
        var result=await gradeRepository.create(grade)
        return result
    }

    // getGrades=async (params) =>{

    //     var result=await gradeRepository.getAll(params)
    //     return result
    // }

    getGradesFromCreateReview= async(studentId,teacherId)=>{
        var result=await gradeRepository.getGradesFromCreateReview(studentId,teacherId)
        return result
    }

    getGradesById= async(studentId)=>{
        var result=await gradeRepository.getGradesById(studentId)
        return result
    }

    getRating= async(studentId)=>{
        var result=await gradeRepository.getRating(studentId)
        return result
    }

    updateGrade= async(grade)=>{
        var result=await gradeRepository.updateGrade(grade)
        return result
    }


}

module.exports = {GradeService}
