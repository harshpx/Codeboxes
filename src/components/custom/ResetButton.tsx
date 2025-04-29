import { useCodeContext } from "@/context/CodeContextProvider";
import { boilerplates, LanguageKeyType } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiResetLeftFill } from "react-icons/ri";

const ResetButton = () => {
  const { language, setCode, setInput, setExpectedOutput, setResult } =
    useCodeContext();
  const handleReset = () => {
    setCode(boilerplates[language as LanguageKeyType]);
    setInput("");
    setExpectedOutput("");
    setResult(null);
  };

  return (
    <Button variant="outline" onClick={handleReset}>
      <RiResetLeftFill />
    </Button>
  );
};

export default ResetButton;
