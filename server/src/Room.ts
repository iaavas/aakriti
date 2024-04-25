import User from "./User";
import config from "./config";

class Room {
  users: User[];

  constructor() {
    this.users = [];
  }

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  isFull() {
    return this.users.length == config.MAX_USERS_PER_ROOM;
  }

  broadcast(
    msg: string,
    payload: unknown,
    excludedUser: User | undefined = undefined
  ): void {
    this.users.forEach((user: User): void => {
      if (!excludedUser || (excludedUser && user.id !== excludedUser.id)) {
        user.socket.emit(msg, payload);
      }
    });
  }
}

export default Room;
