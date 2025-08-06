import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContextProvider";
import { CodeObjectType, defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import { useStateContext } from "@/context/StateContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import useNavigate from "@/hooks/useNavigate";
import { deleteCode } from "@/services/code";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const DeleteCodeButton = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const { codeObject, setCodeObject, codeList, setCodeList } = useCodeContext();
  const { user, logout } = useAuthContext();
  const { setLoading } = useStateContext();
  const navigate = useNavigate();

  const handleCodeDelete = async () => {
    if (!!user && !!user.token && codeObject.id) {
      try {
        setLoading(true);
        const res = await deleteCode(codeObject.id, user.token);
        if (res.success) {
          const updatedCodeList: CodeObjectType[] | null =
            codeList?.filter(code => code.id !== codeObject.id) || null;
          setCodeList(updatedCodeList);
          setCodeObject(defaultCodeObject);
          navigate("/dashboard");
          toast.success("Code deleted successfully", {
            duration: 2000,
            description: "Your code has been deleted",
          });
        } else if (res.status === 401) {
          logout();
        } else {
          throw new Error(res.message || "Failed to delete code");
        }
      } catch (error) {
        toast.error((error as Error).message || "An error occurred while deleting the code", {
          duration: 2000,
          description: "Please try again",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button onClick={handleCodeDelete} variant="outline">
      <Trash />
      {!isSmallScreen && <p>Delete</p>}
    </Button>
  );
};

export default DeleteCodeButton;
