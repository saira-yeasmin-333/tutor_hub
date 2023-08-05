const Service = require('./base').Service;
const PostRepository=require('../repository/post').PostRepository

const postRepository=new PostRepository()

class PostService extends Service {
    constructor() {
        super();
    }

    create=async post=>{
        var result=await postRepository.create(post)
        console.log(result)
        return result
    }

    getPosts=async () =>{
        var result=await postRepository.getAll()
        return result
    }
}

module.exports = {PostService}
