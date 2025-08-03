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
        rounded-3xl p-2 cursor-pointer box-border
        bg-gradient-to-r from-sky-500 to-purple-500
        hover:bg-gradient-to-r hover:from-purple-500 hover:to-sky-500
        text-white
      "
    >
      {theme === "dark" ? <FiSun className="text-2xl" /> : <FiMoon className="text-2xl" />}
    </Button>
  );
};

export default ThemeSwitch2;
