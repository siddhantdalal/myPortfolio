"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { dismissToast, getToast, subscribeToast, type ToastLine } from "@/lib/toast";
import { CloseIcon } from "./icons";

const TONES: Record<NonNullable<ToastLine["tone"]>, string> = {
  command: "text-fg",
  success: "text-ok",
  muted: "text-muted",
};

/** Terminal-style confirmation for actions such as opening a contact channel or copying an address. */
export function Toaster() {
  const toast = useSyncExternalStore(subscribeToast, getToast, () => null);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4 md:bottom-4"
      aria-live="polite"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex max-w-full items-start gap-3 rounded-xl border border-line-strong bg-elevated/95 px-4 py-3 font-mono text-xs shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className="min-w-0 space-y-1">
              {toast.lines.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.18 }}
                  className={`break-all ${TONES[line.tone ?? "muted"]}`}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
            <button
              type="button"
              onClick={dismissToast}
              className="-m-1 rounded p-1 text-subtle transition-colors hover:text-fg"
              aria-label="Dismiss"
            >
              <CloseIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
