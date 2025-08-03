"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FC } from "react";

// size: 'sm' | 'md' | 'lg'
// style: 'inline' | 'block'

export type LogoComponentProps = {
  size: "sm" | "md" | "lg";
  style: "inline" | "block";
  className?: string;
};

const LogoColored: FC<LogoComponentProps> = ({ size, style, className = "" }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div
      className={`
        flex items-center justify-center gap-2 
        bg-gradient-to-r from-cyan-600  to-purple-500 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-purple-400 bg-clip-text text-transparent
        ${style === "inline" ? "flex-row" : "flex-col"} 
        ${className}
      `}
    >
      <div className="flex flex-col text-right justify-center">
        <p
          className={`text-nowrap font-[500] leading-5 ${size === "sm" ? " text-lg font-[400]" : ""}${
            size === "md" ? " text-3xl" : ""
          }${size === "lg" ? " text-4xl" : ""}`}
        >
          {isMobile ? "</>" : "</> Codeboxes"}
        </p>
      </div>
    </div>
  );
};

export default LogoColored;
