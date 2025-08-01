"use client";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const Dashboard: FC = () => {
  const { isAuthorized } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [isAuthorized]);

  return (
    <div className="grow flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-2 border-white">
        Code List
      </div>
    </div>
  );
};

export default Dashboard;
