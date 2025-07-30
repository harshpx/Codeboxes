import Logo from "@/components/custom/Logo";
import ThemeSwitch from "./ThemeSwitch";
// import TitleInput from "@/components/custom/TitleInput";

const Header = () => {
  return (
    <header className="w-full h-[48px] px-4 gap-2 flex items-center justify-between bg-gradient-to-r from-sky-500 via-[#007cc4] to-purple-500">
      <Logo size="sm" style="inline" />
      {/* <div className="w-[80%]">
        <TitleInput />
      </div> */}
      <div className="flex items-center gap-2">
        {/* <Button
          className="
            rounded-full cursor-pointer box-border 
            text-white
            bg-[#007cc4] hover:bg-[#86b6d1]
            border hover:border 
            border-white
          "
        >
          Login
        </Button> */}
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
