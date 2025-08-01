"use client";
import { boilerplates, LanguageType } from "@/lib/utils";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

export type CodeObjectType = {
  id: string;
  code: string;
  language: LanguageType;
  input: string;
  title: string;
};

export type EditorSettingsType = {
  fontSize: number;
  expectedOutput: string;
};

export type CompileResultType = {
  output: string | null;
  error: boolean;
};

/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
export const CodeContext = createContext({
  codeObject: {
    id: "",
    code: boilerplates["js"],
    language: "js",
    input: "",
    title: "",
  } as CodeObjectType,
  setCodeObject: (codeObject: CodeObjectType) => {},
  editorSettings: {
    fontSize: 16,
    expectedOutput: "",
  } as EditorSettingsType,
  setEditorSettings: (settings: EditorSettingsType) => {},
  result: null as CompileResultType | null,
  setResult: (result: CompileResultType | null) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
});

const CodeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [codeObject, setCodeObject] = useState<CodeObjectType>({
    id: "",
    code: boilerplates["js"],
    language: "js",
    input: "",
    title: "",
  });
  const [editorSettings, setEditorSettings] = useState<EditorSettingsType>({
    fontSize: 16,
    expectedOutput: "",
  });
  const [result, setResult] = useState<CompileResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedCodeObject = localStorage.getItem("codeObject");
      const storedEditorSettings = localStorage.getItem("editorSettings");

      if (storedCodeObject) setCodeObject(JSON.parse(storedCodeObject));
      if (storedEditorSettings) setEditorSettings(JSON.parse(storedEditorSettings));
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("codeObject", JSON.stringify(codeObject));
    localStorage.setItem("editorSettings", JSON.stringify(editorSettings));
  }, [codeObject, editorSettings]);

  return (
    <CodeContext.Provider
      value={{
        codeObject,
        setCodeObject,
        editorSettings,
        setEditorSettings,
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
