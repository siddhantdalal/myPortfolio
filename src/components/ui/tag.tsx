import type { ReactNode } from "react";

/** Small mono label for technologies and categories. */
export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "accent" }) {
  const colours =
    tone === "accent"
      ? "border-accent/30 bg-accent-soft text-accent"
      : "border-line bg-surface/60 text-muted";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${colours}`}
    >
      {children}
    </span>
  );
}
