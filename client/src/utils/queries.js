import { gql } from "@apollo/client";


export const QUERY_USERS_BOOKS = gql`
query getUserOwnedBooks($userId: ID!) {
  userBooks(userId: $userId) {
    _id
    title
    authors
    description
    image
    bookId
    owner {
      _id
      username
    }
  }
}
`;



export const QUERY_ALL_SAVED_BOOKS = gql`
{
  books{
    _id
  title
  authors
  description
  image
  bookId
  owner {
    _id
    username
  }
}
}
`

export const QUERY_USER = gql`
{
  user {
    _id
    username
    email
    ownedBooks {
      _id
      title
      authors
      description
      image
      bookId
    }
  }
}
`;


export const GET_CHAT_BY_ID = gql`
  query getChatById($chatId: ID!) {
    chat(chatId: $chatId) {
      _id
      users {
        _id
        username
      }
    }
  }
`;

export const GET_USER_CHATS = gql`
  query getUserChats($userId: ID!) {
    userChats(userId: $userId) {
    _id
    users {
      _id
      username
    }
    messages {
      _id
      sender {
        username
      }
      text
      timestamp
    }
  }
}
`;

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages($chatId: ID!) {
    chatMessages(chatId: $chatId) {
      _id
      text
      timestamp
      sender {
        _id
        username
      }
    }
  }
`;
