"use client";
import { useStateContext } from "@/context/StateContextProvider";
import { useRouter } from "next/navigation";

const useNavigate = () => {
  const router = useRouter();
  const { setLoading } = useStateContext();

  const navigate = (page: string) => {
    setLoading(true);
    router.push(page);
  };

  return navigate;
};

export default useNavigate;
