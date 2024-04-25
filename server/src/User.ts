import { Socket } from "socket.io";

class User {
  id: string;
  username: string;
  score: number;
  socket: Socket;

  constructor(id: string, username: string, socket: Socket) {
    this.id = id;
    this.username = username;
    this.score = 0;
    this.socket = socket;
  }

  describe() {
    return { id: this.id, username: this.username, score: this.score };
  }
}

export default User;
