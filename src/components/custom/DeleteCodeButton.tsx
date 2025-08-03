import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContextProvider";
import { CodeObjectType, defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import { useStateContext } from "@/context/StateContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import { deleteCode } from "@/services/code";
import { useRouter } from "next/navigation";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "sonner";

const DeleteCodeButton = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const { codeObject, setCodeObject, codeList, setCodeList } = useCodeContext();
  const { user, logout } = useAuthContext();
  const { setLoading } = useStateContext();
  const router = useRouter();

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
          router.push("/dashboard");
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
      <IoTrashBin />
      {!isSmallScreen && <p>Delete</p>}
    </Button>
  );
};

export default DeleteCodeButton;
