"use client";

import { motion } from "motion/react";
import { type KeyboardEvent, useEffect, useRef } from "react";
import { getExperience } from "@/content/experience";
import type { Project } from "@/content/projects";
import { getSkill } from "@/content/skills";
import { ArchitectureDiagram } from "../diagram/architecture-diagram";
import { ArrowUpRightIcon, CheckIcon, CloseIcon, GitHubIcon } from "../icons";
import { Tag } from "../ui/tag";
import { OrgBadge } from "./project-card";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Project detail. The panel shares a layoutId with its card, so it grows out of the card when opened
 * and shrinks back into it when closed.
 */
export function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `project-dialog-${project.id}`;

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  // Keeps Tab inside the dialog and lets Escape close it.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const org = project.org === "personal" ? "Personal project" : getExperience(project.org).company;

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
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        layoutId={`project-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ borderRadius: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain border border-line-strong bg-elevated shadow-2xl shadow-black/40"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-elevated/90 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <OrgBadge org={project.org} />
            <span className="truncate font-mono text-[10px] tracking-widest text-subtle uppercase">
              {org}
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <div className="px-5 pt-6 pb-8 sm:px-8">
          <motion.h3
            id={titleId}
            layoutId={`project-title-${project.id}`}
            className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            {project.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent-soft px-3 py-1.5 font-mono text-xs text-accent">
              <CheckIcon className="size-3.5 shrink-0" />
              {project.proof}
            </p>
            <p className="mt-4 max-w-3xl text-pretty text-muted">{project.description}</p>

            <figure className="mt-7 rounded-xl border border-line bg-bg/60 p-4 sm:p-5">
              <figcaption className="mb-4 flex items-center justify-between gap-3 font-mono text-[10px] tracking-widest text-subtle uppercase">
                <span>Architecture</span>
                <span className="flex items-center gap-1.5 normal-case">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> live flow
                </span>
              </figcaption>
              <div className="-mx-1 overflow-x-auto px-1 pb-1">
                <ArchitectureDiagram
                  architecture={project.architecture}
                  title={project.title}
                  className="h-auto w-full min-w-[560px]"
                />
              </div>
              <p className="mt-4 text-xs text-pretty text-muted">{project.architecture.caption}</p>
            </figure>

            {project.decisions && (
              <div className="mt-8">
                <h4 className="font-mono text-[10px] tracking-widest text-subtle uppercase">
                  Design decisions
                </h4>
                <ol className="mt-3 grid gap-3 sm:grid-cols-2">
                  {project.decisions.map((decision, index) => (
                    <li
                      key={decision}
                      className="flex gap-3 rounded-xl border border-line bg-surface/50 p-4 text-sm"
                    >
                      <span className="font-mono text-xs text-accent">0{index + 1}</span>
                      <span className="text-pretty text-muted">{decision}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-subtle uppercase">Highlights</h4>
                <ul className="mt-3 space-y-2.5 text-sm text-muted">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      <span className="text-pretty">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-subtle uppercase">Stack</h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <li key={skill}>
                      <Tag>{getSkill(skill).label}</Tag>
                    </li>
                  ))}
                </ul>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    <GitHubIcon />
                    View the code
                    <ArrowUpRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
