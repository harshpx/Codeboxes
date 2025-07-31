"use client";
import { Input } from "@/components/ui/input";
import { useCodeContext } from "@/context/CodeContextProvider";

const TitleInput = () => {
  const { codeObject, setCodeObject } = useCodeContext();
  return (
    <Input
      className="text-center shadow-none placeholder:text-neutral-300 placeholder:text-center border-0 focus-visible:border-2 focus-visible:border-neutral-100 hover:border hover:border-neutral-300"
      style={{ fontSize: "18px" }}
      placeholder="Enter title here..."
      value={codeObject.title}
      onChange={e =>
        setCodeObject({ ...codeObject, title: e.target.value || "" })
      }
    />
  );
};

export default TitleInput;
