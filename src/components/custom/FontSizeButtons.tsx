import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { FaPlus, FaMinus } from "react-icons/fa6";

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
        className="rounded-r-none border-r-0"
        onClick={decreaseFontSize}
        disabled={editorSettings.fontSize <= 14}
      >
        <FaMinus />
      </Button>
      <Button
        variant="outline"
        className="rounded-l-none"
        onClick={increaseFontSize}
        disabled={editorSettings.fontSize >= 24}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default FontSizeButtons;
