import { useCodeContext } from "@/context/CodeContextProvider";
import { boilerplates } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import { RotateCcw } from "lucide-react";

const ResetButton = () => {
  const { codeObject, setCodeObject, codeList, editorSettings, setEditorSettings, setResult } =
    useCodeContext();
  const { isAuthorized } = useAuthContext();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleReset = () => {
    if (!isAuthorized || codeObject.id === "" || !codeList || codeList.length === 0) {
      setCodeObject({
        ...codeObject,
        code: boilerplates[codeObject.language],
        input: "",
        title: "",
      });
    } else {
      const existingCode = codeList.find(code => code.id === codeObject.id);
      if (existingCode) {
        setCodeObject(existingCode);
      } else {
        setCodeObject({
          ...codeObject,
          code: boilerplates[codeObject.language],
          input: "",
          title: "",
        });
      }
    }
    setEditorSettings({
      ...editorSettings,
      expectedOutput: "",
    });
    setResult(null);
  };

  return (
    <Button variant="outline" onClick={handleReset}>
      <RotateCcw />
      {!isSmallScreen && <p>Reset</p>}
    </Button>
  );
};

export default ResetButton;
