// client/src/components/ui/AnimatedCard.tsx

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { fadeUp } from "../../lib/motion";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
};

const AnimatedCard = ({
  children,
  className = "",
}: AnimatedCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;