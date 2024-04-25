import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import Room from "./Room";
import User from "./User";
import config from "./config";

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

  if (room.gameStarted && room.round && room.round.isActive) {
    const roundInfo = room.getRoundInfo();
    socket.emit("gameStart");
    socket.emit("roundStart", {
      ...roundInfo,
      word: roundInfo.word.replace(/./gs, "_"),
    });
    socket.emit("drawingState", room.drawingState);
  }

  socket.on("lineDraw", (msg, roomId): void => {
    if (room.getActiveUser().id === user.id) {
      room.addToDrawingState(msg);
      room.broadcast("lineDraw", msg, user);
    }
  });

  if (room.users.length === config.MIN_PLAYERS_PER_ROOM) {
    room.startGame();
    room.startRound();
  }
});

const PORT: string = process.env.PORT!;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
