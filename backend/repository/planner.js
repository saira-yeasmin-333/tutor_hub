const {Planner} = require('../models/models');
const Repository=require('./database').Repository


class PlannerRepository extends Repository {
    constructor() {
        super();
    }

    getPlan=async (teacherId)=>{
        console.log('here data appeared: ',teacherId)
        try{
            var plan = await Planner.findOne({
                where:{
                    teacher_id:teacherId
                }
            });
            console.log(plan)
            return plan
        }catch(e){
            console.log('error: ',e)
        }
    }

    createPlan=async data=>{
        try{
            const create_plan = await Planner.upsert(data)
            return create_plan
        }catch(e){
            console.log(e)
        }
    }

}

module.exports = {PlannerRepository}