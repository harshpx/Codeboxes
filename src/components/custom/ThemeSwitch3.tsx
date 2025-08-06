"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { FC } from "react";
import { Moon, Sun } from "lucide-react";

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
        <Sun className="text-2xl text-white" />
      ) : (
        <Moon className="text-2xl text-black" />
      )}
    </Button>
  );
};

export default ThemeSwitch3;
