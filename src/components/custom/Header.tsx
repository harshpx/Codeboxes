"use client";
import TitleInput from "@/components/custom/TitleInput";
import { useAuthContext } from "@/context/AuthContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import StyledButton from "./StyledButton";
import { LuPlus } from "react-icons/lu";
import ThemeSwitch2 from "./ThemeSwitch2";
import LogoColored from "./LogoColored";
import Image from "next/image";

const Header: FC = () => {
  const { user, isAuthorized } = useAuthContext();
  const { setCodeObject } = useCodeContext();
  const router = useRouter();
  const pathName = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const renderButtons = () => {
    if (isAuthorized) {
      return (
        <>
          {pathName === "/editor" && (
            <StyledButton onClick={() => router.push("/dashboard")}>
              <p className="text-[10px] font-[500]">&lt;/&gt;</p>
              <p>Codes</p>
            </StyledButton>
          )}
          {pathName === "/dashboard" && (
            <StyledButton
              onClick={() => {
                setCodeObject(defaultCodeObject);
                router.push("/editor");
              }}
            >
              <LuPlus />
              <p>{isSmallScreen ? "New" : "New code"}</p>
            </StyledButton>
          )}
          <StyledButton
            onClick={() => router.push("/settings")}
            innerClassName="flex items-center gap-2 pl-0"
          >
            <Image
              src={user?.dp || "/codeboxes-cyan.png"}
              alt="User Avatar"
              width={45}
              height={45}
            />
            <p>{user?.username}</p>
          </StyledButton>
        </>
      );
    } else {
      return (
        <>
          <StyledButton onClick={() => router.push("/auth")}>Login</StyledButton>
        </>
      );
    }
  };

  return (
    <header className="w-full h-[52px] px-4 gap-2 flex items-center justify-between bg-transparent">
      <div className="flex items-center gap-2 justify-start">
        <LogoColored
          size="sm"
          style="inline"
          // className="border border-white px-2 py-1 rounded-2xl h-full"
        />
      </div>
      {isAuthorized && pathName === "/editor" && (
        <div className="grow">
          <TitleInput />
        </div>
      )}
      <div className="flex items-center gap-2 justify-end">
        {renderButtons()}
        <ThemeSwitch2 />
      </div>
    </header>
  );
};

export default Header;
