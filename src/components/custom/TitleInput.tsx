"use client";
import { Input } from "@/components/ui/input";
import { useCodeContext } from "@/context/CodeContextProvider";
import { useState } from "react";

const TitleInput = () => {
  const { codeObject, setCodeObject } = useCodeContext();
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div
      className={`
        h-9 rounded-2xl p-[1.5px] 
        ${inputFocused ? "bg-gradient-to-r from-cyan-500 to-purple-500" : "bg-neutral-100 dark:bg-neutral-800"}
        box-border overflow-hidden flex items-center justify-center
      `}
    >
      <Input
        className={`
        h-full rounded-2xl shadow-none text-center
        placeholder:text-neutral-700 dark:placeholder:text-neutral-300 placeholder:text-center placeholder:italic
        border-0 border-neutral-300 focus-visible:ring-0 focus-visible:border-0 focus-visible:border-neutral-100 
        text-sm sm:text-lg md:text-lg lg:text-lg placeholder:text-sm sm:placeholder:text-md md:placeholder:text-md
        bg-neutral-100 dark:bg-neutral-800
      `}
        placeholder="Enter title here..."
        value={codeObject.title}
        onChange={e => setCodeObject({ ...codeObject, title: e.target.value || "" })}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
    </div>
  );
};

export default TitleInput;
