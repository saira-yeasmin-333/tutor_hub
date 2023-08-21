const Service = require('./base').Service;
const ReviewRepository=require('../repository/review').ReviewRepository

const reviewRepository=new ReviewRepository()

class ReviewService extends Service {
    constructor() {
        super();
    }

    create=async review=>{
        var result=await reviewRepository.create(review)
        return result
    }

    getReviews=async (teacherId) =>{
        var result=await reviewRepository.getReviews(teacherId)
        return result
    }

    getRating=async (teacherId) =>{
        var result=await reviewRepository.getRating(teacherId)
        return result
    }
}

module.exports = {ReviewService}