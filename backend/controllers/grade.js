const Controller = require("./base").Controller;
const GradeService = require("../services/grade").GradeService

const gradeService = new GradeService()

class GradeController extends Controller {
    constructor() {
        super()
    }

    create = async (req, res) => {
        var result = await gradeService.create(req.body)
        return res.json({
            success: true,
            data: result
        })
    }

    getGrades = async (req, res) => {
        const studentId = parseInt(req.body.account_id);
        console.log("testing grade for student id:");
        console.log(studentId)
        var result = await gradeService.getGrades(studentId)
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    getRating = async (req, res) => {
        const studentId = parseInt(req.body.student_id);
        var result = await gradeService.getRating(studentId)
        return res.status(200).json({
            success: true,
            data: result
        })
    }
}

module.exports = { GradeController }