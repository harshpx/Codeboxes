import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { IoPlay } from "react-icons/io5";
import Loader from "@/components/custom/Loader";
import { compile } from "@/services/compile";
import { toast } from "sonner";

const RunCode = () => {
  const { codeObject, setResult, loading, setLoading } = useCodeContext();

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
      <Button
        onClick={runCode}
        variant="outline"
        className="
          flex items-center gap-2 border-2 border-cyan-500 dark:border-cyan-500 
          hover:bg-cyan-500
          dark:hover:bg-cyan-500
          hover:text-white"
      >
        Run
        <IoPlay />
      </Button>
      {loading && <Loader />}
    </>
  );
};

export default RunCode;
