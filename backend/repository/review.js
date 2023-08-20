const {Review,Account} = require('../models/models');
const Repository=require('./database').Repository


class ReviewRepository extends Repository {
    constructor() {
        super();
    }

    getReviews=async (teacherId)=>{
        console.log('here data appeared: ',teacherId)
        try{
            var reviews = await Review.findAll({
                where:{
                    teacher_id:teacherId
                },include:{
                    model:Account
                }
            });
            console.log("testing review")
            console.log(reviews)
            return reviews
        }catch(e){
            console.log('error: ',e)
        }
    }

    create=async review=>{
        try{
            review['student_id']=review.account_id
            review['timestamp']=parseInt(Date.now()/1000)
            const create_review = await Review.create(review)
            return create_review
        }catch(e){
            console.log(e)
        }
    }

    getRating=async (teacherId)=>{
        try {
            const reviews = await Review.findAll({
                where: {
                    teacher_id: teacherId
                }
            });

            if (reviews.length === 0) {
                return 3.5;
            }
            const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRatings / reviews.length;

            // Add an extra value of 3.5 for reviews where teacher_id = teacherId
            const extraRatings = reviews.filter(review => review.teacher_id === teacherId)
                                        .map(review => 3.5);

            const totalExtraRatings = extraRatings.reduce((sum, rating) => sum + rating, 0);
            const averageExtraRating = totalExtraRatings / extraRatings.length;

            // Calculate the final average rating
            const finalAverageRating = (averageRating + averageExtraRating) / 2;

            return finalAverageRating;
        } catch (e) {
            console.log(e);
            return 3.5;
        }
    }

}

module.exports = {ReviewRepository}