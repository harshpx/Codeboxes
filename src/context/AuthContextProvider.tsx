"use client";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { setCookie, getCookie, removeCookie } from "typescript-cookie";
import { CodeObjectType } from "./CodeContextProvider";
import { getUserDetails } from "@/services/user";
import { toast } from "sonner";
import { getCodes } from "@/services/code";

export type UserType = {
  id: string;
  username: string;
  email: string;
  dp: string;
  token: string;
};

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const AuthContext = createContext({
  user: null as UserType | null,
  setUser: (user: UserType | null) => {},
  codeList: null as CodeObjectType[] | null,
  setCodeList: (codeList: CodeObjectType[] | null) => {},
  logout: () => {},
  isAuthorized: false,
  loading: false,
  setLoading: (loading: boolean) => {},
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [codeList, setCodeList] = useState<CodeObjectType[] | null>(null);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    removeCookie("user");
    setUser(null);
    setCodeList(null);
  };

  useEffect(() => {
    const storedUser: UserType | null = JSON.parse(getCookie("user") || "null");
    if (!!storedUser && !!storedUser.token) {
      (async () => {
        try {
          setLoading(true);
          const getUserResponse = await getUserDetails(storedUser.token);
          if (getUserResponse.success) {
            const reValidatedUser: UserType = getUserResponse.response;
            setUser(reValidatedUser);
          } else {
            throw new Error(
              getUserResponse.message || "Token expired or validation failed, please login again.",
            );
          }
        } catch (error) {
          logout();
          toast.error((error as Error).message || "Token expired, please login again.", {
            duration: 2000,
            description: "Your session has expired, please login again.",
          });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!!user && !!user.token) {
      setCookie("user", JSON.stringify(user), {
        expires: 10,
      });
      (async () => {
        try {
          setLoading(true);
          const getCodesResponse = await getCodes(user?.token || "");
          if (getCodesResponse.success) {
            setCodeList(getCodesResponse.response);
          } else if (getCodesResponse.status === 401) {
            toast.error("Session expired, please login again.", {
              duration: 2000,
              description: "Your session has expired, please login again.",
            });
            logout();
          } else {
            throw new Error(getCodesResponse.message || "Failed to fetch codes.");
          }
        } catch (error) {
          toast.error((error as Error).message || "An error occurred while fetching codes.", {
            duration: 2000,
            description: "Please try again later.",
          });
        } finally {
          setLoading(false);
        }
      })();
    } else {
      removeCookie("user");
    }
  }, [user]);

  const isAuthorized = !!user && !!user.token;

  return (
    <AuthContext.Provider
      value={{ user, setUser, codeList, setCodeList, logout, isAuthorized, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
