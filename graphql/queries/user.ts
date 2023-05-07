import { gql } from "@apollo/client";

export const FIND_USER_BY_EMAIL = gql`
  query userByEmail($email: String!) {
    id
    name
    email
    firebaseId
    createdAt
    updatedAt
  }
`;
