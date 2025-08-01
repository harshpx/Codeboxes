"use client";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { setCookie, getCookie, removeCookie } from "typescript-cookie";

export type UserType = {
  id: string;
  username: string;
  email: string;
  token: string;
};

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const AuthContext = createContext({
  user: null as UserType | null,
  setUser: (user: UserType | null) => {},
  logout: () => {},
  isAuthorized: false,
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const logout = () => {
    removeCookie("user");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = JSON.parse(getCookie("user") || "null");
    if (storedUser) {
      setUser(storedUser as UserType | null);
    }
  }, []);

  useEffect(() => {
    if (!!user && !!user.token) {
      setCookie("user", JSON.stringify(user), {
        expires: 10,
      });
    } else {
      removeCookie("user");
    }
  }, [user]);

  const isAuthorized = !!user && !!user.token;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
