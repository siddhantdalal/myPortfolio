"use client";

import type { MouseEvent } from "react";
import { toggleTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

/**
 * Both icons are rendered and CSS picks one from the <html> data-theme attribute, so the button is
 * correct on first paint without waiting for React to read the saved theme.
 */
export function ThemeToggle() {
  function onClick(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle colour theme"
      className="group relative grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <SunIcon className="size-4 transition-transform duration-500 group-hover:rotate-45 light:hidden" />
      <MoonIcon className="hidden size-4 transition-transform duration-500 group-hover:-rotate-12 light:block" />
    </button>
  );
}
