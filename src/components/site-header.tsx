"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { type SectionId, sections } from "@/content/navigation";
import { profile } from "@/content/profile";
import { withBasePath } from "@/lib/paths";
import { openCommandPalette } from "./command-palette";
import { CloseIcon, DownloadIcon, MenuIcon, SearchIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

/** Tracks which section sits in the middle band of the viewport. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg border border-line bg-surface font-mono text-xs font-semibold text-accent transition-colors group-hover:border-accent/50">
            SD
          </span>
          <span className="hidden text-sm font-medium sm:inline">{profile.name}</span>
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "location" : undefined}
                  className={`relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active === section.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === section.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden h-9 items-center gap-2 rounded-full border border-line px-3 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg xl:flex"
            aria-label="Open quick actions"
          >
            <SearchIcon className="size-3.5" />
            <kbd className="font-mono">⌘K</kbd>
          </button>
          <a
            href={withBasePath(profile.resume)}
            download
            className="hidden h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg lg:flex"
          >
            <DownloadIcon className="size-3.5" />
            Résumé
          </a>
          <ThemeToggle />
          <a
            href="#connect"
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-9 items-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-fg transition-[box-shadow,transform] hover:shadow-lg hover:shadow-accent/25 active:scale-95"
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full border border-line text-muted md:hidden"
          >
            {menuOpen ? <CloseIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {sections.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                >
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-lg ${
                      active === section.id ? "bg-surface text-fg" : "text-muted"
                    }`}
                  >
                    {section.label}
                    <span className="font-mono text-xs text-subtle">0{index + 1}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + sections.length * 0.05 }}
              >
                <a
                  href={withBasePath(profile.resume)}
                  download
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-lg text-accent"
                >
                  <DownloadIcon className="size-4" />
                  Download résumé
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
