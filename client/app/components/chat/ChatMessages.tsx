import React from "react";

export type ChatMsg = { msg: string; type: string; username?: string };

interface ChatMessageProps {
  messages: ChatMsg[];
}

const ChatMessages: React.FC<ChatMessageProps> = ({ messages }) => {
  return (
    <div id="chatbox-messages">
      {messages.map((message, idx) => (
        <div
          key={idx}
          data-testid="chatbox-message"
          className={`msg-${message.type} ${
            idx % 2 === 0 ? "bg-white" : "bg-gray-200"
          } p-2  w-full `}
        >
          {!message.username && message.msg}
          {message.username && (
            <span
              className={`${
                message.type === "alert" || message.type === "bad"
                  ? "text-red-500"
                  : null
              }`}
            >
              <b>{message.username}:</b> {message.msg}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
