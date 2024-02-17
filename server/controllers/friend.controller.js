const friendService = require('../services/friend.service');
const {createConversation, getConversationByIdWithUser} = require("../services/conversation.service");

exports.getFriends = async (req, res) => {
    try {

        const friends = await friendService.getFriends(req.user);
        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addFriend = async (req, res) => {
    try {
        const friend = await friendService.addFriend(req.user, req.params.id);
        if(req.connected[req.params.id])
            req.connected[req.params.id].emit('newRequest', friend);


        res.status(200).json(friend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteFriend = async (req, res) => {
    try {
        const friend = await friendService.removeFriend(req.user, req.params.id);
        if(req.connected[req.params.id])
            req.connected[req.params.id].emit('removeFriend', friend);
        res.status(200).json(friend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getFriendRequests = async (req, res) => {
    try {
        const friendRequests = await friendService.getFriendRequests(req.user);
        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.acceptFriend = async (req, res) => {
    try {
        const friend = await friendService.acceptFriend(req.user, req.params.id);
        if(!friend){
            return res.status(500).json({ error: 'Friend request not found' });
        }
        const conversationId = await createConversation( [req.user, req.params.id], 'private ' + req.user +' with ' + req.params.id , true);
        const conversationUser = await getConversationByIdWithUser(conversationId.id, req.user);
        const conversationfriend = await getConversationByIdWithUser(conversationId.id, req.params.id);


        if(req.connected[req.params.id])
            req.connected[req.params.id].emit('newFriend',  { conversation:conversationfriend , friend_id : req.user });
        res.status(200).json({ conversation:conversationUser , friend_id : req.params.id});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.blockFriend = async (req, res) => {
    try {
        const friend = await friendService.blockFriendRequest(req.user, req.params.id);
        if(req.connected[req.params.id])
            req.connected[req.params.id].emit('blockFriend', friend);
        res.status(200).json(friend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBlockedFriendRequests = async (req, res) => {
    try {
        const friendRequests = await friendService.getBlockedFriendRequest(req.params.id);
        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.unblockFriend = async (req, res) => {
    try {
        const friend = await friendService.unblockFriendRequest(req.user, req.params.id);
        if(req.connected[req.params.id])
            req.connected[req.params.id].emit('unblockFriend', friend);
        res.status(200).json(friend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getListNotFriendStartLike = async (req, res) => {
    try {
        const users = await friendService.getListNotFriendStartLike(req.user, req.params.username);
        if(users)
            res.status(200).json(users);
        else
            res.status(500).json({ error: 'Error' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

