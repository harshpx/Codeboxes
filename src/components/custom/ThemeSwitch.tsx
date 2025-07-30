"use client";
import { Button } from "@/components/ui/button";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeProvider";
import { FC } from "react";

const ThemeSwitch: FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className="
        rounded-full p-2 cursor-pointer box-border 
        text-white
        bg-transparent hover:bg-white/50
        border hover:border 
        border-white
      "
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </Button>
  );
};

export default ThemeSwitch;
