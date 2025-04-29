import { useCodeContext } from "@/context/CodeContextProvider";
import { Button } from "@/components/ui/button";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FontSizeButtons = () => {
  const { fontSize, setFontSize } = useCodeContext();

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    if (fontSize > 1) {
      setFontSize(fontSize - 1);
    }
  };

  return (
    <div className="flex">
      <Button
        variant="outline"
        className="rounded-r-none border-r-0"
        onClick={decreaseFontSize}
        disabled={fontSize <= 14}
      >
        <FaMinus />
      </Button>
      <Button
        variant="outline"
        className="rounded-l-none"
        onClick={increaseFontSize}
        disabled={fontSize >= 24}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default FontSizeButtons;
