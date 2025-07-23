"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTheme } from "@/context/ThemeProvider";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { languages, LanguageKeyType } from "@/lib/utils";
import LanguageSelector from "@/components/custom/LanguageSelector";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useCodeContext } from "@/context/CodeContextProvider";
import RunCode from "@/components/custom/RunCode";
import { Button } from "@/components/ui/button";
import FontSizeButtons from "@/components/custom/FontSizeButtons";
import { LuChevronsLeftRight } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import ResetButton from "@/components/custom/ResetButton";

const Home = () => {
  const {
    language,
    fontSize,
    code,
    setCode,
    input,
    setInput,
    result,
    setResult,
    expectedOutput,
    setExpectedOutput,
  } = useCodeContext();
  const { theme } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [showTestcaseResult, setShowTestcaseResult] = useState(false);

  useEffect(() => {
    setShowTestcaseResult(true);
  }, [result]);

  return (
    <div className="h-[calc(100vh-48px)] w-full flex flex-col items-center">
      <ResizablePanelGroup
        id="editorPanelGroup"
        direction={isSmallScreen ? "vertical" : "horizontal"}
        className="w-full h-full grow gap-0.5"
      >
        <ResizablePanel
          id="editorPanel"
          order={1}
          defaultSize={70}
          className="w-full h-full"
        >
          <div className="w-full h-full flex flex-col gap-2 dark:bg-[#1e1e1e] p-2">
            <div className="w-full flex flex-wrap gap-1 sm:gap-4 justify-between sm:justify-start items-center px-0 sm:px-4 ">
              <LanguageSelector />
              <FontSizeButtons />
              <ResetButton />
              {/* <SaveCodeButton /> */}
              {/* <DeleteCodeButton /> */}
              <RunCode />
            </div>
            <div className="grow">
              <Editor
                defaultLanguage={languages[language as LanguageKeyType]}
                language={languages[language as LanguageKeyType]}
                height="100%"
                theme={theme === "dark" ? "vs-dark" : "light"}
                defaultValue=""
                onChange={value => setCode(value as string)}
                value={code}
                options={{
                  fontSize: fontSize,
                  placeholder: "Write your code here...",
                }}
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle
          id="editorSeparator"
          className="bg-[#007cc4] dark:bg-neutral-400"
        >
          <LuChevronsLeftRight />
        </ResizableHandle>
        <ResizablePanel
          id="panel2"
          order={2}
          defaultSize={30}
          className="w-full h-full"
        >
          <ResizablePanelGroup
            id="ioPanelGroup"
            direction={isSmallScreen ? "horizontal" : "vertical"}
            className="w-full h-full gap-0.5"
          >
            <ResizablePanel
              id="inputPanel"
              order={1}
              defaultSize={isSmallScreen ? 50 : 30}
              className="w-full h-full dark:bg-[#1e1e1e]"
            >
              <div className="h-full w-full flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 p-2">
                  <h2 className="text-lg italic dark:text-neutral-300">
                    Input
                  </h2>
                </div>
                <div className="text-sm overflow-auto grow">
                  <Textarea
                    placeholder="Type your inputs here ..."
                    className="bg-transparent min-h-full w-full dark:bg-[#1e1e1e] border-none focus-visible:ring-0 focus-visible:border-none"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle
              id="ioSeparator1"
              className="bg-[#007cc4] dark:bg-neutral-400"
            >
              <LuChevronsLeftRight />
            </ResizableHandle>
            {!isSmallScreen && (
              <>
                <ResizablePanel
                  id="expectedOutputPanel"
                  order={2}
                  defaultSize={isSmallScreen ? 0 : 30}
                  className="w-full h-full dark:bg-[#1e1e1e]"
                >
                  <div className="h-full w-full flex flex-col gap-2">
                    <div className="flex items-center justify-between p-2 gap-2">
                      <h2 className="text-lg italic dark:text-neutral-300">
                        Expected output
                      </h2>
                      {showTestcaseResult &&
                        result?.output &&
                        expectedOutput && (
                          <div>
                            {result.output.trim() === expectedOutput.trim() ? (
                              <div className="px-3 py-1 text-green-500 rounded-[6px] bg-green-500/20 text-sm">
                                Passed
                              </div>
                            ) : (
                              <div className="px-3 py-1 text-red-500 rounded-[6px] bg-red-500/20 text-sm">
                                Failed
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                    <div className="text-sm overflow-auto grow">
                      <Textarea
                        placeholder="Type here ..."
                        className="bg-transparent min-h-full w-full dark:bg-[#1e1e1e] border-none focus-visible:ring-0 focus-visible:border-none"
                        value={expectedOutput}
                        onChange={e => {
                          setExpectedOutput(e.target.value);
                          setShowTestcaseResult(false);
                        }}
                      />
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle
                  id="ioSeparator2"
                  className="bg-[#007cc4] dark:bg-neutral-400"
                >
                  <LuChevronsLeftRight />
                </ResizableHandle>
              </>
            )}
            <ResizablePanel
              id="outputPanel"
              order={3}
              defaultSize={isSmallScreen ? 50 : 40}
              className="w-full h-full dark:bg-[#1e1e1e]"
            >
              <div className="h-full w-full flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg italic dark:text-neutral-300">
                    Output
                  </h2>
                  <Button variant="outline" onClick={() => setResult(null)}>
                    Clear
                  </Button>
                </div>
                <div className="text-sm overflow-auto grow">
                  {result?.output ? (
                    result?.output
                      ?.trim()
                      ?.split("\n")
                      ?.map((line: string, index: number) => (
                        <p key={index}>{line}</p>
                      ))
                  ) : (
                    <p className="text-neutral-400 dark:text-neutral-500">
                      {`Nothing to show :(`}
                    </p>
                  )}
                </div>
                {result && (
                  <div className="flex items-center justify-between text-sm text-neutral-400 dark:text-neutral-500">
                    <div className="flex items-center gap-2">
                      <p className="italic">CPU time:</p>
                      <p>{result?.cpuTime}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="italic">Memory usage:</p>
                      <p>{result?.memory}</p>
                    </div>
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Home;
