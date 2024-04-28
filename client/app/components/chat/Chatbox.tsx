import React from "react";
import Socket from "../../utils/Socket";
import ChatForm from "./ChatForm";
import ChatMessages, { ChatMsg } from "./ChatMessages";
const Chatbox: React.FC = () => {
  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  const socket = Socket.getSocket();
  React.useEffect(() => {
    socket.on("chatMsg", (msg: ChatMsg) => {
      setMessages([...messages, msg]);
    });
    return () => {
      socket.removeListener("chatMsg");
    };
  }, [messages, socket]);
  return (
    <div className="flex flex-col  bg-white rounded-sm w-1/4 h-2/3">
      <div className="flex-grow overflow-y-auto">
        <div className="mx-auto max-w-3xl ">
          <ChatMessages messages={messages} />
        </div>
      </div>
      <div className="bg-white shadow-md">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
