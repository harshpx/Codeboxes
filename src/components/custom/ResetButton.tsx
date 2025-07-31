import { useCodeContext } from "@/context/CodeContextProvider";
import { boilerplates } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiResetLeftFill } from "react-icons/ri";

const ResetButton = () => {
  const {
    codeObject,
    setCodeObject,
    editorSettings,
    setEditorSettings,
    setResult,
  } = useCodeContext();
  const handleReset = () => {
    setCodeObject({
      ...codeObject,
      code: boilerplates[codeObject.language],
      input: "",
      title: "",
    });
    setEditorSettings({
      ...editorSettings,
      expectedOutput: "",
    });
    setResult(null);
  };

  return (
    <Button variant="outline" onClick={handleReset}>
      <RiResetLeftFill />
    </Button>
  );
};

export default ResetButton;
