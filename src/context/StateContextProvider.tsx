"use client";

import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const StateContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return <StateContext.Provider value={{ loading, setLoading }}>{children}</StateContext.Provider>;
};

export const useStateContext = () => {
  return useContext(StateContext);
};

export default StateProvider;
