"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FC } from "react";
import { Button } from "../ui/button";
import { defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import { Plus } from "lucide-react";

const NewCodeButton: FC = () => {
  const { setCodeObject } = useCodeContext();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleNewCode = () => {
    setCodeObject(defaultCodeObject);
  };
  return (
    <Button onClick={handleNewCode} variant="outline">
      <Plus />
      {!isSmallScreen && <p>New</p>}
    </Button>
  );
};

export default NewCodeButton;
