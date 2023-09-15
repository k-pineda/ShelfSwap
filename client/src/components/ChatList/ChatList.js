import React from "react";
import { Link } from "react-router-dom";

const ChatList = ({ chats }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <Link to={`/chat/${chat._id}`} key={chat._id}>
          <div className="chat-tab">
            {/* You can customize how you want to display each chat */}
            <p>{chat.users.map((user) => user.username).join(", ")}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
