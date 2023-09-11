const {TeacherHasApplied, Post} = require('../models/models');
const Repository=require('./database').Repository

class TeacherHasAppliedRepository extends Repository{
    constructor() {
        super();
    }

    create=async review=>{
        try{
            review['postId']=review.post_id
            review['teacherTeacherId']=review.teacherId
            const create_review = await TeacherHasApplied.create(review)
            return create_review
        }catch(e){
            console.log(e)
        }
    }

    getReviews=async (teacherId)=>{
        try{
            var posts = await TeacherHasApplied.findAll({
                where:{
                    teacherTeacherId: teacherId
                },include:{
                    model:Post
                },
            });
            console.log("testing posts")
            console.log(posts)
            return posts
        }catch(e){
            console.log('error: ',e)
        }
    }
}

module.exports = {TeacherHasAppliedRepository}