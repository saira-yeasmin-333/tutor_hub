const Service = require('./base').Service;
const PlannerRepository=require('../repository/planner').PlannerRepository

const nplannerRepository=new PlannerRepository()

class PlannerService extends Service {
    constructor() {
        super();
    }

    createPlan=async plan=>{
        var result=await nplannerRepository.createPlan(plan)
        return result
    }

    getPlan=async (data) =>{
        var result=await nplannerRepository.getPlan(data)
        return result
    }


}

module.exports = {PlannerService}
