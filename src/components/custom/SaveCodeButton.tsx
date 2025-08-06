"use client";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContextProvider";
import { CodeObjectType, useCodeContext } from "@/context/CodeContextProvider";
import { createCode, updateCode } from "@/services/code";
import { toast } from "sonner";
import Loader from "./Loader";
import { FC } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useStateContext } from "@/context/StateContextProvider";
import useNavigate from "@/hooks/useNavigate";
import { Save } from "lucide-react";

const SaveCodeButton: FC = () => {
  const { isAuthorized, user, logout } = useAuthContext();
  const { loading, setLoading } = useStateContext();
  const { codeObject, codeList, setCodeList } = useCodeContext();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!isAuthorized) return;
    // Validate codeObject
    if (!codeObject.code) {
      toast.error("Code cannot be empty!", {
        duration: 2000,
        description: "Please write some code before saving.",
      });
      return;
    }
    if (!codeObject.title) {
      toast.error("Title cannot be empty!", {
        duration: 2000,
        description: "Please provide a title for your code.",
      });
      return;
    }
    try {
      setLoading(true);
      if (codeObject.id) {
        const existingCode = codeList?.find(code => code.id === codeObject.id);
        if (JSON.stringify(existingCode) === JSON.stringify(codeObject)) {
          toast.info("Make some changes to re-save code", {
            duration: 2000,
            description: "Your code is already up to date.",
          });
          return;
        }
        // Update existing code
        const res = await updateCode(codeObject, user?.token || "");
        if (res.success) {
          const updatedCode: CodeObjectType = res.response;
          const updatedCodeList: CodeObjectType[] | null =
            codeList?.map(code => (code.id === updatedCode.id ? updatedCode : code)) || null;
          setCodeList(updatedCodeList);
        } else if (res.status === 401) {
          toast.error("Session expired, please login again.", {
            duration: 2000,
            description: "Your session has expired, please login again.",
          });
          logout();
          return;
        } else {
          throw new Error(res.message || "Failed to update code.");
        }
      } else {
        // Create new code
        const res = await createCode(codeObject, user?.token || "");
        if (res.success) {
          const newCode: CodeObjectType = res.response;
          const updatedCodeList: CodeObjectType[] | null = codeList
            ? [...codeList, newCode]
            : [newCode];
          setCodeList(updatedCodeList);
        } else if (res.status === 401) {
          toast.error("Session expired, please login again.", {
            duration: 2000,
            description: "Your session has expired, please login again.",
          });
          logout();
          return;
        } else {
          throw new Error(res.message || "Failed to create code.");
        }
      }
      toast.success("Code saved successfully!", {
        duration: 2000,
        description: "Your code has been saved.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error((error as Error).message || "An error occurred while saving the code.", {
        duration: 2000,
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Button onClick={handleSave} variant="outline">
        <Save />
        {!isSmallScreen && <p>Save</p>}
      </Button>
    </>
  );
};

export default SaveCodeButton;
