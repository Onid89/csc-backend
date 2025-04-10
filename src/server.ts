import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import usersRouter from './routes/users.js';
import doConnectBase from './database/DBconnection.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import webSocketServer from './webSocket/socketServer.js';

const port = process.env.PORT || 5007;
const clientURL = process.env.CLIENT_URL;

const app = express();
const server = createServer(app);

app.use(cors({
  origin: clientURL,
  credentials: true
}));

const webSocket = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cookieParser());

await doConnectBase();

app.use('/users', usersRouter);

webSocketServer(webSocket);

server.listen(port, () => {
  console.log(`app is listening in port ${port}...`);
})
