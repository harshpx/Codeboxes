"use client";
import { CodeObjectType, defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTheme } from "@/context/ThemeProvider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { syntaxHighlighterLanguage } from "@/lib/utils";
import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

type CodeCardProps = {
  codeObject?: CodeObjectType;
};

const CodeCard: FC<CodeCardProps> = ({ codeObject }) => {
  const { theme } = useTheme();
  const { setCodeObject } = useCodeContext();
  const router = useRouter();

  const cardClickHandler = () => {
    setCodeObject(codeObject || defaultCodeObject);
    router.push("/editor");
  };

  return (
    <Card
      onClick={cardClickHandler}
      className="w-full aspect-square gap-1 px-6 py-6 cursor-pointer bg-neutral-100 dark:bg-black border-0 shadow-xl hover:border-2 hover:border-cyan-500 hover:scale-105 transition-all duration-200 ease-in"
    >
      {codeObject && (
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-[400]">{codeObject.title}</CardTitle>
          <p className="text-sm italic text-neutral-700 dark:text-neutral-400">{`${codeObject.language}`}</p>
        </CardHeader>
      )}
      <CardContent className="grow p-0 overflow-hidden">
        {codeObject ? (
          <SyntaxHighlighter
            language={syntaxHighlighterLanguage[codeObject.language]}
            style={theme === "dark" ? vscDarkPlus : vs}
            customStyle={{
              overflow: "hidden",
              height: "100%",
              border: "none",
            }}
          >
            {codeObject.code}
          </SyntaxHighlighter>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <FiPlusCircle size={60} className="text-neutral-700 dark:text-neutral-300" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeCard;
