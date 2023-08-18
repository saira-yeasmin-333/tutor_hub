
const jwt = require('jsonwebtoken');

var authenticateUser=(req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (token == null) return res.sendStatus(401)
    try{
        var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('decoded ',decoded)
        req.body['account_id']=decoded.account_id,
        req.body['name']=decoded.name
        if(decoded.role==='teacher'){
            req.body['teacher_id']=decoded.teacher_id
        }
        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(403)
    }
}

module.exports={
    authenticateUser
}