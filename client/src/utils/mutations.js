import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation addBookToUserSavedBooks($bookInput: BookInput!) {
    addBook(bookInput: $bookInput) {
      _id
      title
      authors
      description
      condition
      image
      category {
        _id
        name
      }
      owner {
        _id
        username
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($_id: ID!) {
    deleteBook(_id: $_id)
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook($_id: ID!, $quantity: Int!) {
    updateBook(_id: $_id, quantity: $quantity) {
      _id
      title
      authors
      description
      condition
      image
      category {
        _id
        name
      }
      owner {
        _id
        username
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($users: [ID!]!) {
    createChat(users: $users) {
      _id
      users {
        _id
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($chatId: ID!, $sender: ID!, $text: String!) {
    sendMessage(chatId: $chatId, sender: $sender, text: $text) {
      _id
      sender {
        _id
        username
      }
      text
      timestamp
    }
  }
`;
