"use client";
import { boilerplates, LanguageKeyType } from "@/lib/utils";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// export type jdoodleCompileResultType = {
//   output: string | null;
//   error: string | null;
//   statusCode: number;
//   memory: string;
//   cpuTime: string;
//   compilationStatus: string | null;
//   projectKey: string | null;
//   isExecutionSuccess: boolean;
//   isCompiled: boolean;
// };

export type CompileResultType = {
  output: string | null;
  error: boolean;
};

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const CodeContext = createContext({
  code: "",
  setCode: (code: string) => {},
  fontSize: 14,
  setFontSize: (fontSize: number) => {},
  language: "C++",
  setLanguage: (language: LanguageKeyType) => {},
  title: "",
  setTitle: (title: string) => {},
  input: "",
  setInput: (input: string) => {},
  result: {} as CompileResultType | null,
  setResult: (result: CompileResultType | null) => {},
  expectedOutput: "",
  setExpectedOutput: (expectedOutput: string) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
});

const CodeContextProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageKeyType>("Javascript");
  const [code, setCode] = useState<string>(
    boilerplates[language as LanguageKeyType],
  );
  const [fontSize, setFontSize] = useState<number>(16);
  const [title, setTitle] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<CompileResultType | null>(null);
  const [expectedOutput, setExpectedOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedCode = localStorage.getItem("code");
      const storedLanguage = localStorage.getItem("language");
      const storedFontSize = localStorage.getItem("fontSize");
      const storedTitle = localStorage.getItem("title");
      const storedInput = localStorage.getItem("input");

      if (storedCode) setCode(JSON.parse(storedCode));
      if (storedLanguage) setLanguage(JSON.parse(storedLanguage));
      if (storedFontSize) setFontSize(JSON.parse(storedFontSize));
      if (storedTitle) setTitle(JSON.parse(storedTitle));
      if (storedInput) setInput(storedInput);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("code", JSON.stringify(code));
    localStorage.setItem("language", JSON.stringify(language));
    localStorage.setItem("fontSize", JSON.stringify(fontSize));
    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("input", input);
  }, [code, language, fontSize, title, input]);

  return (
    <CodeContext.Provider
      value={{
        code,
        setCode,
        fontSize,
        setFontSize,
        language,
        setLanguage,
        title,
        setTitle,
        input,
        setInput,
        expectedOutput,
        setExpectedOutput,
        result,
        setResult,
        loading,
        setLoading,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export default CodeContextProvider;

export const useCodeContext = () => {
  return useContext(CodeContext);
};
