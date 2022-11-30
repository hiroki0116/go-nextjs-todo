import React, { useState, useEffect, createContext } from 'react';
import { IUser } from 'interfaces/User';

type AuthContent = {
    user: IUser|undefined;
    setUser: (u: IUser|undefined) => void;
    showLogin: boolean;
    setShowLogin: (show: boolean) => void;
    showRegister: boolean;
    setShowRegister: (show: boolean) => void;
}

const initialState = {
    user: undefined,
    setUser: () => {},
    showLogin: false,
    setShowLogin: () => {},
    showRegister: false,
    setShowRegister: () => {}
}

export const AuthContext = createContext<AuthContent>(initialState);


export const AuthProvider = ({ children }: {children: any;}) => {
    const [user, setUser] = useState<IUser|undefined>(undefined);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        if (showLogin)setShowRegister(false);
        if (showRegister)setShowLogin(false);
      }, [showLogin, showRegister]);

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}