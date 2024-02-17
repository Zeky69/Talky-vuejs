const jwt = require('jsonwebtoken');
const {getAccountByUsername, getAccountById} = require("../services/auth.service");
const jwtSecret = 'proutsanslesfourmiscendrs';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        let haveAccount = getAccountById(user.userId, user.password);
        if (haveAccount !== null) {
            req.user = user.userId;
            next();
        } else {
            return res.sendStatus(403);
        }
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
    const { username, password , email } = req.body;
    if(username && password && email){
        let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let result = await getAccountByUsername(username);
        let usernameIsUsed = result.length === 0;
        console.log(usernameIsUsed , regexEmail , regexPassword);
        if(!regexEmail.test(email) || !regexPassword.test(password) || !usernameIsUsed){
            res.status(401).send({ error: 'Invalid Infomartion' , data: { email : regexEmail.test(email), password : regexPassword.test(password), username : usernameIsUsed } });
            return;
        }
        next();
    }
    else{
        res.status(401).send({ error: 'Invalid Infomartion' , data : { email : false, password : false, username : false }});
    }
}


module.exports = {
    authenticateToken,
    loginMidd,
    signupMidd
};