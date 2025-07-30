"use client";
import { Button } from "@/components/ui/button";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeProvider";
import { FC } from "react";

const ThemeSwitch2: FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="
        rounded-full p-2 cursor-pointer box-border
        bg-gradient-to-r from-sky-400 to-purple-400
        hover:bg-gradient-to-r hover:from-purple-500 hover:to-sky-500
        dark:bg-gradient-to-r dark:from-sky-500 dark:to-purple-500
        dark:hover:bg-gradient-to-r dark:hover:from-purple-500 dark:hover:to-sky-500
        text-white
      "
    >
      {theme === "dark" ? (
        <FiSun className="text-2xl" />
      ) : (
        <FiMoon className="text-2xl" />
      )}
    </Button>
  );
};

export default ThemeSwitch2;
