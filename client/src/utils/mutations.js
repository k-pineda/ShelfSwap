import { gql } from '@apollo/client';

// Existing mutations
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
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
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
      author
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

// New mutations for deleteBook and updateBook
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
      author
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

export const SEND_MESSAGE = gql`
  mutation sendMessage($chatId: ID!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      _id
      sender {
        _id
        username
      }
      receiver {
        _id
        username
      }
      messages {
        _id
        sender {
          _id
          username
        }
        text
      }
    }
  }
`;
