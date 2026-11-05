"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { type ReactNode, useRef } from "react";

/** Vertical rail whose accent fill grows as the visitor scrolls through the roles. */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(11rem+7px)]"
      >
        <motion.div className="absolute inset-0 origin-top bg-accent" style={{ scaleY }} />
      </div>
      <ol ref={ref} className="space-y-10 md:space-y-14">
        {children}
      </ol>
    </div>
  );
}
