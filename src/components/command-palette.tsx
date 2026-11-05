"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { sections } from "@/content/navigation";
import { profile } from "@/content/profile";
import { copyEmail, openChannel } from "@/lib/connect-actions";
import { withBasePath } from "@/lib/paths";
import { toggleTheme } from "@/lib/theme";
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MoonIcon,
  PhoneIcon,
  SearchIcon,
  WhatsAppIcon,
} from "./icons";

const OPEN_EVENT = "command-palette:open";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Command = { id: string; label: string; group: string; icon: ReactNode; run: () => void };

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}

function buildCommands(): Command[] {
  const commands: Command[] = [
    ...sections.map((section) => ({
      id: `go-${section.id}`,
      label: `Go to ${section.label}`,
      group: "Navigate",
      icon: <ArrowRightIcon />,
      run: () => scrollToSection(section.id),
    })),
    { id: "email", label: "Email me", group: "Connect", icon: <MailIcon />, run: () => openChannel("email") },
    { id: "call", label: "Call me", group: "Connect", icon: <PhoneIcon />, run: () => openChannel("call") },
    {
      id: "whatsapp",
      label: "Message me on WhatsApp",
      group: "Connect",
      icon: <WhatsAppIcon />,
      run: () => openChannel("whatsapp"),
    },
    { id: "copy-email", label: "Copy email address", group: "Connect", icon: <CopyIcon />, run: copyEmail },
    {
      id: "resume",
      label: "Download résumé (PDF)",
      group: "More",
      icon: <DownloadIcon />,
      run: () => window.open(withBasePath(profile.resume), "_blank", "noopener"),
    },
    {
      id: "github",
      label: "Open GitHub",
      group: "More",
      icon: <GitHubIcon />,
      run: () => window.open(profile.links.github, "_blank", "noopener,noreferrer"),
    },
    {
      id: "theme",
      label: "Toggle light / dark theme",
      group: "More",
      icon: <MoonIcon />,
      run: () => toggleTheme(),
    },
  ];

  const { linkedin } = profile.links;
  if (linkedin) {
    commands.push({
      id: "linkedin",
      label: "Open LinkedIn",
      group: "More",
      icon: <LinkedInIcon />,
      run: () => window.open(linkedin, "_blank", "noopener,noreferrer"),
    });
  }
  return commands;
}

/**
 * ⌘K / Ctrl+K quick actions: jump to a section, open a contact channel, grab the résumé.
 * Implements the ARIA combobox + listbox pattern so it works fully from the keyboard.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listId = useId();
  const commands = useMemo(buildCommands, []);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return commands.filter((command) => {
      const text = `${command.label} ${command.group}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    });
  }, [commands, query]);

  function show() {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  const onShortcut = useEffectEvent((event: globalThis.KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (open) close();
      else show();
    }
  });
  const onOpenRequest = useEffectEvent(show);

  useEffect(() => {
    const handleOpen = () => onOpenRequest();
    const handleKey = (event: globalThis.KeyboardEvent) => onShortcut(event);
    window.addEventListener(OPEN_EVENT, handleOpen);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpen);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  function close() {
    setOpen(false);
    restoreFocus.current?.focus();
  }

  function run(command: Command) {
    close();
    command.run();
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) run(command);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  const activeId = results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick actions"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-elevated shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="size-4 shrink-0 text-subtle" />
              <input
                ref={inputRef}
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Type a command or search…"
                className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-subtle focus-visible:outline-none"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                esc
              </kbd>
            </div>
            <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-subtle">No matches.</li>
              )}
              {results.map((command, index) => {
                const showGroup = index === 0 || results[index - 1].group !== command.group;
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && (
                      <p className="px-3 pt-3 pb-1 font-mono text-[10px] tracking-widest text-subtle uppercase">
                        {command.group}
                      </p>
                    )}
                    <div
                      id={`${listId}-${command.id}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      onPointerMove={() => setActiveIndex(index)}
                      onClick={() => run(command)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        index === activeIndex ? "bg-accent-soft text-fg" : "text-muted"
                      }`}
                    >
                      <span className={`text-base ${index === activeIndex ? "text-accent" : "text-subtle"}`}>
                        {command.icon}
                      </span>
                      {command.label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
