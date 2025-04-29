import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { IoPlay } from "react-icons/io5";
import { jdoodleLanguages, LanguageKeyType } from "@/lib/utils";
import Loader from "@/components/custom/Loader";

const RunCode = () => {
  const { code, language, input, setResult, loading, setLoading } =
    useCodeContext();

  const runCode = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: jdoodleLanguages[language as LanguageKeyType],
          input,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setResult(result.data);
      } else {
        console.error("Error:", result?.message || "Unknown error");
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
