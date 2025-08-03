import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { LuAArrowDown, LuAArrowUp } from "react-icons/lu";

const FontSizeButtons = () => {
  const { editorSettings, setEditorSettings } = useCodeContext();

  const increaseFontSize = () => {
    setEditorSettings({
      ...editorSettings,
      fontSize: editorSettings.fontSize + 1,
    });
  };

  const decreaseFontSize = () => {
    if (editorSettings.fontSize > 1) {
      setEditorSettings({
        ...editorSettings,
        fontSize: editorSettings.fontSize - 1,
      });
    }
  };

  return (
    <div className="flex">
      <Button
        variant="outline"
        className="rounded-r-none"
        onClick={decreaseFontSize}
        disabled={editorSettings.fontSize <= 14}
      >
        <LuAArrowDown />
      </Button>
      <Button
        variant="outline"
        className="rounded-none border-l-0 border-r-0 cursor-default text-center w-4"
      >
        {editorSettings.fontSize}
      </Button>
      <Button
        variant="outline"
        className="rounded-l-none"
        onClick={increaseFontSize}
        disabled={editorSettings.fontSize >= 24}
      >
        <LuAArrowUp />
      </Button>
    </div>
  );
};

export default FontSizeButtons;
