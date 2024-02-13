const jwt = require('jsonwebtoken');
const jwtSecret = 'proutsanslesfourmiscendrs';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("authHeader",authHeader)
    const token = authHeader && authHeader.split(' ')[1];


    if (token == null)  {
        console.log("token null")
        return res.sendStatus(401);}

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user.userId;
        console.log("token ok",user)
        next();
    });
};

const loginMidd = async (req, res, next) => {
    const { username, password } = req.body;
    if(username && password){
        next();
    }
    else{
        res.status(401).json({ error: 'Invalid Infomartion' });
    }
}

const signupMidd = async (req, res, next) => {
    const { username, password } = req.body;
    if(username && password){
        next();
    }
    else{
        res.status(401).json({ error: 'Invalid Infomartion' });
    }
}


module.exports = {
    authenticateToken,
    loginMidd,
    signupMidd
};