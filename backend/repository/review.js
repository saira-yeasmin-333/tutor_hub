const {Review} = require('../models/models');
const Repository=require('./database').Repository


class ReviewRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var reviews = await Review.findAll();
        return reviews
    }

    create=async review=>{
        try{
            const create_review = await Review.create(review)
            return create_review
        }catch(e){
            console.log(e)
        }
    }


}

module.exports = {ReviewRepository}