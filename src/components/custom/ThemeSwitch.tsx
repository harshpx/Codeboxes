"use client";
import { Button } from "@/components/ui/button";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeProvider";

const ThemeSwitch = () => {
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
        bg-[#007cc4] hover:bg-[#86b6d1]
        border hover:border 
        border-white
      "
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </Button>
  );
};

export default ThemeSwitch;
