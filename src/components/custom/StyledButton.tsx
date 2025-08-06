"use client";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";

type StyledButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  innerClassName?: string;
  outerClassName?: string;
};

const StyledButton: FC<StyledButtonProps> = ({
  children,
  onClick,
  innerClassName = "",
  outerClassName = "",
}) => {
  return (
    <div
      className={`
        z-10 px-[1px] py-[1px] h-9 rounded-3xl box-border overflow-hidden
        flex items-center justify-center
        bg-gradient-to-r from-cyan-500 to-purple-500
        transition-all duration-300 ease-in-out ${outerClassName}
      `}
    >
      <Button
        onClick={onClick}
        className={`
          rounded-4xl px-4 h-full border-0 bg-white dark:bg-[#1e1e1e]
          text-black dark:text-white
          hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500
          ${innerClassName}
        `}
      >
        {children}
      </Button>
    </div>
  );
};

export default StyledButton;
