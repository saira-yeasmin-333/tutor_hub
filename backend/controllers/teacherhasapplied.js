const Controller = require("./base").Controller;
const TeacherHasAppliedService=require("../services/teacherhasapplied").TeacherHasAppliedService

const teacherhasappliedService=new TeacherHasAppliedService()

class TeacherHasAppliedController extends Controller{
    constructor(){
        super()
    }

    create=async(req,res)=>{
        var result=await teacherhasappliedService.create(req.body)
        return res.json({
            success:true,
            data:result
        })
    }

    getReviews=async (req,res)=>{
        const teacherId = parseInt(req.body.teacher_id);
        console.log("testing review for teacher id:");
        console.log(teacherId)
        var result=await teacherhasappliedService.getReviews(teacherId)
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = {TeacherHasAppliedController}