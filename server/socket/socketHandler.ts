import { Server, Socket } from "socket.io";
import Room from "../src/Room";
import User from "../src/User";

export const socketHandler = (
  socket: Socket,
  rooms: { [key: string]: Room },
  io: Server
) => {};
