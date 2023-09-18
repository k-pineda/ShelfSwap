import React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

// Define a mapping of letters to colors
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

const ChatList = ({ chats, userId }) => {
  const location = useLocation();

  // Function to get the background color based on the first letter of the username
  const getAvatarBackgroundColor = (username) => {
    const firstLetter = username.charAt(0) ? username.charAt(0).toLowerCase() : '';
    return letterToColorMap[firstLetter] || "#69B4F0"; // Default color
  };

  return (
    <Box className="chat-list">
      {chats.map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== userId);
        const isCurrentChat = location.pathname === `/chat/${chat._id}`;
        const lastMessage = chat.messages[chat.messages.length-1]
        const preview = lastMessage ? (lastMessage.text !== null ? (lastMessage.text.length > 33 ? lastMessage.text.slice(0,33) + '...' : lastMessage.text) : ' No messages ') : ' No messages ';

        return (
          <Link
            to={`/chat/${chat._id}`}
            key={chat._id}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              className="chat-tab"
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #858585",
                backgroundColor: isCurrentChat ? "#f0f0f0" : "#e1d4c1",
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  marginRight: "8px",
                  backgroundColor: getAvatarBackgroundColor(
                    otherUser.username
                  ), // Get background color based on the first letter
                }}
              >
                {otherUser.username[0]}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "2px",
                  }}
                >
                  {otherUser.username}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#777",
                  }}
                >
                  {preview}
                </Typography>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default ChatList;
