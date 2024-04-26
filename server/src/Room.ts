import Round from "./Round";
import User from "./User";
import config from "./config";
export type ChatMsg = { msg: string; type: string; username?: string };

class Room {
  users: User[];
  drawingState: any[];
  gameStarted: boolean;
  activeUserIdx: number;
  round: Round | null;
  endRoundTimeOut: NodeJS.Timeout | null;

  constructor() {
    this.users = [];
    this.drawingState = [];
    this.gameStarted = false;
    this.activeUserIdx = 0;
    this.round = null;
    this.endRoundTimeOut = null;
    console.log(this.users);
  }

  getActiveUser(): User {
    return this.users[this.activeUserIdx];
  }

  addUser(user: User): void {
    if (this.users.length > config.MAX_USERS_PER_ROOM) {
      throw new Error("too many players");
    }

    this.users.push(user);
    this.broadcast("userJoin", user.describe());
    this.broadcastChatMsg({
      type: "good",
      msg: `${user.username} has joined the game`,
    });
  }

  addToDrawingState(drawing: any): void {
    this.drawingState.push(drawing);
  }

  clearDrawingState(): void {
    this.drawingState = [];
  }

  startGame(): void {
    this.broadcast("gameStart", 1);
    this.gameStarted = true;
  }
  endGame(): void {
    this.broadcast("gameEnd", 1);
  }

  getRoundInfo() {
    if (!this.round) {
      throw new Error();
    }
    return {
      socketId: this.getActiveUser().id,
      startTime: this.round.startTime,
      timeToComplete: this.round.timeToComplete,
      word: this.round.word,
    };
  }

  removeUser(user: User): void {
    this.users = this.users.filter((usr) => usr.id !== user.id);
    this.broadcastChatMsg({
      type: "bad",
      msg: `${user.username} has left the game`,
    });
    this.broadcast("userLeave", user.describe());
  }

  isFull() {
    return this.users.length == config.MAX_USERS_PER_ROOM;
  }
  broadcastChatMsg(msg: ChatMsg, excludedUser?: User) {
    this.broadcast("chatMsg", msg, excludedUser);
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

  startRound(): void {
    this.round = new Round();
    const roundInfo = this.getRoundInfo();
    this.broadcast("roundStart", {
      ...roundInfo,
      word: roundInfo.word.replace(/./gs, "_"),
    });
    this.getActiveUser().socket.emit("roundStart", roundInfo);
    this.broadcastChatMsg({
      msg: `It is ${this.getActiveUser().username}'s turn to draw`,
      type: "alert",
    });
    this.endRoundTimeOut = setTimeout(() => {
      this.endRound();
      setTimeout(() => this.startNextRound(), config.ROUND_DELAY);
    }, this.round.timeToComplete);
  }

  endRound(activeUser?: User): void {
    if (!activeUser) {
      activeUser = this.getActiveUser();
    }
    if (!activeUser) {
      return;
    }
    if (!this.round) {
      return;
    }
    this.broadcast("wordReveal", this.round.word);
    this.broadcast("roundEnd", 1);
    this.round.isActive = false;
    const roundScores = this.round.getScores(activeUser.id, this.users);
    this.broadcast("roundScores", roundScores);
    for (const user of this.users) {
      user.score += roundScores[user.id];
    }
  }

  startNextRound(): void {
    this.activeUserIdx++;
    this.drawingState = [];
    if (this.activeUserIdx >= this.users.length) {
      this.endGame();
    } else {
      this.startRound();
    }
  }
}

export default Room;
