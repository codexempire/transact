import { setOnlineStatus, saveChat, addFriends } from './socketFunctions';
import { Chat } from '../models';

export default function socket(io) {
    let users = {}

    return io.on('connection', socket => {
        let userEmail;
        socket.on('connected', (email) => {
            users[email] = socket._id;
            userEmail = email;
        });

        socket.on('send-message', async (data) => {
            // store the chat in the database
            const message = await createChat(data);
            // Send the chat to the reciever
            socket.to(users[message.reciever]).emit('message', message);
        });

        socket.on('disconnect', () => delete users[userEmail]);
    })
}


const createChat = async data => {
    let message;
    try {
        message = Chat.create(data);
    } catch(err) {
        throw err;
    }
    return message;
}