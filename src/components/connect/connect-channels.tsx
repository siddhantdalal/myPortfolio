"use client";

import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import type { Channel } from "@/lib/contact";
import { copyEmail, openChannel } from "@/lib/connect-actions";
import { CopyIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "../icons";
import { Magnetic } from "../ui/magnetic";
import { Stagger, StaggerItem } from "../ui/reveal";
import { Spotlight } from "../ui/spotlight";

type ChannelCard = {
  channel: Channel;
  title: string;
  detail: string;
  /** Shown on mouse / trackpad devices. */
  hint: string;
  /** Shown on touch screens, where some channels behave differently. */
  touchHint: string;
  icon: ReactNode;
};

const cards: ChannelCard[] = [
  {
    channel: "email",
    title: "Email",
    detail: profile.contact.email,
    hint: "opens your mail app",
    touchHint: "opens your mail app",
    icon: <MailIcon />,
  },
  {
    channel: "call",
    title: "Call",
    // Masked: the full number is only assembled when someone actually asks for it.
    detail: `${profile.contact.phoneParts[0]} ••••• •••${profile.contact.phoneParts[2].slice(-2)}`,
    hint: "click to copy the number",
    touchHint: "tap to call",
    icon: <PhoneIcon />,
  },
  {
    channel: "whatsapp",
    title: "WhatsApp",
    detail: "Message me directly",
    hint: "opens WhatsApp Web",
    touchHint: "opens WhatsApp",
    icon: <WhatsAppIcon />,
  },
];

export function ConnectChannels() {
  return (
    <Stagger className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <StaggerItem key={card.channel}>
          <Spotlight className="group h-full rounded-2xl border border-line bg-elevated transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50">
            <button
              type="button"
              onClick={() => openChannel(card.channel)}
              className="flex h-full w-full items-start gap-4 p-5 text-left active:scale-[0.98] sm:flex-col sm:p-6"
            >
              <Magnetic strength={0.4}>
                <span className="grid size-12 place-items-center rounded-xl border border-line bg-surface text-xl text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent-soft">
                  {card.icon}
                </span>
              </Magnetic>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold">{card.title}</span>
                <span className="mt-0.5 block truncate text-sm text-muted">{card.detail}</span>
                <span className="mt-4 block font-mono text-[11px] text-subtle transition-colors group-hover:text-accent">
                  <span className="hidden pointer-fine:inline">{card.hint}</span>
                  <span className="pointer-fine:hidden">{card.touchHint}</span> →
                </span>
              </span>
            </button>
          </Spotlight>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function CopyEmailButton() {
  return (
    <button
      type="button"
      onClick={copyEmail}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <CopyIcon />
      Copy email
    </button>
  );
}
