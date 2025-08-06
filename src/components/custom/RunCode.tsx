import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader";
import { compile } from "@/services/compile";
import { toast } from "sonner";
import { useStateContext } from "@/context/StateContextProvider";
import { Play } from "lucide-react";

const RunCode = () => {
  const { codeObject, setResult } = useCodeContext();
  const { loading, setLoading } = useStateContext();

  const runCode = async () => {
    try {
      setLoading(true);
      const res = await compile(codeObject.code, codeObject.language, codeObject.input);
      if (res?.success) {
        setResult(res.response);
        toast.success("Compilation successful!", {
          description: "Your code ran successfully.",
          duration: 2000,
        });
      } else {
        throw new Error(res?.response || "Compilation failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during compilation", {
        description: "Please try again.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="
          p-[1px] h-9 rounded-md box-border overflow-hidden 
          flex items-center justify-center
          bg-gradient-to-r from-cyan-500 to-purple-500
        "
      >
        <Button
          onClick={runCode}
          className="
            p-0 h-full border-0 rounded-md bg-white dark:bg-[#1e1e1e]
            text-black dark:text-white
            hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500
          "
        >
          Run
          <Play />
        </Button>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default RunCode;
