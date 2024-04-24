class User {
  id: string;
  username: string;
  score: number;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
    this.score = 0;
  }
}

export default User;
