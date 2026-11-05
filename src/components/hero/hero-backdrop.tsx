"use client";

import { motion, useScroll, useTransform } from "motion/react";

/** Faint grid and an accent glow that drift at a slower pace than the page as it scrolls. */
export function HeroBackdrop() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ y, opacity }}
    >
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]" />
      <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-15%] size-[30rem] rounded-full bg-accent/5 blur-3xl" />
    </motion.div>
  );
}
