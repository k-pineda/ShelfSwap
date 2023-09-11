import { gql } from '@apollo/client';


export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_USERS_BOOKS = gql`
query getUserOwnedBooks($userId: ID!) {
  userBooks(userId: $userId) {
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

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
    username
    email
    ownedBooks {
        _id
        title
        author
        description
        image
      }
      }
    }
`;
