"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FlipWords } from "@/components/ui/flip-words";
import GradientTextShift from "@/components/ui/gradient-shift-text";
import { currentlySupportedLanguages } from "@/lib/utils";
import ThemeSwitch2 from "@/components/custom/ThemeSwitch2";
import { useAuthContext } from "@/context/AuthContextProvider";
import { FC, useEffect } from "react";
import Loader from "@/components/custom/Loader";
import { useStateContext } from "@/context/StateContextProvider";
import LogoColored from "@/components/custom/LogoColored";
import StyledButton from "@/components/custom/StyledButton";
import useNavigate from "@/hooks/useNavigate";
import { ArrowRight } from "lucide-react";

const Home: FC = () => {
  const { isAuthorized } = useAuthContext();
  const { loading, setLoading } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
    if (isAuthorized) {
      navigate("/dashboard");
    }
  }, [isAuthorized]);

  return (
    <>
      {loading && <Loader />}
      <BackgroundLines
        svgOptions={{ duration: 2 }}
        className="grow relative flex flex-col justify-center items-center"
      >
        <div className="absolute top-2 left-0 w-full justify-self-start h-[48px] px-4 py-2 gap-2 flex items-center justify-between bg-transparent">
          <LogoColored size="sm" style="inline" />
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
              words={currentlySupportedLanguages.map(lang => `.${lang}`)}
            />
            <div className="text-3xl">code</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="text-xl sm:text-2xl">instantly with </div>
            <GradientTextShift duration={2}>Codeboxes</GradientTextShift>
          </div>
          <div className="flex items-center gap-4">
            {/* add buttons here */}
            <StyledButton
              outerClassName="h-10 rounded-3xl"
              innerClassName="rounded-3xl"
              onClick={() => navigate("/auth")}
            >
              Login/Register
            </StyledButton>
            <StyledButton
              outerClassName="h-10 rounded-3xl"
              innerClassName="rounded-3xl"
              onClick={() => navigate("/editor")}
            >
              Try out now <ArrowRight />
            </StyledButton>
          </div>
        </div>
      </BackgroundLines>
    </>
  );
};

export default Home;
