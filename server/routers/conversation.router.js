const express = require('express');
var router = express.Router();

const {authenticateToken} = require("../middlewares/auth.middleware");

const {getConversations, getConversation, createConversation} = require("../controllers/conversation.controller");
const {checkFriend} = require("../middlewares/message.middleware");

router.get('/', authenticateToken, getConversations);
router.get('/:id', authenticateToken, getConversation);
router.post('/', authenticateToken,checkFriend, createConversation);

module.exports = router;