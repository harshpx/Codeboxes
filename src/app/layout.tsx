import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import CodeContextProvider from "@/context/CodeContextProvider";
import AuthContextProvider from "@/context/AuthContextProvider";

export const metadata: Metadata = {
  title: "Codeboxes",
  description: "Online code editor designed for competitive programmers",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <AuthContextProvider>
            <CodeContextProvider>
              <div className="min-h-screen min-w-full flex flex-col">
                {children}
              </div>
            </CodeContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
