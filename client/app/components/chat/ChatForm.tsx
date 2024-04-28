import React from "react";
import Socket from "@/app/utils/Socket";
const ChatForm: React.FC = () => {
  const [chatInput, setChatInput] = React.useState("");
  const socket = Socket.getSocket();
  return (
    <form
      id="chatbox-form"
      className=""
      onSubmit={(ev): void => {
        ev.preventDefault();
        if (chatInput === "") {
          return;
        }
        socket.emit("chatMsg", { type: "chat", msg: chatInput });
        setChatInput("");
      }}
    >
      <input
        data-testid="chat-input"
        className="border border-black p-2 w-full "
        placeholder="Type your guess here..."
        type="text"
        value={chatInput}
        onChange={(ev): void => setChatInput(ev.target.value)}
      />
    </form>
  );
};
export default ChatForm;
