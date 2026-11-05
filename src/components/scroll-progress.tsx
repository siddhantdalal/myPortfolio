"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin accent bar along the top edge showing how far down the page the visitor is. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
