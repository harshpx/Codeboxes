import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { IoPlay } from "react-icons/io5";
import { languageExtensions, LanguageKeyType } from "@/lib/utils";
import Loader from "@/components/custom/Loader";
import { compile } from "@/services/compile";

const RunCode = () => {
  const { code, language, input, setResult, loading, setLoading } =
    useCodeContext();

  const runCode = async () => {
    try {
      setLoading(true);
      const res = await compile(
        code,
        languageExtensions[language as LanguageKeyType],
        input,
      );
      if (res?.success) {
        setResult(res.response);
      } else {
        setResult({
          output: null,
          error: res?.response?.error || "An error occurred",
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
