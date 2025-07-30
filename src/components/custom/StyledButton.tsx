"use client";
import { FC, ReactNode } from "react";

type StyledButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

const StyledButton: FC<StyledButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="z-10 cursor-pointer p-[2px] rounded-4xl hover:text-white bg-gradient-to-r from-cyan-600 to-cyan-400"
    >
      <div className="bg-white dark:bg-black hover:bg-transparent hover:dark:bg-transparent px-4 py-2 rounded-4xl flex items-center gap-1">
        {children}
      </div>
    </button>
  );
};

export default StyledButton;
