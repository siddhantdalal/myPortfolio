"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/** Cycles through phrases with a slide-up swap. Screen readers get the full list once instead. */
export function RotatingText({
  phrases,
  intervalMs = 2600,
}: {
  phrases: readonly string[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % phrases.length), intervalMs);
    return () => clearInterval(timer);
  }, [phrases.length, intervalMs]);

  return (
    <>
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true" className="relative inline-grid overflow-hidden align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="col-start-1 row-start-1 whitespace-nowrap text-accent"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
