"use client";
import CodeCard from "@/components/custom/CodeCard";
import Loader from "@/components/custom/Loader";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useCodeContext } from "@/context/CodeContextProvider";
import { useStateContext } from "@/context/StateContextProvider";
import useNavigate from "@/hooks/useNavigate";
import { FC, useEffect } from "react";

const Dashboard: FC = () => {
  const { isAuthorized } = useAuthContext();
  const { codeList } = useCodeContext();
  const { loading, setLoading } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    if (!isAuthorized) {
      navigate("/");
    }
  }, [isAuthorized]);

  return (
    <>
      {loading && <Loader />}
      <div className="px-4 py-4 grow flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch justify-center">
          <CodeCard />
          {codeList?.map((code, idx) => (
            <CodeCard key={idx} codeObject={code} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
