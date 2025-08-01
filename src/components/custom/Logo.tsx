"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FC } from "react";
import { LuBoxes } from "react-icons/lu";

// size: 'sm' | 'md' | 'lg'
// style: 'inline' | 'block'

export type LogoComponentProps = {
  size: "sm" | "md" | "lg";
  style: "inline" | "block";
  fixColorWhite?: boolean;
};

const Logo: FC<LogoComponentProps> = ({ size, style, fixColorWhite = false }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div
      className={`flex items-center justify-center gap-2
         ${style === "inline" ? "flex-row" : ""} ${style === "block" ? "flex-col" : ""}`}
    >
      <LuBoxes
        size={size === "sm" ? 24 : size === "md" ? 30 : 40}
        className={`${fixColorWhite ? "text-white" : ""}`}
      />
      {!isMobile && (
        <div className="flex flex-col text-right justify-center">
          <p
            className={`${fixColorWhite ? "text-white" : ""} leading-5 ${size === "sm" ? " text-lg font-[400]" : ""}${
              size === "md" ? " text-3xl" : ""
            }${size === "lg" ? " text-4xl" : ""}`}
          >
            Codeboxes
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
