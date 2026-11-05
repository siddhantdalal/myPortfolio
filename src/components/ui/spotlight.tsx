"use client";

import type { HTMLAttributes, PointerEvent } from "react";

/**
 * A surface with a soft accent glow that follows the cursor. The position is written straight to CSS
 * variables, so moving the mouse never re-renders React.
 */
export function Spotlight({ className = "", onPointerMove, ...props }: HTMLAttributes<HTMLDivElement>) {
  function track(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
    onPointerMove?.(event);
  }

  return <div className={`spotlight ${className}`} onPointerMove={track} {...props} />;
}
