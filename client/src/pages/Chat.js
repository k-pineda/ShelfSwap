import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAT_BY_ID, GET_CHAT_MESSAGES, GET_USER_CHATS } from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutations";
import ChatList from '../components/ChatList/ChatList';
import AuthService from "../utils/auth";
import jwt_decode from "jwt-decode";

const Chat = () => {
  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.data._id;

  const { chat_id } = useParams();
  const [messageText, setMessageText] = useState("");
  const { loading: chatLoading, data: chatData } = useQuery(GET_CHAT_BY_ID, {
    variables: { chatId: chat_id },
  });
  const { loading: chatsLoading, data: chatsData } = useQuery(GET_USER_CHATS, {
    variables: { userId },
  });
  const { loading: messagesLoading, data: messagesData, refetch } = useQuery(
    GET_CHAT_MESSAGES,
    {
      variables: { chatId: chat_id },
    }
  );
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (messagesData && messagesData.chatMessages.length > 0) {
      const chatContainer = document.getElementById("chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    console.log(chatsData)
  }, [messagesData, chatsData]);

  const handleSendMessage = async () => {
    if (messageText.trim() === "") return;

    try {
      await sendMessage({
        variables: {
          chatId: chat_id,
          sender: userId,
          text: messageText,
        },
      });
      refetch()
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (chatLoading || messagesLoading || chatsLoading) {
    return <p>Loading...</p>;
  }

  let chatMessages = [];
  if (messagesData && messagesData.chatMessages) {
    chatMessages = messagesData.chatMessages;
  }

  const isChatSelected = Boolean(chat_id);

  return (
    <div className="chat-container" id="chat-container">
      {/* Left side with ChatList */}
      <div className="chat-list-container">
        <ChatList chats={chatsData?.userChats} userId={userId} />
      </div>
      <div className="chat-messages">
        {isChatSelected ? (
          // If chat_id is provided, render chat messages
          chatMessages.map((message) => (
            <div
              key={message._id}
              className={`message ${
                message.sender === userId ? "own-message" : "other-message"
              }`}
            >
              <p>
                <span className="username">
                  {message.sender === userId ? "You" : message.sender.username}
                </span>
                {message.text}
              </p>
            </div>
          ))
        ) : (
          // If chat_id is not provided, render a "Select chat to start messaging" message
          <div className="select-chat-message">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
      {isChatSelected && (
        // Render input field and send button only when chat_id is provided
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};


export default Chat;
