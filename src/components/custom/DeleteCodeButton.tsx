import { Button } from "@/components/ui/button";
import { IoTrashBin } from "react-icons/io5";

const DeleteCodeButton = () => {
  return (
    <Button variant="outline">
      <IoTrashBin />
    </Button>
  );
};

export default DeleteCodeButton;
