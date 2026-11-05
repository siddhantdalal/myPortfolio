"use client";

import { motion } from "motion/react";
import { EASE_OUT } from "../ui/reveal";

/** The name rises into place letter by letter on first load. */
export function AnimatedName({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, w) => (
        <span
          key={w}
          aria-hidden="true"
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] last:mr-0"
        >
          {Array.from(word).map((char, c) => (
            <motion.span
              key={c}
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 + (w * 6 + c) * 0.035 }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </>
  );
}
