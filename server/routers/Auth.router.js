const express = require('express');
var router = express.Router();

const {loginMidd , signupMidd, authenticateToken} = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/auth.controller");

router.post('/signup', signupMidd, AuthController.signup);
router.post('/login',loginMidd, AuthController.login);
router.get('/checkToken', authenticateToken, AuthController.checkToken);


module.exports = router;