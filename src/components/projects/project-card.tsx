"use client";

import { motion } from "motion/react";
import { getExperience } from "@/content/experience";
import type { Project } from "@/content/projects";
import { getSkill } from "@/content/skills";
import { ArchitectureDiagram } from "../diagram/architecture-diagram";
import { ArrowRightIcon, CheckIcon } from "../icons";
import { CompanyLogo } from "../ui/company-logo";
import { Spotlight } from "../ui/spotlight";
import { Tag } from "../ui/tag";

const VISIBLE_SKILLS = 4;

export function OrgBadge({ org, size = "sm" }: { org: Project["org"]; size?: "sm" | "md" }) {
  if (org === "personal") return <Tag tone="accent">Personal project</Tag>;
  return <CompanyLogo company={getExperience(org)} size={size} />;
}

/**
 * The whole card is clickable through the title's button, whose ::after stretches over the card.
 * That keeps the markup valid (no headings or blocks inside a button) and gives one clear tab stop.
 */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const extra = project.skills.length - VISIBLE_SKILLS;

  return (
    <motion.div layoutId={`project-${project.id}`} className="h-full" style={{ borderRadius: 16 }}>
      <Spotlight className="group relative flex h-full flex-col rounded-2xl border border-line bg-elevated p-5 transition-[border-color,transform] duration-300 has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-2 has-[button:focus-visible]:outline-accent hover:-translate-y-1 hover:border-line-strong sm:p-6">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <OrgBadge org={project.org} />
          <span className="font-mono text-[10px] tracking-widest text-subtle uppercase">
            {project.categories.filter((category) => category !== "personal").join(" · ")}
          </span>
        </div>

        {project.featured && (
          <div className="mt-5 hidden rounded-xl border border-line bg-bg/60 p-4 sm:block" aria-hidden="true">
            <ArchitectureDiagram
              architecture={project.architecture}
              title={project.title}
              animated={false}
              className="h-auto w-full"
            />
          </div>
        )}

        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="mt-5 text-lg font-semibold tracking-tight text-balance sm:text-xl"
        >
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </button>
        </motion.h3>
        <p className="mt-2 flex items-start gap-1.5 font-mono text-xs text-accent">
          <CheckIcon className="mt-px size-3.5 shrink-0" />
          {project.proof}
        </p>
        <p className="mt-2 flex-1 text-sm text-pretty text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.skills.slice(0, VISIBLE_SKILLS).map((skill) => (
            <li key={skill}>
              <Tag>{getSkill(skill).label}</Tag>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Tag>+{extra}</Tag>
            </li>
          )}
        </ul>

        <span
          aria-hidden="true"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors group-hover:text-accent"
        >
          View architecture
          <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Spotlight>
    </motion.div>
  );
}
