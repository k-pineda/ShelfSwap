const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
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

  type Order {
    _id: ID
    purchaseDate: String
    books: [Book]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input BookInput {
    _id: ID
    title: String
    # author: String
    # description: String
    # condition: String
    # ^^^^ not sure if these need to be added here please check
    image: String
  }

  type Query {
    categories: [Category]
    books(category: ID, title: String): [Book]
    book(_id: ID!): Book
    user: User
    order(_id: ID!): Order
    checkout(books: [BookInput]): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(books: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateBook(_id: ID!): Book
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
