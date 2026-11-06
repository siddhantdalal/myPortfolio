"use client";

import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useRef, useSyncExternalStore } from "react";
import { profile } from "@/content/profile";
import type { Channel } from "@/lib/contact";
import { openChannel } from "@/lib/connect-actions";
import { withBasePath } from "@/lib/paths";
import { closeResume, isResumeOpen, RESUME_TITLE_ID, subscribeToResume } from "@/lib/resume";
import { useModal } from "@/lib/use-modal";
import { CloseIcon, DownloadIcon, FileIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "../icons";

const channels: { channel: Channel; label: string; icon: ReactNode }[] = [
  { channel: "email", label: "Email", icon: <MailIcon /> },
  { channel: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
  { channel: "call", label: "Call", icon: <PhoneIcon /> },
];

/** Opens over the page whenever the URL ends in #resume (see lib/resume.ts). */
export function ResumeDialog({ children }: { children: ReactNode }) {
  const open = useSyncExternalStore(subscribeToResume, isResumeOpen, () => false);
  return <AnimatePresence>{open && <ResumePanel key="resume">{children}</ResumePanel>}</AnimatePresence>;
}

function ResumePanel({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onKeyDown = useModal(panelRef, closeRef, closeResume);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      onKeyDown={onKeyDown}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeResume}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={RESUME_TITLE_ID}
        initial={{ opacity: 0, y: 56, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="relative flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-line-strong bg-elevated shadow-2xl shadow-black/40 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <p className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted">
            <FileIcon className="size-4 shrink-0 text-accent" />
            <span className="truncate">résumé · {profile.name}</span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={withBasePath(profile.resume)}
              download
              className="group inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-fg transition-shadow hover:shadow-lg hover:shadow-accent/25"
            >
              <DownloadIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
              <span>
                <span className="max-sm:hidden">Download </span>PDF
              </span>
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={closeResume}
              aria-label="Close résumé"
              className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>

        <div className="flex flex-wrap items-center gap-2 border-t border-line bg-surface/60 px-4 py-3 sm:px-6">
          <p className="mr-auto text-sm text-muted max-sm:w-full max-sm:pb-1">
            Hiring for a Java role? Reach me directly:
          </p>
          {channels.map(({ channel, label, icon }) => (
            <button
              key={channel}
              type="button"
              onClick={() => openChannel(channel)}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong px-4 text-sm transition-colors hover:border-accent hover:text-accent active:scale-95 sm:flex-none"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
