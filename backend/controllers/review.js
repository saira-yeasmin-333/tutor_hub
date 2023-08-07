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
        var result=await reviewService.getReviews()
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = {ReviewController}