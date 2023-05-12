import { NextRouter } from "next/router";
import cookie from "js-cookie";
import { auth } from "utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// utils
import isEmpty from "lodash/isEmpty";
// types
import { SIGN_UP } from "graphql/mutations/auth";
import type MessageApi from "antd/lib/message";
import { apolloClient } from "graphql/apolloClient";
import { FIND_USER_BY_EMAIL } from "graphql/queries/user";
import { IUser } from "models/User";

type GoogleLoginProps = {
  setLoading: (loading: boolean) => void;
  setShowLogin: (showLogin: boolean) => void;
  setUser: (user: IUser) => void;
  message: typeof MessageApi;
  router: NextRouter;
};

export const signInWithGoogle = ({
  setLoading,
  setShowLogin,
  setUser,
  message,
  router,
}: GoogleLoginProps) => {
  const provider = new GoogleAuthProvider().setCustomParameters({
    prompt: "select_account",
  });
  signInWithPopup(auth, provider)
    .then(async (result: any) => {
      setLoading(true);
      const googleUser = result.user;
      const { data, error } = await apolloClient.query<{ userByEmail: IUser }>({
        query: FIND_USER_BY_EMAIL,
        variables: { email: googleUser.email },
        errorPolicy: "all",
      });

      if (error) {
        console.log(error);
        return;
      }
      const currUser = data?.userByEmail;

      if (!currUser) {
        const { data } = await apolloClient.mutate<{ createUser: IUser }>({
          mutation: SIGN_UP,
          variables: {
            input: {
              name: googleUser.displayName,
              password: googleUser.uid,
              email: googleUser.email,
              firebaseId: googleUser.uid,
            },
          },
        });

        const newUser = data?.createUser;
        if (!newUser) {
          setLoading(false);
          message.error("Something went wrong. Please try again.");
          return;
        }
        setUser(newUser);
        saveUserAndToken(newUser, googleUser.accessToken);
        message.success("Login success.");
        setShowLogin(false);
        router.push("/tasks");
        return;
      }
      setUser(data.userByEmail);
      setLoading(false);
      saveUserAndToken(data.userByEmail, googleUser.accessToken);
      message.success("Login success.");
      setShowLogin(false);
      router.push("/tasks");
    })
    .then((error) => {
      console.log(error);
      setLoading(false);
    });
};

export const setCookie = (key: string, value: string) => {
  if (typeof window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const setLocalStorage = (key: string, value: string) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const saveUserAndToken = (user: any, token: string) => {
  setCookie("token", token);
  setLocalStorage("user", user);
  setLocalStorage("registered", user?.createdAt);
};

export const getCookie = (key: string, req?: any) => {
  return cookie.get(key);
};

export const currAuthUser = () => {
  if (typeof window) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      const userString: any = localStorage.getItem("user");

      if (userString && userString !== "undefined") {
        const userObj = JSON.parse(userString);
        return userObj;
      }
      return undefined;
    }
  }
  return undefined;
};

export const isAuth = () => currAuthUser() !== undefined;

export const removeCookie = (key: string) => {
  if (typeof window) {
    cookie.remove(key);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window) {
    localStorage.removeItem(key);
  }
};

export const logout = (router: NextRouter) => {
  removeCookie("token");
  removeLocalStorage("user");
  router.push("/login");
};
