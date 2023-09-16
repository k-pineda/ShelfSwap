import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  GET_CHAT_BY_ID,
  GET_CHAT_MESSAGES,
  GET_USER_CHATS,
} from "../utils/queries";
import { SEND_MESSAGE } from "../utils/mutations";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import ChatList from "../components/ChatList/ChatList";

import AuthService from "../utils/auth";
import jwt_decode from "jwt-decode";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const letterToColorMap = {
  a: "#FF5733",
  b: "#33FF57",
  c: "#5733FF",
  d: "#FF33E1",
  e: "#33E1FF",
  f: "#FFC133",
  g: "#C133FF",
  h: "#FF3333",
  i: "#33FFBE",
  j: "#FF33A4",
  k: "#FF9133",
  l: "#33FF33",
  m: "#E133FF",
  n: "#8A33FF",
  o: "#3384FF",
  p: "#E3FF33",
  q: "#FF33AB",
  r: "#33FF8A",
  s: "#3363FF",
  t: "#FF3363",
  u: "#33FFC1",
  v: "#FF5733",
  w: "#FF5733",
  x: "#FF5733",
  y: "#FF5733",
  z: "#FF5733",
};

const Chat = () => {
  const token = AuthService.getToken();
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.data._id;

  const getAvatarBackgroundColor = (username) => {
    const firstLetter = username.charAt(0) ? username.charAt(0).toLowerCase() : '';
    return letterToColorMap[firstLetter] || "#69B4F0"; // Default color
  };

  const { chat_id } = useParams();
  const [messageText, setMessageText] = useState("");
  const { loading: chatLoading, data: chatData } = useQuery(GET_CHAT_BY_ID, {
    variables: { chatId: chat_id },
  });
  const {
    loading: chatsLoading,
    data: chatsData,
    refetch: refetchChats,
  } = useQuery(GET_USER_CHATS, {
    variables: { userId },
  });
  const {
    loading: messagesLoading,
    data: messagesData,
    refetch: refetchMessages,
  } = useQuery(GET_CHAT_MESSAGES, {
    variables: { chatId: chat_id },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (messagesData && messagesData.chatMessages.length > 0) {
      const chatContainer = document.getElementById("chat-container");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
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
      refetchMessages();
      refetchChats();
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (chatLoading || messagesLoading || chatsLoading) {
    return <LoadingIndicator />;
  }

  let chatMessages = [];
  if (messagesData && messagesData.chatMessages) {
    chatMessages = messagesData.chatMessages;
  }

  const isChatSelected = Boolean(chat_id);
  console.log(chatsData);
  return (
    <Box
      id="chat-container"
      sx={{
        display: "flex",
        height: "80vh",
        color: "text.primary",
        paddingLeft: "50px",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          flexBasis: "30%",
          minWidth: "300px",
          borderRight: "1px solid #858585",
          backgroundColor: "#e1d4c1",
          overflowY: "auto",
        }}
      >
        <ChatList chats={chatsData?.userChats} userId={userId} />
      </Box>
      <Box
        sx={{
          flexBasis: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          className="chat-messages"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column-reverse", // Reverse the order of messages
          }}
        >
          {isChatSelected ? (
            // If chat_id is provided, render chat messages in reverse order
            chatMessages
              .slice()
              .reverse()
              .map((message) => (
                <Box
                  key={message._id}
                  sx={{
                    display: "flex",
                    flexDirection: "row", // Messages from other users always on the left
                    alignItems: "flex-start",
                    marginBottom: "10px",
                    width: "fit-content",
                    marginLeft: message?.sender._id !== userId ? "0" : "auto", // Push your messages to the right
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      marginRight: "8px",
                      backgroundColor:
                        message.sender._id === userId
                          ? "#69B4F0" // Default color for your own messages
                          : getAvatarBackgroundColor(message.sender.username),
                    }}
                  >
                    {message.sender.username ? message.sender.username[0] : ""}
                  </Avatar>
                  <Box
                    sx={{
                      backgroundColor:
                        message.sender._id === userId ? "#69B4F0" : "#ECEFF1",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "#333",
                      minWidth: "150px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {message.sender._id === userId
                        ? "You"
                        : message.sender.username}
                    </Typography>
                    <Typography variant="body2">{message.text}</Typography>
                  </Box>
                </Box>
              ))
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box
          sx={{
            p: 2,
            backgroundColor: "#ffffff",
            borderTop: "1px solid #858585",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                variant="outlined"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
