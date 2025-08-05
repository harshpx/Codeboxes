"use client";
import AvatarSelector from "@/components/custom/AvatarSelector";
import Loader from "@/components/custom/Loader";
import StyledButton from "@/components/custom/StyledButton";
import { Card } from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useStateContext } from "@/context/StateContextProvider";
import useMediaQuery from "@/hooks/useMediaQuery";
import useNavigate from "@/hooks/useNavigate";
import Image from "next/image";
import { FC, useEffect } from "react";

const SettingsPage: FC = () => {
  const { user, isAuthorized, logout } = useAuthContext();
  const { loading, setLoading } = useStateContext();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  const toSentenceCase = (str: string | undefined) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      {loading && <Loader />}
      <div className="grow w-full p-4 flex flex-col items-center">
        <Card className="grow w-full sm:w-[600px] px-1 gap-4 justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={user?.dp || "/codeboxes-cyan.png"}
              alt={user?.username?.toUpperCase().charAt(0) || "User's DP"}
              className="mt-6"
              width={isLargeScreen ? 200 : 150}
              height={isLargeScreen ? 200 : 150}
            />
            <AvatarSelector className="-mt-6 lg:-mt-8" />
            {user?.username ? (
              <div>{`Hi ${toSentenceCase(user?.username)}!`}</div>
            ) : (
              <div>{`<Couldn't load username>`}</div>
            )}
          </div>
          <StyledButton onClick={logout}>Logout</StyledButton>
        </Card>
      </div>
    </>
  );
};

export default SettingsPage;
