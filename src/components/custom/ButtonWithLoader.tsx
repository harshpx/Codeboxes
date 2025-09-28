"use client";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

type ButtonWithLoaderProps = {
  children: ReactNode;
  loading: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const ButtonWithLoader: FC<ButtonWithLoaderProps> = ({
  children,
  loading,
  className,
  onClick,
  type = "button",
}) => {
  return (
    <Button type={type} className={className} onClick={onClick}>
      {loading ? <Loader className="w-4 aspect-square animate-spin text-md" /> : children}
    </Button>
  );
};

export default ButtonWithLoader;
