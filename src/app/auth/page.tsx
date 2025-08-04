"use client";
import Logo from "@/components/custom/Logo";
import ThemeSwitch2 from "@/components/custom/ThemeSwitch2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FC, useEffect, useState } from "react";
import { motion } from "motion/react";
import ThemeSwitch3 from "@/components/custom/ThemeSwitch3";
import LoginForm from "@/components/custom/LoginForm";
import SignupForm from "@/components/custom/SignupForm";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    value: "login",
    label: "Login",
    description: "Login with your Username or Email",
    content: <LoginForm />,
    footer: {
      text: "First time?",
      link: "Signup!",
    },
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
  {
    value: "signup",
    label: "Signup",
    description: "Enter your credentials to signup",
    content: <SignupForm />,
    footer: {
      text: "Already registered?",
      link: "Login!",
    },
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
];

const AuthPage: FC = () => {
  // const isMobile = useMediaQuery("(max-width: 640px)");
  // const isSmallScreen = useMediaQuery("(max-width: 450px)");
  const { isAuthorized } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/dashboard");
    }
  }, [isAuthorized]);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [activePage, setActivePage] = useState("login");

  return (
    <div className="relative grow w-full flex flex-col items-center justify-center transition-all duration-400 ease-in">
      <div
        className={`${isLargeScreen ? "absolute top-0 left-0" : "bg-gradient-to-l from-[#007cc4] to-purple-500"} px-4 py-4 w-full flex items-center justify-between ${activePage === "signup" && isLargeScreen ? "" : "flex-row-reverse"}`}
      >
        {isLargeScreen ? <ThemeSwitch2 /> : <ThemeSwitch3 />}
        {!isLargeScreen && <Logo size="sm" style="inline" fixColorWhite={true} />}
      </div>
      <div
        className={`grow flex justify-center items-stretch w-full p-4 py-5 transition-all duration-400 ease-in ${!isLargeScreen ? "bg-gradient-to-l from-[#007cc4] to-purple-500" : ""}`}
      >
        {isLargeScreen && (
          <div
            className={`z-20 relative w-1/2 bg-gradient-to-b from-[#007cc4] to-purple-500 rounded-2xl flex flex-col items-center justify-center gap-4 transition-transform duration-500 ease-in-out ${activePage === "signup" && isLargeScreen ? "translate-x-full" : "translate-x-0"}`}
          >
            <div className="absolute top-4 left-4">
              <Logo size="sm" style="inline" fixColorWhite={true} />
            </div>
            <p className="text-5xl text-white text-center font-[200]">
              {activePage === "login" ? "Welcome back to" : "Get started with"}
            </p>
            <div className="text-5xl text-white font-semibold">Codeboxes</div>
            <p className="font-[200] text-white w-2/3 text-center">
              {activePage === "login"
                ? "Login to save your code securely!"
                : "Sign up with us & explore a new way of running and saving code snippets!"}
            </p>
            <div className="absolute bottom-10 w-full flex items-center justify-center gap-2 text-[14px] text-white">
              <p>
                {activePage === "login" ? "Don't have an account?" : "Have an account already?"}
              </p>
              <Button
                onClick={() => {
                  setActivePage(activePage === "login" ? "signup" : "login");
                }}
                className="bg-transparent text-white border-1 border-white dark:border-white hover:bg-white/20"
              >
                {activePage === "login" ? "Signup" : "Login"}
              </Button>
              <p>{activePage === "login" ? "to get started!" : "and continue!"}</p>
            </div>
          </div>
        )}
        <div
          className={`
            ${isLargeScreen ? "w-1/2 self-center" : "w-full sm:w-[600px] self-start"} 
            flex flex-col items-center justify-center py-4 rounded-xl
            transition-transform duration-500 ease-in-out 
            ${isLargeScreen ? "bg-none" : "bg-white dark:bg-[#1e1e1e]"}
            ${activePage === "signup" && isLargeScreen ? "-translate-x-full" : "translate-x-0"}
          `}
        >
          {!isLargeScreen && (
            <div className="flex flex-col gap-2 items-center justify-center">
              <p className="text-2xl font-[200]">
                {activePage === "login" ? "Welcome back to" : "Get started with"}
              </p>

              <div className="text-3xl font-semibold">Codeboxes</div>
            </div>
          )}
          <Tabs
            value={activePage}
            onValueChange={setActivePage}
            className="p-4 w-full sm:w-[600px] flex flex-col items-center"
          >
            {!isLargeScreen && (
              <TabsList className="grid grid-cols-2 w-full sm:w-[400px] h-10">
                {tabs.map((tab, key) => (
                  <TabsTrigger className="" key={key} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            )}
            {tabs.map((tab, key) => (
              <TabsContent key={key} value={tab?.value} className="w-full">
                <motion.div initial={tab.initial} animate={tab.animate} transition={tab.transition}>
                  <Card className="border-none bg-transparent shadow-none">
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{tab?.label}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        <span>{tab?.description}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{tab?.content}</CardContent>
                    <CardFooter className="justify-center">
                      <div className="flex gap-1 text-[14px]">
                        <div>{tab?.footer?.text}</div>
                        <div
                          className="text-[#27a6ff] cursor-pointer hover:underline"
                          onClick={() => setActivePage(tab?.value === "login" ? "signup" : "login")}
                        >
                          {tab?.footer?.link}
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
