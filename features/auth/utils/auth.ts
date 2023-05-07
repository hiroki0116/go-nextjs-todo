import { NextRouter } from "next/router";
import cookie from "js-cookie";
import { auth } from "utils/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// utils
import isEmpty from "lodash/isEmpty";
// types
import type MessageApi from "antd/lib/message";
import type { User } from "models/User";

type GoogleLoginProps = {
  setLoading: (loading: boolean) => void;
  setShowLogin: (showLogin: boolean) => void;
  setUser: (user: User) => void;
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
      const user = result.user;
      // graphql getUserByemail
      // const { data } = await APIWithoutAuth.get(`/users?email=${user.email}`);

      if (isEmpty(data.user)) {
        // graphql signup
        // const { data } = await APIWithoutAuth.post("/users/signup", {
        //   email: user.email,
        //   name: user.displayName,
        //   firebaseUID: user.uid,
        // });
        setUser(data.user);
        saveUserAndToken(data.user, user.accessToken);
        message.success("Login success.");
        setShowLogin(false);
        router.push("/tasks");
        return;
      }
      setUser(data.user);
      setLoading(false);
      saveUserAndToken(data.user, user.accessToken);
      message.success("Login success.");
      setShowLogin(false);
      router.push("/tasks");
    })
    .catch((error) => {
      message.error(error.message);
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
