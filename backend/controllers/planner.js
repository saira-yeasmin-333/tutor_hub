const Controller = require("./base").Controller;
const PlannerService=require("../services/planner").PlannerService

const plannerService=new PlannerService()

class PlannerController extends Controller{
    constructor(){
        super()
    }

    createPlan=async(req,res)=>{
        var result=await plannerService.createPlan(req.body)
        return res.json({
            result
        })
    }

    getPlan=async(req,res)=>{
        console.log('teacher in get plan in controller;' ,req.body.teacher_id)
        var result=await plannerService.getPlan(req.body.teacher_id)
        return res.json({
            result
        })
    }

}

module.exports = {PlannerController}