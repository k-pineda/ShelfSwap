import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { QUERY_USER, QUERY_CHAT, SEND_MESSAGE, CHAT_SUBSCRIPTION } from '../utils/queries';

function Chat() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading: chatLoading, data: chatData } = useQuery(QUERY_CHAT, {
    variables: { chatId },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // Subscribe to new chat messages
  const { data: subscriptionData } = useSubscription(CHAT_SUBSCRIPTION, {
    variables: { chatId },
  });

  useEffect(() => {
    // Scroll to the latest message when a new message is received
    if (subscriptionData?.newMessage) {
      // You can implement the scrolling logic here
    }
  }, [subscriptionData]);

  const handleSendMessage = async () => {
    try {
      await sendMessage({
        variables: { chatId, message },
      });
      // Clear the input field after sending a message
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  if (userLoading || chatLoading) {
    return <div>Loading...</div>;
  }

  const user = userData.user;
  const chat = chatData.chat; // Assuming your query returns the chat details

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {chat.participant1.username} and {chat.participant2.username}</h2>
      </div>
      <div className="chat-messages">
        {chat.messages.map((message) => (
          <div key={message._id} className="message">
            <strong>{message.sender.username}</strong>: {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
