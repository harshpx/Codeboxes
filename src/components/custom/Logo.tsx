"use client";

import Image from "next/image";
import Icon from "@/assets/icon.png";
import useMediaQuery from "@/hooks/useMediaQuery";
// size: 'sm' | 'md' | 'lg'
// style: 'inline' | 'block'
const Logo = ({
  size,
  style,
}: {
  size: "sm" | "md" | "lg";
  style: "inline" | "block";
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div
      className={`flex items-center justify-center gap-2
         ${style === "inline" ? "flex-row" : ""} ${
           style === "block" ? "flex-col" : ""
         }`}
    >
      <Image
        src={Icon}
        alt="Logo"
        className={`${size === "sm" ? "size-7" : ""}${
          size === "md" ? "size-12" : ""
        }${size === "lg" ? "size-16" : ""}`}
      />
      {!isMobile && (
        <div className="flex flex-col text-right justify-center">
          <p
            className={`text-white leading-5 ${size === "sm" ? " text-lg font-[400]" : ""}${
              size === "md" ? " text-2xl" : ""
            }${size === "lg" ? " text-4xl" : ""}`}
          >
            Codeboxes
          </p>
          <p className="text-[10px] mr-0.5">by Harsh Priye</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
