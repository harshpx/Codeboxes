"use client";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { setCookie, getCookie, removeCookie } from "typescript-cookie";
import { CodeObjectType, useCodeContext } from "./CodeContextProvider";
import { getUserDetails } from "@/services/user";
import { toast } from "sonner";
import { getCodes } from "@/services/code";
import { useStateContext } from "./StateContextProvider";

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
  logout: () => {},
  isAuthorized: false,
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const { setLoading } = useStateContext();
  const { codeObject, setCodeObject, setCodeList } = useCodeContext();

  const logout = () => {
    removeCookie("user");
    setUser(null);
    setCodeList(null);
    setCodeObject({ ...codeObject, id: "", title: "" });
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
            const fetchedCodes: CodeObjectType[] = getCodesResponse.response?.map(
              ({ createdBy, ...rest }: CodeObjectType) => rest,
            );
            setCodeList(fetchedCodes);
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
    <AuthContext.Provider value={{ user, setUser, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  return useContext(AuthContext);
};
