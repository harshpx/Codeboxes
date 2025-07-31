"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FlipWords } from "@/components/ui/flip-words";
import GradientTextShift from "@/components/ui/gradient-shift-text";
import { currentlySupportedLanguages, languageExtensions } from "@/lib/utils";
import { LanguageKeyType } from "@/lib/utils";
import StyledButton from "@/components/custom/StyledButton";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ThemeSwitch2 from "@/components/custom/ThemeSwitch2";
import Logo from "@/components/custom/Logo";

const Home = () => {
  const router = useRouter();
  return (
    <BackgroundLines
      svgOptions={{ duration: 2 }}
      className="grow relative flex flex-col justify-center items-center"
    >
      <div className="absolute top-2 left-0 w-full justify-self-start h-[48px] px-4 py-2 gap-2 flex items-center justify-between bg-transparent">
        <Logo size="sm" style="inline"/>
        <div className="z-10 transition-all duration-400 ease-in-out">
          <ThemeSwitch2 />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-baseline gap-5">
          <div className="text-3xl">Run</div>
          <FlipWords
            duration={1000}
            className="text-3xl text-white px-2 py-2 rounded-xl bg-gradient-to-r from-[#007cc4] to-purple-500"
            words={currentlySupportedLanguages.map(
              lang => `.${languageExtensions[lang as LanguageKeyType]}`,
            )}
          />
          <div className="text-3xl">code</div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="text-xl sm:text-2xl">instantly with </div>
          <GradientTextShift>Codeboxes</GradientTextShift>
        </div>
        <div className="flex items-center gap-4">
          {/* add buttons here */}
          <StyledButton onClick={() => router.push("/auth")}>
            Login/Register
          </StyledButton>
          <StyledButton onClick={() => router.push("/editor")}>
            Try out now <ArrowRight />
          </StyledButton>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default Home;
