"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import type { Channel } from "@/lib/contact";
import { openChannel } from "@/lib/connect-actions";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const actions: { channel: Channel; label: string; icon: ReactNode }[] = [
  { channel: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon /> },
  { channel: "call", label: "Call", icon: <PhoneIcon /> },
  { channel: "email", label: "Email", icon: <MailIcon /> },
];

/**
 * Phones only: a floating bar that keeps WhatsApp, Call and Email one tap away while a recruiter
 * scrolls. It appears once the hero is behind them and steps aside when the Connect section,
 * which offers the same actions, is on screen.
 */
export function MobileContactBar() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [connectVisible, setConnectVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.7));

  useEffect(() => {
    const connect = document.getElementById("connect");
    if (!connect) return;
    const observer = new IntersectionObserver(([entry]) => setConnectVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(connect);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {pastHero && !connectVisible && (
        <motion.nav
          aria-label="Contact"
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed inset-x-4 bottom-4 z-50 md:hidden"
        >
          <ul className="grid grid-cols-3 gap-1 rounded-2xl border border-line-strong bg-elevated/90 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {actions.map((action, index) => (
              <li key={action.channel}>
                <button
                  type="button"
                  onClick={() => openChannel(action.channel)}
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition-transform active:scale-95 ${
                    index === 0 ? "bg-accent text-accent-fg" : "text-fg"
                  }`}
                >
                  <span className="text-base">{action.icon}</span>
                  {action.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
