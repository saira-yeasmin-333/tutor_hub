const Controller = require("./base").Controller;
const SubjectService = require("../services/subject").SubjectService

const subjectService = new SubjectService()

class SubjectController extends Controller {
    constructor() {
        super()
    }

    create = async (req, res) => {
        console.log(req.body)
        var result = await subjectService.create(req.body)
        return res.json({
            success: true,
            data: result
        })
    }

    getSubjects = async (req, res) => {
        var result = await subjectService.getSubjects()
        return res.status(200).json({
            success: true,
            data: result
        })
    }

    getEfficiencyByAccount = async (req, res) => {
        const accId = req.params.account_id;
        console.log('in controller id: ',accId)
        var result = await subjectService.getEfficiencyByAccount(accId)
        return res.status(200).json({
            success: true,
            data: result
        })
    }
}

module.exports = { SubjectController }