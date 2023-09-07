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
    author: String
    description: String
    condition: String
    image: String
    category: Category
  }

  type User {
    _id: ID
    username: String
    email: String
    books: [Book]
  }

  type Auth {
    token: ID
    user: User
  }

  input BookInput {
    title: String
    author: String
    description: String
    condition: String
    image: String
    categoryId: ID
  }

  type Chat {
    _id: ID
    sender: User
    receiver: User
    message: String
    timestamp: String
  }

  type Query {
    categories: [Category]
    books(category: ID, title: String): [Book]
    book(_id: ID!): Book
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookInput: BookInput!): Book
    updateUser(username: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int): Book
    login(email: String!, password: String!): Auth
    createChat(sender: ID!, receiver: ID!, message: String!): Chat
    sendMessage(chatId: ID!, message: String!): Chat
  }
`;

module.exports = typeDefs;
