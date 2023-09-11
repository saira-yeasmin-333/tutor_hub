const Controller = require("./base").Controller;
const GradeService = require("../services/grade").GradeService

const gradeService = new GradeService()

class GradeController extends Controller {
    constructor() {
        super()
    }

    create = async (req, res) => {
        var result = await gradeService.create(req.body)
        console.log('after adding :', result)
        return res.json({
            success: true,
            data: result
        })
    }

    // getGrades=async (req,res)=>{

    //     var result=await gradeService.getGrades(req.query)
    //     return res.status(200).json({
    //         success:true,
    //         data:result
    //     })
    // }

    getGradesFromCreateReview = async (req, res) => {
        var result = await gradeService.getGradesFromCreateReview(req.body.student_id, req.body.teacher_id)
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    getGradesById = async (req, res) => {
        var result = await gradeService.getGradesById(req.body.account_id)
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    getRating = async (req, res) => {
        var result = await gradeService.getRating(req.body.account_id)
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    updateGrade = async (req, res) => {
        var result = await gradeService.updateGrade(req.body)
        return res.status(200).json({
            success: true,
            data: result
        })
    }
}

module.exports = { GradeController }