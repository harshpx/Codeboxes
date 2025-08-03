"use client";
import { Card } from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const SettingsPage: FC = () => {
  const { user, isAuthorized, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/settings");
    } else {
      logout();
      router.push("/");
    }
  }, [isAuthorized]);

  return (
    <div className="grow w-full p-4 flex flex-col items-center">
      <Card className="grow w-full sm:w-[600px] px-4 items-center">
        <Image
          src={user?.dp || "/codeboxes-cyan.png"}
          alt={user?.username?.toUpperCase().charAt(0) || "User's DP"}
          className="mt-6"
          width={40}
          height={40}
        />
      </Card>
    </div>
  );
};

export default SettingsPage;
