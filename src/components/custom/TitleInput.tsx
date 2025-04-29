"use client";
import { Input } from "@/components/ui/input";
import { useCodeContext } from "@/context/CodeContextProvider";

const TitleInput = () => {
  const { title, setTitle } = useCodeContext();
  return (
    <Input
      className="text-center shadow-none placeholder:text-neutral-300 placeholder:text-center border-0 focus-visible:border-2 focus-visible:border-neutral-100 hover:border hover:border-neutral-300"
      style={{ fontSize: "18px" }}
      placeholder="Enter title here..."
      value={title}
      onChange={e => setTitle(e.target.value)}
    />
  );
};

export default TitleInput;
