"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honours the visitor's reduced-motion setting for every animation on the site. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
