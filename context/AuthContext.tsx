import React, { useState, useEffect, createContext } from "react";
import { IUser } from "interfaces/User";
import { isAuth, removeCookie } from "utils/auth";
import message from 'antd/lib/message';
import { useRouter } from 'next/router';

type AuthContent = {
  user: IUser | undefined;
  setUser: (u: IUser | undefined) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  showRegister: boolean;
  setShowRegister: (show: boolean) => void;
  isLoggedin: boolean;
  setIsLoggedin: (show: boolean) => void;
  handleLogout: () => void;
};

const initialState = {
  user: undefined,
  setUser: () => {},
  showLogin: false,
  setShowLogin: () => {},
  showRegister: false,
  setShowRegister: () => {},
  isLoggedin: false,
  setIsLoggedin: () => {},
  handleLogout: () => {},
};

export const AuthContext = createContext<AuthContent>(initialState);

export const AuthProvider = ({ children }: { children: any }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (showLogin) setShowRegister(false);
    if (showRegister) setShowLogin(false);
  }, [showLogin, showRegister]);

  useEffect(() => {
    isAuth() && setIsLoggedin(true);
    // eslint-disable-next-line
  }, [isAuth()]);

  const handleLogout = () => {
    removeCookie("token");
    message.success("Successfully logged out");
    setIsLoggedin(false);
    router.push("/");
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    isLoggedin,
    setIsLoggedin,
    handleLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
