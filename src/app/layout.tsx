import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import CodeContextProvider from "@/context/CodeContextProvider";
import AuthContextProvider from "@/context/AuthContextProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Codeboxes",
  description: "Online code editor designed for competitive programmers",
  icons: {
    icon: "/icon.avif",
    shortcut: "/icon.avif",
    apple: "/icon.avif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthContextProvider>
          <CodeContextProvider>
            <body className={`antialiased transition-all duration-400 ease-in-out`}>
              <div className="min-h-screen min-w-full flex flex-col bg-white dark:bg-[#1e1e1e]">
                {children}
                <Toaster />
              </div>
            </body>
          </CodeContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </html>
  );
}
