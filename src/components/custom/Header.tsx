"use client";
import TitleInput from "@/components/custom/TitleInput";
import { useAuthContext } from "@/context/AuthContextProvider";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { defaultCodeObject, useCodeContext } from "@/context/CodeContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import StyledButton from "./StyledButton";
import ThemeSwitch2 from "./ThemeSwitch2";
import LogoColored from "./LogoColored";
import Image from "next/image";
import useNavigate from "@/hooks/useNavigate";
import { Plus } from "lucide-react";

const Header: FC = () => {
  const { user, isAuthorized } = useAuthContext();
  const { setCodeObject } = useCodeContext();
  const pathName = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isTinyScreen = useMediaQuery("(max-width: 520px)");
  const navigate = useNavigate();

  const renderButtons = () => {
    if (isAuthorized) {
      return (
        <>
          {pathName === "/editor" && (
            <>
              <StyledButton onClick={() => navigate("/dashboard")}>
                <p className="text-[10px] font-[500]">&lt;/&gt;</p>
                <p>Codes</p>
              </StyledButton>
              <StyledButton
                onClick={() => navigate("/settings")}
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
          )}
          {pathName === "/dashboard" && (
            <>
              <StyledButton
                onClick={() => {
                  setCodeObject(defaultCodeObject);
                  navigate("/editor");
                }}
              >
                <Plus />
                <p>{isSmallScreen ? "New" : "New code"}</p>
              </StyledButton>
              <StyledButton
                onClick={() => navigate("/settings")}
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
          )}
          {pathName === "/settings" && (
            <>
              <StyledButton
                onClick={() => {
                  setCodeObject(defaultCodeObject);
                  navigate("/editor");
                }}
              >
                <Plus />
                <p>{isSmallScreen ? "New" : "New code"}</p>
              </StyledButton>
              <StyledButton onClick={() => navigate("/dashboard")}>
                <p className="text-[10px] font-[500]">&lt;/&gt;</p>
                <p>Codes</p>
              </StyledButton>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <StyledButton onClick={() => navigate("/auth")}>Login</StyledButton>
        </>
      );
    }
  };

  return (
    <header className="w-full h-[52px] px-4 gap-2 flex items-center justify-between bg-transparent overflow-auto">
      <div className="flex items-center gap-2 justify-start">
        <LogoColored
          size="sm"
          style="inline"
          // className="border border-white px-2 py-1 rounded-2xl h-full"
        />
      </div>
      {isAuthorized && pathName === "/editor" && !isTinyScreen && (
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
