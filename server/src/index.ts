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

let rooms: Room[] = [];

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
    console.log(roundInfo.word);
    socket.emit("gameStart", {
      room: roomIdx,
    });
    socket.emit("roundStart", {
      ...roundInfo,
      word: roundInfo.word,
    });
    socket.emit("drawingState", room.drawingState);
  }

  if (room.users.length < config.MIN_PLAYERS_PER_ROOM) {
    setTimeout(
      () =>
        room.broadcastChatMsg({
          type: "alert",
          msg: `need ${
            config.MIN_PLAYERS_PER_ROOM - room.users.length
          } more player(s) to start the game`,
        }),
      50
    );
  }

  socket.on("lineDraw", (msg, roomId): void => {
    if (!room.getActiveUser().id) return;
    if (room.getActiveUser().id === user.id) {
      room.addToDrawingState(msg);
      room.broadcast("lineDraw", msg, user);
    }
  });

  if (room.users.length === config.MIN_PLAYERS_PER_ROOM) {
    room.startGame();
    room.startRound();
  }

  socket.on("chatMsg", (msg): void => {
    const round = room.round;
    if (round && round.isActive && room.getActiveUser()) {
      if (user.id === room.getActiveUser().id) {
        room.broadcastChatMsgToCorrectGuessers({
          msg: msg.msg,
          type: "good",
          username: user.username,
        });
        return;
      }
      if (round.didUserGuess(user.id)) {
        room.broadcastChatMsgToCorrectGuessers({
          msg: msg.msg,
          type: "good",
          username: user.username,
        });
      } else {
        if (round.word === msg.msg) {
          user.socket.emit("chatMsg", {
            msg: msg.msg,
            type: "good",
            username: user.username,
          });
          room.broadcastChatMsgToCorrectGuessers({
            msg: msg.msg,
            type: "good",
            username: user.username,
          });
          room.broadcastChatMsg({
            type: "good",
            msg: `${user.username} guessed the word correctly`,
          });
          round.assignUserScore(user.id);
          if (
            round.didEveryoneGuessCorrectly(room.getActiveUser().id, room.users)
          ) {
            clearTimeout(room.endRoundTimeOut as NodeJS.Timeout);
            room.endRound();
            room.endRoundTimeOut = setTimeout(
              () => room.startNextRound(),
              config.ROUND_DELAY
            );
          }
        } else {
          room.broadcastChatMsg({ ...msg, username: user.username });
        }
      }
    } else {
      room.broadcastChatMsg({ ...msg, username: user.username });
    }
  });

  socket.on("disconnect", (): void => {
    const activeUser = room.getActiveUser();
    room.removeUser(user);
    if (room.users.length < config.MIN_PLAYERS_PER_ROOM) {
      if (room.gameStarted) {
        room.endGame();
        rooms = rooms.filter((rm) => room !== rm);
        return;
      }
    }
    if (activeUser && activeUser.id === user.id) {
      room.activeUserIdx--;
      clearTimeout(room.endRoundTimeOut as NodeJS.Timeout);
      room.endRound(activeUser);
      room.endRoundTimeOut = setTimeout(
        () => room.startNextRound(),
        config.ROUND_DELAY
      );
    }
  });
});

const PORT: string = process.env.PORT!;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
