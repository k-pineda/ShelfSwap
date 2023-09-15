import React from "react";
import { Link } from "react-router-dom";

const ChatList = ({ chats, userId }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => {
        // Find the user in the chat who is not the current user
        const otherUser = chat.users.find((user) => user._id !== userId);

        return (
          <Link to={`/chat/${chat._id}`} key={chat._id}>
            <div className="chat-tab">
              <p>{otherUser.username}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ChatList;
