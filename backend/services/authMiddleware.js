
const jwt = require('jsonwebtoken');

var authenticateUser=(req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded ',decoded)
        req.body['account_id']=decoded.account_id
        next()
    }catch(err){
        return res.sendStatus(403)
    }
}

module.exports={
    authenticateUser
}