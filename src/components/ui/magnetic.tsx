"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 };

/** Pulls its child gently toward a mouse cursor hovering over it, then springs back. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  function attract(event: PointerEvent<HTMLSpanElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function release() {
    x.set(0);
    y.set(0);
  }

  return (
    // A span, so it can sit inside buttons and links without breaking HTML content rules.
    <motion.span
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={attract}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
}
