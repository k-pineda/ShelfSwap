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
    firstName: String
    lastName: String
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

  type Query {
    categories: [Category]
    books(category: ID, title: String): [Book]
    book(_id: ID!): Book
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addBook(bookInput: BookInput!): Book
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateBook(_id: ID!, quantity: Int): Book
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
