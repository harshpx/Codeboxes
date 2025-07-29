"use client";

import { motion } from "framer-motion";
import { FC } from "react";

type GradientShiftTextProps = {
  children: string;
  textClassName?: string;
  containerClassName?: string;
};

const GradientTextShift: FC<GradientShiftTextProps> = ({
  children,
  textClassName = "text-5xl font-[500]",
  containerClassName = "",
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-purple-500 via-emerald-500 to-cyan-400 bg-clip-text text-transparent ${containerClassName}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "300% 300%",
        display: "inline-block",
      }}
    >
      <div className={`${textClassName}`}>{children}</div>
    </motion.span>
  );
};

export default GradientTextShift;
