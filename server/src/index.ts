import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import Room from "./Room";
import { socketHandler } from "../socket/socketHandler";

dotenv.config();

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

const rooms: { [key: string]: Room } = {};

io.on("connection", (socket: Socket) => {
  console.log("New connection:", socket.id);

  socketHandler(socket, rooms, io);
});

const PORT: string = process.env.PORT!;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
