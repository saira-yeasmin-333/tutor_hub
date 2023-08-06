const Controller = require("./base").Controller;
const EfficiencyService = require("../services/efficiency").EfficiencyService

const efficiencyService = new EfficiencyService()

class EfficiencyController extends Controller {

    constructor() {
        super()
    }

    getEfficiency = async (req, res) => {
        const teacher_id = parseInt(req.params.id);
        var result = await efficiencyService.getEfficiency(teacher_id)
        console.log(result)
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    insertEfficiency = async (req, res) => {
        console.log(req.body)
        var result = await efficiencyService.insertEfficiency(req.body)
        return res.json({
            success: true,
            data: result
        })
    }

}

module.exports = { EfficiencyController }