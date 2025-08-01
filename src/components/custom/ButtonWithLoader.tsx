"use client";
import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type ButtonWithLoaderProps = {
  children: ReactNode;
  loading: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const ButtonWithLoader: FC<ButtonWithLoaderProps> = ({
  children,
  loading,
  className,
  type = "button",
}) => {
  return (
    <Button type={type} className={className}>
      {loading ? <Loader2 className="w-4 aspect-square animate-spin text-md" /> : children}
    </Button>
  );
};

export default ButtonWithLoader;
