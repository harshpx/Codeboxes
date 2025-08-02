"use client";
import Logo from "@/components/custom/Logo";
import ThemeSwitch from "./ThemeSwitch";
import TitleInput from "@/components/custom/TitleInput";
import { useAuthContext } from "@/context/AuthContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import ButtonWhiteOutline from "./ButtonWhiteOutline";

const Header = () => {
  const { isAuthorized } = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    console.log(pathName);
  }, [pathName]);
  return (
    <header className="w-full h-[48px] px-4 gap-2 flex items-center justify-between bg-gradient-to-r from-sky-500 via-[#007cc4] to-purple-500">
      <div className="flex items-center gap-2 justify-start">
        <Logo size="sm" style="inline" fixColorWhite={true} />
      </div>
      <div className="flex items-center gap-2 justify-center">
        {isAuthorized && pathName === "/editor" && (
          <div className="w-[80%]">
            <TitleInput />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 justify-end">
        {isAuthorized && pathName === "/editor" && (
          <ButtonWhiteOutline onClick={() => router.push("/dashboard")}>Codes</ButtonWhiteOutline>
        )}
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
