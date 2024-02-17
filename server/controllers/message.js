const { createMessage , removeMessage } = require('../services/message.service');

module.exports = (userId,socket,io) => {
    socket.on('sendMessage', async (data) => {
        try {
            let message = await createMessage( data.conversation_id, userId, data.text);
            io.to(data.conversation_id).emit('newMessage', message[0]);
        } catch (error) {
            console.log(error);
        }

    });

    socket.on('deleteMessage', async (data) => {
        try {
            const message = await removeMessage( data.conversation_id, data.from, data.message);
            socket.emit('message', message);
        } catch (error) {
            console.log(error);
        }

    });



}