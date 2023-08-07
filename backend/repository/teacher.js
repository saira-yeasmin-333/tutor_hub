const { Teacher } = require('../models/models');
const Repository = require('./database').Repository


class TeacherRepository extends Repository {
    constructor() {
        super();
    }

    getAll = async () => {
        var teachers = await Teacher.findAll();
        return teachers
    }

    create = async (data) => {
        try {
            const teacher = await Teacher.create({
                onlineMedia: data.onlineMedia,
                physicalMedia: data.physicalMedia,
                budget: data.budget,
                account_id: data.account_id
            })
            return teacher
        } catch (e) {
            console.log('here2')
            console.log(e)
        }

    }

    fetchTutor=async data =>{
        try{
            const res=await Teacher.findOne({
                where: { account_id:
                data},
              });
            return res
        }catch(e){
            console.log(e)
        }
    } 
    

}

module.exports = { TeacherRepository }