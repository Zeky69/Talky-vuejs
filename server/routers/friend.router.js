const express = require('express');
var router = express.Router();


const {authenticateToken} = require("../middlewares/auth.middleware");

const FriendController = require("../controllers/friend.controller");

router.post('/add/:id', authenticateToken, FriendController.addFriend);
router.delete('/delete/:id', authenticateToken, FriendController.deleteFriend);
router.get('/request', authenticateToken, FriendController.getFriendRequests);
router.post('/accept/:id', authenticateToken, FriendController.acceptFriend);
router.post('/block/:id', authenticateToken, FriendController.blockFriend);
router.get('/blocked', authenticateToken, FriendController.getBlockedFriendRequests);
router.delete('/refuse/:id', authenticateToken, FriendController.removeFriendRequest);
// router.delete('/unblock/:id', authenticateToken, FriendController.unblockFriendRequest);

router.get('/search/:username', authenticateToken, FriendController.getListNotFriendStartLike);

router.get('/', authenticateToken, FriendController.getFriends);



module.exports = router;