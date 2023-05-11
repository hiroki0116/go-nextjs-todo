import { gql } from "@apollo/client";

export const FIND_USER_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
      firebaseId
      createdAt
      updatedAt
    }
  }
`;
