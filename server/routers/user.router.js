const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middlewares/auth.middleware');
const {getProfile} = require('../controllers/user.controller');

router.get('/:id', authenticateToken, getProfile);

module.exports = router;
