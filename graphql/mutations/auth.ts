import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation CreateUser($input: NewUser!) {
    createUser(input: $input) {
      id
      name
      email
      firebaseId
      createdAt
      updatedAt
    }
  }
`;
