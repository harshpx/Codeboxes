import { useCodeContext } from "@/context/CodeContextProvider";
import { boilerplates } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiResetLeftFill } from "react-icons/ri";
import { useAuthContext } from "@/context/AuthContextProvider";

const ResetButton = () => {
  const { codeObject, setCodeObject, editorSettings, setEditorSettings, setResult } =
    useCodeContext();
  const { isAuthorized, codeList } = useAuthContext();

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
      <RiResetLeftFill />
    </Button>
  );
};

export default ResetButton;
