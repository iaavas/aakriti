import User from "./User";
import config from "./config";

class Room {
  id: string;
  users: User[];

  constructor(id: string) {
    this.id = id;
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
}

export default Room;
