import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import Room from "./Room";
import User from "./User";

dotenv.config();

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server);

const rooms: Room[] = [];

io.on("connection", (socket: Socket) => {
  if (rooms.length === 0) {
    rooms.push(new Room());
  }
  let roomIdx = rooms.findIndex((room) => !room.isFull());
  if (roomIdx === -1) {
    rooms.push(new Room());
    roomIdx = rooms.length - 1;
  }
  const room = rooms[roomIdx];

  const user = new User(
    socket.id,
    socket.handshake.query.username! as string,
    socket
  );

  room.addUser(user);

  socket.on("lineDraw", (msg, roomId): void => {
    console.log("ram", room);
    room.broadcast("lineDraw", msg, user);
  });
});

const PORT: string = process.env.PORT!;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
