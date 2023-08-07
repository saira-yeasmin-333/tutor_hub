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

    getReviews=async () =>{
        var result=await reviewRepository.getAll()
        return result
    }
}

module.exports = {ReviewService}
