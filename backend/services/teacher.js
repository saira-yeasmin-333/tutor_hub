const Service = require('./base').Service;
const TeacherRepository = require('../repository/teacher').TeacherRepository

const teacherRepository = new TeacherRepository()

class TeacherService extends Service {
    constructor() {
        super();
    }

    create = async (teacher) => {
        var result = await teacherRepository.create(teacher)
        console.log(result)
        return result
    }

    getTeachers = async (params) => {
        var result = await teacherRepository.getAll(params)
        
        return result
    }

    getTeachersWithName = async () => {
        var result = await teacherRepository.getAllTeachers()
        
        return result
    }

    fetchTutor=async data=>{
        var result=await teacherRepository.fetchTutor(data)
        console.log(result)
        return result
    }
}

module.exports = { TeacherService }
