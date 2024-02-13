const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const {socketConversation} = require('./controllers/conversation.controller')
const messageEvent = require('./controllers/message')
const authRouter = require('./routers/Auth.router');
const friendRouter = require('./routers/friend.router');
const conversationRouter = require('./routers/conversation.router');
const imageRoutes = require('./routers/image.router');
const jwt = require("jsonwebtoken");

const connected = {}


const app = express();

const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE'],
    },
});




app.use(cors());
app.use(bodyParser.json());
app.use('/',(req,res,next) => {
    req.io = io;
    req.connected= connected;
    next();
})
app.use('/auth/',authRouter );
app.use('/friends/',friendRouter );
app.use('/conversations/',conversationRouter);
app.use('/image', imageRoutes);





server.listen(process.env.PORT, () => {
    console.log('Server running on port 3000');
});



function verifyToken(socket, callback) {
    const token = socket.handshake.query.token;

    if (token) {
        jwt.verify(token, 'proutsanslesfourmiscendrs', (err, decoded) => {
            if (err) {
                console.log('Token invalide');
                callback(null); // Appel de callback avec null en cas de token invalide
            } else {
                console.log('Token valide');
                console.log(decoded);
                callback(decoded.userId); // Appel de callback avec l'ID de la personne
            }
        });
    } else {
        console.log('Token non reçu');
        callback(null);
    }
}
io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté');
    verifyToken(socket, (userId) => {
        if (!userId) {
            socket.disconnect();
            return;
        }
        connected[userId] = socket


        socketConversation(userId,socket)
        messageEvent(userId,socket,io)

        socket.on('message', async (message) => {
            console.log(message);
            }
        );





        socket.on('disconnect', () => {
            console.log(`Utilisateur ${userId} déconnecté`);
            delete connected[userId]
        });
    });






});


module.exports = {
    io,
    connected
};