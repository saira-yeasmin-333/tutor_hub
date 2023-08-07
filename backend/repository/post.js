const {Post} = require('../models/models');
const Repository=require('./database').Repository


class PostRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var posts = await Post.findAll();
        return posts
    }

    create=async user=>{
        try{
            const post = await Post.create({
                timestamp:user.timestamp,
                student_id:user.student_id,
                latitude:user.latitude,
                longitude:user.longitude,
                budget:user.budget,
                class:user.class,
            })
            return post
        }catch(e){
            console.log('here2')
            console.log(e)
        }

    }


}

module.exports = {PostRepository}