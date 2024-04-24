import { Server, Socket } from "socket.io";
import Room from "../src/Room";
import User from "../src/User";

export const socketHandler = (
  socket: Socket,
  rooms: { [key: string]: Room },
  io: Server
) => {
  socket.on("joinRoom", (roomId: string, userId: string, username: string) => {
    if (!rooms[roomId]) {
      rooms[roomId] = new Room(roomId);
    }

    const user = new User(userId, username);
    rooms[roomId].addUser(user);
    socket.join(roomId);

    io.to(roomId).emit("userJoined", user);
  });
};
