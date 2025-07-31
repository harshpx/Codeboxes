"use client";
import { Button } from "@/components/ui/button";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeProvider";
import { FC } from "react";

const ThemeSwitch3: FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="
        rounded-full p-2 cursor-pointer box-border
        bg-white dark:bg-black
        hover:bg-white/80 dark:hover:bg-black/80
      "
    >
      {theme === "dark" ? (
        <FiSun className="text-2xl text-white" />
      ) : (
        <FiMoon className="text-2xl text-black" />
      )}
    </Button>
  );
};

export default ThemeSwitch3;
