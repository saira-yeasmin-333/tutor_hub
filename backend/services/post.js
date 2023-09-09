const Service = require('./base').Service;
const PostRepository=require('../repository/post').PostRepository
const AccountRepository=require('../repository/auth').AccountRepository

const postRepository=new PostRepository()
const accountRepository=new AccountRepository()

class PostService extends Service {
    constructor() {
        super();
    }

    create=async post=>{
        var result=await postRepository.create(post)
        return result
    }

    getPosts=async (params) =>{

        var result=await postRepository.getAll(params)
        return result
    }

}

module.exports = {PostService}
