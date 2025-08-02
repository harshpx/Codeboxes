"use client";
import CodeCard from "@/components/custom/CodeCard";
import Loader from "@/components/custom/Loader";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useCodeContext } from "@/context/CodeContextProvider";
import { getCodes } from "@/services/code";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { toast } from "sonner";

const Dashboard: FC = () => {
  const { isAuthorized, user, codeList, setCodeList, logout } = useAuthContext();
  const { loading, setLoading } = useCodeContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      router.push("/dashboard");
      // fetch codes on startup or if codeList is null
      if (!codeList) {
        (async () => {
          try {
            setLoading(true);
            const res = await getCodes(user?.token || "");
            if (res.success) {
              setCodeList(res.response);
            } else if (res.status === 401) {
              logout();
            } else {
              throw new Error(res.response || "Unxepected error occured");
            }
          } catch (error) {
            toast.error("Unable to fetch codes", {
              description: (error as Error).message,
              duration: 2000,
            });
          } finally {
            setLoading(false);
          }
        })();
      }
    } else {
      router.push("/");
    }
  }, [isAuthorized]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-4 py-6 grow flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch justify-center">
        <CodeCard />
        {codeList?.map((code, idx) => (
          <CodeCard key={idx} codeObject={code} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
