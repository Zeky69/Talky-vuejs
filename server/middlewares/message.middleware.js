


const createMessage = async (req, res, next) => {
    const { id_conversation, from, message } = req.body;
    if (!id_conversation || !from || !message) {
        return res.status(400).json({
            status: 'error',
            error: 'Invalid request data',
        });
    }
    try {
        const message = await createMessage( data.id_conversation, data.from, data.message);
        socket.emit('message', message);
    } catch (error) {
        console.log(error);
    }
    next();
}