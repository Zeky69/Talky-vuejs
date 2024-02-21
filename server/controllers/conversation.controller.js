const { getConversation , getConversationUser, getParticipant, createConversation} = require('../services/conversation.service');


function leaveAll(socket) {
    const rooms = socket.rooms
    rooms.forEach((room) => {
        socket.leave(room);

    });
}

exports.socketConversation = (userId,socket) => {



    socket.on('joinConversation', async (id) => {
        try {

            const messages = await getConversation(id);
            const participant = await getParticipant(id);
            leaveAll(socket);
            socket.join(id);
            console.log(`Le client ${socket.id} a rejoint la room ${id}`);
            socket.emit('conversation', {messages,participant});
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('leaveConversation', async (data) => {
        try {
            socket.leave(data.conversationId);
            console.log(`Le client ${socket.id} a quitté la room ${data.conversationId}`);
        } catch (error) {
            console.log(error);
        }
    });

}

exports.getConversations = async (req, res) => {
    try {

        const conv = await getConversationUser(req.user);
        if(conv) {
            res.status(200).json(conv);
        }
        else {
            res.status(404).json({error: "Conversation not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.createConversation = async (req, res) => {
    try {
        const { friends , name} = req.body;
        friends.push(req.user);
        const conv = await createConversation(friends , name , false);
        if(conv) {
            friends.forEach(friend => {
                if (friend !== req.user && req.connected[friend])

                 req.connected[friend].emit('newConversation', conv);
            });
            res.status(200).json(conv);
        }
        else
            res.status(404).json({error: "Conversation not found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getConversation = async (req, res) => {
    try {
        const conv = await getConversation(req.params.id);
        if(conv)
            res.status(200).json(conv);
        else
            res.status(404).json({error: "Conversation not found"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

