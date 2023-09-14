import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_CHAT_BY_ID, GET_CHAT_MESSAGES } from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutations";
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
  const { loading: messagesLoading, data: messagesData } = useQuery(
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
  }, [messagesData]);

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

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (chatLoading || messagesLoading) {
    return <p>Loading...</p>;
  }

  let chatMessages = [];
  if (messagesData && messagesData.chatMessages) {
    chatMessages = messagesData.chatMessages;
  }

  console.log(chatMessages)
  return (
    <div className="chat-container" id="chat-container">
      <div className="chat-messages">
        {chatMessages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.sender === userId ? "own-message" : "other-message"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
