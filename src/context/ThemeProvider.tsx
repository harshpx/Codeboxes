"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const ThemeContext = createContext({
  theme: "dark",
  setTheme: (theme: "light" | "dark") => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, modifyTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme as "light" | "dark");
    } else {
      const userPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const initialTheme = userPrefersDark ? "dark" : "light";
      setTheme(initialTheme);
    }
  }, []);

  const setTheme = (theme: "light" | "dark") => {
    modifyTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
