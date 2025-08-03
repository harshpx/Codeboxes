"use client";

import { motion } from "framer-motion";
import { FC } from "react";

type GradientShiftTextProps = {
  children: string;
  textClassName?: string;
  containerClassName?: string;
  duration?: number;
};

const GradientTextShift: FC<GradientShiftTextProps> = ({
  children,
  textClassName = "text-5xl font-[500]",
  containerClassName,
  duration = 1,
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent ${containerClassName}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration,
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
