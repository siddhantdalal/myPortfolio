"use client";

import {
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { type CSSProperties, useEffect } from "react";
import cutout from "@/assets/siddhant-cutout.webp";
import { profile } from "@/content/profile";

type Chip = {
  title: string;
  detail: string;
  /** Position around the portrait. */
  className: string;
  /** How far it drifts with the pointer; negative drifts the other way, for depth. */
  depth: number;
  live?: boolean;
};

const chips: Chip[] = [
  {
    title: "Spring Boot · Kafka",
    detail: "Core stack",
    className: "left-0 top-[14%] -translate-x-[35%]",
    depth: 1,
  },
  {
    title: "5 years",
    detail: "London & India",
    className: "right-0 top-[38%] translate-x-[30%]",
    depth: -0.8,
  },
  {
    title: profile.openTo.availability,
    detail: "Remote · Mumbai",
    className: "bottom-[18%] left-0 -translate-x-[20%]",
    depth: 0.6,
    live: true,
  },
];

const SPRING = { stiffness: 60, damping: 18 };

/**
 * Cut-out portrait on an accent ring. The photo itself is never altered; the motion is layered on:
 * a scan line renders it in on load, then it breathes, a band of light crosses it now and then, it
 * tips back as the page scrolls and tilts towards a mouse pointer. On phones it shows head and
 * shoulders so the text below stays close.
 *
 * Each effect lives on its own element, so the CSS animations and Motion's transforms never compete
 * for the same `transform`.
 */
export function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollShift = useTransform(scrollY, [0, 800], [0, 110]);
  const scrollFade = useTransform(scrollY, [0, 700], [1, 0.35]);
  const scrollTilt = useTransform(scrollY, [0, 600], [0, 10]);
  const scrollScale = useTransform(scrollY, [0, 600], [1, 0.95]);

  // Pointer position across the window, from -1 to 1 on each axis.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);
  const rotateY = useTransform(x, [-1, 1], [-5, 5]);
  const rotateX = useTransform(y, [-1, 1], [3, -3]);
  const shift = useTransform(x, [-1, 1], [-8, 8]);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onPointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduceMotion, pointerX, pointerY]);

  return (
    <motion.div
      style={
        reduceMotion
          ? undefined
          : {
              y: scrollShift,
              opacity: scrollFade,
              rotateX: scrollTilt,
              scale: scrollScale,
              transformPerspective: 1000,
            }
      }
      className="relative mx-auto aspect-square w-[min(72vw,20rem)] lg:aspect-auto lg:w-[min(27rem,52svh)]"
    >
      {/* Glow and ring sit behind the cut-out, so the orbiting packet passes behind the head. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] top-[6%] aspect-square rounded-full bg-accent/20 blur-3xl"
      />
      <div aria-hidden="true" className="absolute top-[3%] left-[7%] aspect-square w-[86%]">
        <div className="absolute inset-0 rounded-full border border-accent/30 shadow-[0_0_80px_-10px_var(--accent)]" />
        <div className="absolute inset-[7%] rounded-full border border-dashed border-line-strong/60" />
        <div className="animate-orbit absolute inset-0">
          <span className="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
        </div>
      </div>

      <div className="animate-scan-reveal relative h-full">
        <motion.div
          style={reduceMotion ? undefined : { rotateX, rotateY, x: shift, transformPerspective: 1200 }}
          className="h-full"
        >
          <div className="animate-breathe portrait-mask relative h-full">
            <Image
              src={cutout}
              alt={`Photo of ${profile.name}`}
              priority
              className="h-full w-full object-cover object-top lg:h-auto"
            />
            {/* The light falls only on the person: the cut-out is this layer's mask. */}
            <div
              aria-hidden="true"
              className="portrait-sheen pointer-events-none absolute inset-0 overflow-hidden"
              style={{ "--portrait": `url(${cutout.src})` } as CSSProperties}
            >
              <span className="animate-sheen absolute inset-y-0 -left-1/5 w-1/5 bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
      <div aria-hidden="true" className="animate-scan-line pointer-events-none absolute inset-0">
        <span className="absolute inset-x-[4%] top-0 h-0.5 rounded-full bg-accent shadow-[0_0_24px_4px_var(--accent)]" />
      </div>

      {chips.map((chip, index) => (
        <FloatingChip key={chip.title} chip={chip} index={index} x={x} y={y} still={!!reduceMotion} />
      ))}
    </motion.div>
  );
}

function FloatingChip({
  chip,
  index,
  x,
  y,
  still,
}: {
  chip: Chip;
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  still: boolean;
}) {
  const driftX = useTransform(x, (value) => value * chip.depth * -14);
  const driftY = useTransform(y, (value) => value * chip.depth * -10);

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute hidden sm:block ${chip.className}`}
      style={still ? undefined : { x: driftX, y: driftY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 + index * 0.18 }}
    >
      <div className="animate-float" style={{ animationDelay: `${index * -2}s` }}>
        <div className="rounded-xl border border-line bg-elevated/75 px-3.5 py-2.5 shadow-lg shadow-black/20 backdrop-blur-md">
          <p className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
            {chip.live && (
              <span className="relative flex size-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-ok" />
                <span className="relative size-2 rounded-full bg-ok" />
              </span>
            )}
            {chip.title}
          </p>
          <p className="mt-0.5 font-mono text-[10px] tracking-wider whitespace-nowrap text-subtle uppercase">
            {chip.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
