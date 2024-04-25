import io, { Socket as SocketClient } from "socket.io-client";
class Socket {
  static socket: SocketClient | undefined;

  public static initializeSocket(username: string): void {
    Socket.socket = io("localhost:8000", {
      transports: ["websocket"],
      query: { username: username },
    });
  }

  public static getSocket(): SocketClient {
    return this.socket as SocketClient;
  }
}
export default Socket;
