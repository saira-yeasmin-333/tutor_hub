const {Post,Account, Subject} = require('../models/models');
const Repository=require('./database').Repository


class PostRepository extends Repository {
    constructor() {
        super();
    }

    getAll=async ()=>{
        var posts = await Post.findAll({
            include: [{
                model: Account,
                attributes: ['name','image'], // Include the desired additional column
              },
              {
                model: Subject,
                attributes: ['sub_name','id'], // Include the desired additional column
              },
            ]
        });
        return posts
    }

    create=async data=>{
        try{
            data['timestamp']=parseInt(Date.now()/1000)
            data['student_id']=data.account_id
            const post = await Post.create(data)

            const selectedSubjects = await Subject.findAll({
                where: {
                  id: data.subjectIdsToAssociate,
                },
              });
          
              // Associate the fetched subjects with the post
            await post.addSubjects(selectedSubjects);
            return post
        }catch(e){
            console.log(e)
        }

    }



}

module.exports = {PostRepository}