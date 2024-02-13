const express = require('express');
var router = express.Router();

const {authenticateToken} = require("../middlewares/auth.middleware");

const {getConversations, getConversation} = require("../controllers/conversation.controller");

router.get('/', authenticateToken, getConversations);
router.get('/:id', authenticateToken, getConversation);

module.exports = router;