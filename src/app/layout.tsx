import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import ThemeProvider from "@/context/ThemeProvider";
import Header from "@/components/custom/Header";
import CodeContextProvider from "@/context/CodeContextProvider";

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
          <CodeContextProvider>
            <div className="min-h-screen min-w-full flex flex-col">
              <Header />
              {children}
            </div>
          </CodeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
