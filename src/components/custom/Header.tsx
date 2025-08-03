"use client";
import Logo from "@/components/custom/Logo";
import ThemeSwitch from "./ThemeSwitch";
import TitleInput from "@/components/custom/TitleInput";
import { useAuthContext } from "@/context/AuthContextProvider";
import { usePathname, useRouter } from "next/navigation";
import ButtonWhiteOutline from "./ButtonWhiteOutline";
import { FC } from "react";

const Header: FC = () => {
  const { isAuthorized } = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();

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
        {pathName === "/editor" ? (
          isAuthorized ? (
            <ButtonWhiteOutline onClick={() => router.push("/dashboard")}>Codes</ButtonWhiteOutline>
          ) : (
            <ButtonWhiteOutline onClick={() => router.push("/auth")}>Login</ButtonWhiteOutline>
          )
        ) : null}
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
