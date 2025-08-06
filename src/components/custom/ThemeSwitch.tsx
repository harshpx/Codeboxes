"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { FC } from "react";
import { Moon, Sun } from "lucide-react";

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
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeSwitch;
