import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { auth } from "./firebase";
import { getCookie, setCookie, isAuth } from "../features/auth/utils/auth";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
});

const getToken = async (): Promise<string> => {
  const user = auth.currentUser;
  if (!user) {
    return isAuth() ? (getCookie("token") as string) : "";
  }
  const token = await user.getIdToken(true);
  setCookie("token", token);
  return token;
};

const authLink = setContext(async () => {
  return {
    headers: {
      Authorization: await getToken(),
    },
  };
});

const options = {
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        Tasks: {
          merge: true,
        },
      },
    },
  },
};

const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(options),
});

function createApolloClient() {
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(options),
  });
}

export { apolloClient, createApolloClient };
