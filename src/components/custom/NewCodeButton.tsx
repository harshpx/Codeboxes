"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FC } from "react";
import { Button } from "../ui/button";
import { defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import { LuPlus } from "react-icons/lu";

const NewCodeButton: FC = () => {
  const { setCodeObject } = useCodeContext();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleNewCode = () => {
    setCodeObject(defaultCodeObject);
  };
  return (
    <Button onClick={handleNewCode} variant="outline">
      <LuPlus />
      {!isSmallScreen && <p>New</p>}
    </Button>
  );
};

export default NewCodeButton;
