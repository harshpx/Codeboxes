import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { IoPlay } from "react-icons/io5";
import { jdoodleLanguages, LanguageKeyType } from "@/lib/utils";
import Loader from "@/components/custom/Loader";
import { compile } from "@/services/compile";

const RunCode = () => {
  const { code, language, input, setResult, loading, setLoading } =
    useCodeContext();

  const runCode = async () => {
    try {
      setLoading(true);
      const response = await compile(
        code,
        jdoodleLanguages[language as LanguageKeyType],
        input,
      );
      if (response?.success) {
        setResult(response.response);
      } else {
        setResult({
          output: null,
          error: response?.response || "An error occurred",
          statusCode: response?.status,
          memory: "0",
          cpuTime: "0",
          compilationStatus: null,
          projectKey: null,
          isExecutionSuccess: false,
          isCompiled: false,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={runCode}
        variant="outline"
        className="flex items-center gap-2"
      >
        Run
        <IoPlay />
      </Button>
      {loading && <Loader />}
    </>
  );
};

export default RunCode;
