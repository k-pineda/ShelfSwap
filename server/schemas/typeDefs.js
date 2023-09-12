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
    bookId:String
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
    userBooks(userId: ID!): [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookInput: BookInput!): Book
    updateUser(username: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int): Book
    deleteBook(_id: ID!): String
    login(email: String!, password: String!): Auth
    createChat(sender: ID!, receiver: ID!, message: String!): Chat
    sendMessage(chatId: ID!, message: String!): Chat
  }
`;

module.exports = typeDefs;
