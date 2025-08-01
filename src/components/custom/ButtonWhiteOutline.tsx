import { FC, ReactNode } from "react";
import { Button } from "../ui/button";

type ButtonWhiteOutlineProps = {
  onClick: () => void;
  children: ReactNode;
};

const ButtonWhiteOutline: FC<ButtonWhiteOutlineProps> = ({ onClick, children }) => {
  return (
    <Button
      onClick={onClick}
      className="
        rounded-full p-2 cursor-pointer box-border 
        text-white
        bg-transparent hover:bg-white/50
        border hover:border 
        border-white
      "
    >
      {children}
    </Button>
  );
};

export default ButtonWhiteOutline;
