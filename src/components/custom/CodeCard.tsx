"use client";
import { CodeObjectType } from "@/context/CodeContextProvider";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTheme } from "@/context/ThemeProvider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight, materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { syntaxHighlighterLanguage } from "@/lib/utils";

type CodeCardProps = {
  codeObject: CodeObjectType;
};

const CodeCard: FC<CodeCardProps> = ({ codeObject }) => {
  const { theme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{codeObject.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <SyntaxHighlighter
          language={syntaxHighlighterLanguage[codeObject.language]}
          style={theme === "dark" ? materialDark : materialLight}
        >
          {codeObject.code}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
};

export default CodeCard;
