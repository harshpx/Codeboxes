"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

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
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
