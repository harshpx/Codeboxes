"use client";
import { CodeObjectType, defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTheme } from "@/context/ThemeProvider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { syntaxHighlighterLanguage } from "@/lib/utils";
import { FiPlusCircle } from "react-icons/fi";
import useNavigate from "@/hooks/useNavigate";

type CodeCardProps = {
  codeObject?: CodeObjectType;
  outerClassName?: string;
  innerClassName?: string;
};

const CodeCard: FC<CodeCardProps> = ({ codeObject, outerClassName = "", innerClassName = "" }) => {
  const { theme } = useTheme();
  const { setCodeObject } = useCodeContext();
  const navigate = useNavigate();

  const cardClickHandler = () => {
    setCodeObject(codeObject || defaultCodeObject);
    navigate("/editor");
  };

  return (
    <div
      className={`
        p-[1px] w-full shadow-xl rounded-2xl box-border overflow-hidden 
        flex items-center justify-center
        border dark:border-0
        bg-neutral-100 dark:bg-black
        hover:bg-gradient-to-b hover:from-cyan-500 hover:to-purple-500
        hover:scale-105 transition-all duration-300 ease-in-out ${outerClassName}
      `}
    >
      <Card
        onClick={cardClickHandler}
        className={`
          h-full w-full gap-1 px-6 py-6 cursor-pointer 
          ${codeObject ? "bg-neutral-100 dark:bg-black" : "bg-transparent"}
          ${innerClassName}
        `}
      >
        {codeObject && (
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-[400] truncate whitespace-nowrap overflow-hidden">
              {codeObject.title}
            </CardTitle>
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
              <FiPlusCircle size={60} className="text-white" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeCard;
