"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LuPencil } from "react-icons/lu";
import { avatarList } from "@/lib/utils";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useStateContext } from "@/context/StateContextProvider";
import { updateAvatar } from "@/services/user";
import { toast } from "sonner";
import StyledButton from "./StyledButton";

type AvatarSelectorProps = {
  className?: string;
};

const AvatarSelector: FC<AvatarSelectorProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { user, setUser, logout } = useAuthContext();
  const { setLoading } = useStateContext();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const updateAvatarHandler = async (newUrl: string) => {
    if (!user || !user.dp || user.dp === newUrl) {
      setOpen(false);
      return;
    }
    try {
      setLoading(true);
      const res = await updateAvatar(user.token, newUrl);
      if (res.success) {
        setUser({ ...user, dp: newUrl });
        toast.success("Avatar updated successfully!", {
          duration: 2000,
        });
      } else if (res.status === 401) {
        toast.error("Session expired. Please log in again.", {
          duration: 2000,
        });
        logout();
      } else {
        throw new Error(res.message || "Failed to update avatar");
      }
    } catch (error) {
      toast.error((error as Error).message || "An error occurred while updating avatar", {
        duration: 2000,
        description: "Please try again",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <LuPencil
          onClick={() => setOpen(true)}
          className={`
            text-black dark:text-white
            bg-neutral-100 dark:bg-black w-10 h-8 p-1 
            lg:w-12 lg:h-9 lg:p-2 
            border-2 border-neutral-700 dark:border-white rounded-full cursor-pointer 
            ${className}
          `}
        />
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:w-fit rounded-xl">
        <DialogHeader>
          <DialogTitle>Choose your Avatar</DialogTitle>
          <DialogDescription>Select an avatar from the options below</DialogDescription>
        </DialogHeader>
        <div className={`px-6 grid grid-cols-4 gap-3 items-center justify-center `}>
          {avatarList.map((item, index) => (
            <Image
              key={index}
              src={item}
              alt="avatar"
              width={isLargeScreen ? 80 : 70}
              height={isLargeScreen ? 80 : 70}
              className={`rounded-full cursor-pointer ${
                item === user?.dp
                  ? "border-2 border-white p-0.5"
                  : "hover:border-2 hover:border-neutral-500 p-0.5 transition-all duration-100"
              }`}
              onClick={() => {
                updateAvatarHandler(item);
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarSelector;
