import {io} from "socket.io-client";
import {API_URL} from "@/variable";

export function connectSocket(token){

   let socket= io(API_URL, {
        query: {
            token
        }
    })


    socket.on('connect', () => {
        console.log('Connecté au serveur');
    }
    );


    socket.on('disconnect', () => {
        console.log('Déconnecté du serveur');
    }
    );


    return socket;

}