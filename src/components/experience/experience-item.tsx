"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import type { Experience } from "@/content/experience";
import { getSkill } from "@/content/skills";
import { formatMetric, formatRange } from "@/lib/format";
import { CompanyLogo } from "../ui/company-logo";
import { EASE_OUT } from "../ui/reveal";
import { Spotlight } from "../ui/spotlight";
import { Tag } from "../ui/tag";

export function ExperienceItem({ role, index }: { role: Experience; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const detailsId = useId();
  const current = role.end === null;

  return (
    <motion.li
      className="relative grid gap-3 pl-8 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {/* Rail marker */}
      <span aria-hidden="true" className="absolute top-1.5 left-0 flex size-[15px] md:left-[11rem]">
        {current && <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />}
        <motion.span
          className="relative size-[15px] rounded-full border-2 border-accent bg-bg"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
        />
      </span>

      <div className="md:pt-0.5 md:pr-6 md:text-right">
        <p className="font-mono text-xs text-accent">{formatRange(role.start, role.end)}</p>
        <p className="mt-1 text-sm text-subtle">{role.location}</p>
      </div>

      <Spotlight className="group rounded-2xl border border-line bg-elevated p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:p-6 md:ml-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">{role.role}</h3>
            <p className="mt-0.5 text-sm text-muted">
              {role.company}
              {role.legalName && role.legalName !== role.company && (
                <span className="text-subtle"> · {role.legalName}</span>
              )}
            </p>
          </div>
          <CompanyLogo company={role} />
        </div>

        <p className="mt-4 text-pretty text-muted">{role.summary}</p>

        {role.metrics.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {role.metrics.map((metric) => (
              <li
                key={metric.label}
                className="rounded-lg border border-accent/25 bg-accent-soft px-3 py-1.5 font-mono text-xs"
              >
                <span className="font-semibold text-accent">{formatMetric(metric)}</span>{" "}
                <span className="text-muted">{metric.label}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={detailsId}
          className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <motion.span animate={{ rotate: open ? 90 : 0 }} className="inline-block" aria-hidden="true">
            ›
          </motion.span>
          {open ? "Hide details" : "Show details"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={detailsId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm text-muted">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span className="text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {role.skills.map((skill) => (
                  <li key={skill}>
                    <Tag>{getSkill(skill).label}</Tag>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Spotlight>
    </motion.li>
  );
}
