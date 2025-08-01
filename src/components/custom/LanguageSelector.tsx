import { languages, boilerplates, currentlySupportedLanguages, LanguageKeyType } from "@/lib/utils";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HiChevronUpDown } from "react-icons/hi2";
import { HiCheck } from "react-icons/hi";
import { useCodeContext } from "@/context/CodeContextProvider";

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { codeObject, setCodeObject } = useCodeContext();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size={"sm"}
          className="w-[150px] justify-between"
        >
          {codeObject.language}
          <HiChevronUpDown className="shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 overflow-y-auto scrollbar-hidden"
        side="right"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty className="opacity-50 p-1 text-sm">No language found.</CommandEmpty>
            <CommandGroup>
              {Object.keys(languages).map(lang => (
                <CommandItem
                  disabled={!currentlySupportedLanguages.includes(lang as LanguageKeyType)}
                  key={lang as LanguageKeyType}
                  value={lang as LanguageKeyType}
                  onSelect={currentValue => {
                    setCodeObject({
                      ...codeObject,
                      language: currentValue as LanguageKeyType,
                      code: boilerplates[currentValue as LanguageKeyType],
                    });
                    setOpen(false);
                  }}
                >
                  {lang}
                  <HiCheck
                    className={`ml-auto ${codeObject.language === lang ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
