import { useCodeContext } from "@/context/CodeContextProvider";
import { boilerplates } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiResetLeftFill } from "react-icons/ri";
import { useAuthContext } from "@/context/AuthContextProvider";
import { getCodeById } from "@/services/code";
import { toast } from "sonner";

const ResetButton = () => {
  const { codeObject, setCodeObject, editorSettings, setEditorSettings, setResult, setLoading } =
    useCodeContext();
  const { isAuthorized, user, logout } = useAuthContext();

  const handleReset = async () => {
    if (!isAuthorized || codeObject.id === "") {
      setCodeObject({
        ...codeObject,
        code: boilerplates[codeObject.language],
        input: "",
        title: "",
      });
    } else {
      try {
        setLoading(true);
        const res = await getCodeById(codeObject.id, user?.token || "");
        if (res.success) {
          setCodeObject(res.response);
        } else if (res.status === 401) {
          logout();
        } else {
          throw new Error(res.response || "Unable to fetch last saved code");
        }
      } catch (error) {
        toast.error("Failed to fetch", {
          description: (error as Error).message,
          duration: 2000,
        });
      } finally {
        setLoading(false);
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
