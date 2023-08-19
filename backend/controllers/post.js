const Controller = require("./base").Controller;
const PostService=require("../services/post").PostService

const postService=new PostService()

class PostController extends Controller{
    constructor(){
        super()
    }

    create=async(req,res)=>{
        var result=await postService.create(req.body)
        console.log('after adding :',result)
        return res.json({
            success:true,
            data:result
        })
    }

    getPosts=async (req,res)=>{
        var result=await postService.getPosts()
        return res.status(200).json({
            success:true,
            data:result
        })
    }
}

module.exports = {PostController}