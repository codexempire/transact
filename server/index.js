// import 'babel-polyfill';
import '@babel/polyfill';
import express from 'express';
import http from 'http';
import io from 'socket.io';
import cors from 'cors';
import routes from './api/index.routes';

// import socket from './socket'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const server = http.createServer(app);
io.listen(server);

const port = process.env.PORT || 5050;

server.listen(port, (err) => {
    if (err) {
        console.log(err.message || err);
    }
    console.log(`Running on port: ${port}`)
});