const { Subject } = require('../models/models');
const Repository = require('./database').Repository
const { sequelize,QueryTypes} = require('sequelize');
const { sq } = require("../repository/database");

class SubjectRepository extends Repository {
    constructor() {
        super();
    }

    getAll = async () => {
        var subjects = await Subject.findAll();
        return subjects
    }

    create = async (data) => {
        try {
            const subject = await Subject.create({
                sub_name: data.sub_name,
            })
            return subject
        } catch (e) {
            console.log('here2')
            console.log(e)
        }

    }

    getEfficiencyByAccount = async (data) => {
        console.log('data in repo ,',data)
        try{
            const res= await sq.query(
                "SELECT * FROM subjects JOIN efficiencies ON subjects.id = efficiencies.subject_id and efficiencies.teacher_account_id=:id ",
                {
                  type: QueryTypes.SELECT,
                  replacements: { id: data },
                }
              );
              console.log('printing query ',res)
        }catch(e){
            console.log(e)
        }

        
    }

}

module.exports = { SubjectRepository }