"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Metric } from "@/content/types";
import { formatMetric } from "@/lib/format";

/**
 * Counts a metric up from zero when it scrolls into view. The final value is rendered on the server,
 * so the number is correct without JavaScript and for search engines; the count-up writes to the DOM
 * directly instead of re-rendering on every frame.
 */
export function CountUp({ metric, className }: { metric: Metric; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || reduceMotion || !node) return;
    const controls = animate(0, metric.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = formatMetric(metric, value);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, metric]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {formatMetric(metric)}
    </span>
  );
}
