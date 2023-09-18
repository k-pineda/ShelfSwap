const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    books: [Book]
  }

  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    condition: String
    image: String
    bookId: String
    category: Category
    owner: User
  }

  type User {
    _id: ID
    username: String
    email: String
    ownedBooks: [Book]
  }

  type Auth {
    token: ID
    user: User
  }

  input BookInput {
    bookId: String!
    authors: [String!]!
    title: String!
    description: String!
    image: String
    category: ID
  }

  type Chat {
    _id: ID!
    users: [User!]!
    messages: [ChatMessage!]!
  }

  type ChatMessage {
    _id: ID!
    chat: Chat!
    sender: User!
    text: String!
    timestamp: String!
  }

  type Query {
    categories: [Category]
    books(category: ID, title: String): [Book]
    book(_id: ID!): Book
    user(username: String!): User
    userById(userId: ID!): User
    userBooks(userId: ID!): [Book]
    chat(chatId: ID!): Chat
    userChats(userId: ID!): [Chat!]!
    chatMessages(chatId: ID!): [ChatMessage!]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookInput: BookInput!): Book
    updateUser(username: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int): Book
    deleteBook(_id: ID!): String
    login(email: String!, password: String!): Auth
    createChat(users: [ID!]!): Chat
    sendMessage(chatId: ID!, sender: ID!, text: String!): ChatMessage
  }
`

module.exports = typeDefs;
