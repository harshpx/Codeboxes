import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import CodeContextProvider from "@/context/CodeContextProvider";
import AuthContextProvider from "@/context/AuthContextProvider";
import { Toaster } from "@/components/ui/sonner";
import StateProvider from "@/context/StateContextProvider";

export const metadata: Metadata = {
  title: "Codeboxes",
  description: "Online code editor designed for competitive programmers",
  icons: {
    icon: "/codeboxes-cyan.png",
    shortcut: "/codeboxes-cyan.png",
    apple: "/codeboxes-cyan.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <StateProvider>
        <ThemeProvider>
          <CodeContextProvider>
            <AuthContextProvider>
              <body className={`antialiased transition-all duration-400 ease-in-out`}>
                <div className="min-h-screen min-w-full flex flex-col bg-white dark:bg-[#1e1e1e]">
                  {children}
                  <Toaster />
                </div>
              </body>
            </AuthContextProvider>
          </CodeContextProvider>
        </ThemeProvider>
      </StateProvider>
    </html>
  );
}
