const Controller = require("./base").Controller;
const ReviewService=require("../services/review").ReviewService

const reviewService=new ReviewService()

class ReviewController extends Controller{
    constructor(){
        super()
    }

    create=async(req,res)=>{
        var result=await reviewService.create(req.body)
        return res.json({
            success:true,
            data:result
        })
    }

    getReviews=async (req,res)=>{
        const teacherId = parseInt(req.body.teacher_id);
        console.log("testing review for teacher id:");
        console.log(teacherId)
        var result=await reviewService.getReviews(teacherId)
        return res.status(200).json({
            success:true,
            data:result
        })
    }

    getRating=async (req,res)=>{
        const teacherId = parseInt(req.body.teacher_id);
        var result=await reviewService.getRating(teacherId)
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = {ReviewController}