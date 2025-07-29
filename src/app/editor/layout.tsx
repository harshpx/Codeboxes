import Header from "@/components/custom/Header";
import { ReactNode } from "react";

export default function InnerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen min-w-full flex flex-col">
      <Header />
      {children}
    </div>
  );
}
