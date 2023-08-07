const Controller = require("./base").Controller;
const TeacherService = require("../services/teacher").TeacherService

const teacherService = new TeacherService()

class TeacherController extends Controller {
    constructor() {
        super()
    }

    create = async (req, res) => {
        console.log(req.body)
        var result = await teacherService.create(req.body)
        return res.json({
            success: true,
            data: result
        })
    }

    getTeachers = async (req, res) => {
        var result = await teacherService.getTeachers()
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    fetchTutor=async (req,res)=>{
        var result=await teacherService.fetchTutor(req.params.id)
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = { TeacherController }