"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { getSkill, type SkillId, skillGroups, skills } from "@/content/skills";
import { usageOf } from "@/lib/skill-usage";
import { CompanyLogo } from "../ui/company-logo";
import { Stagger, StaggerItem } from "../ui/reveal";

/**
 * Skills with proof: pointing at a skill lights up every role and project that used it.
 * Hover previews on mouse; a click or tap pins the selection so it also works on touch screens.
 */
export function SkillsExplorer() {
  const [hovered, setHovered] = useState<SkillId | null>(null);
  const [pinned, setPinned] = useState<SkillId | null>(null);
  const active = hovered ?? pinned;
  const usage = active ? usageOf(active) : null;

  const lit = (kind: "roles" | "projects", id: string) =>
    usage === null ? null : (usage[kind] as readonly string[]).includes(id);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <Stagger className="space-y-8">
        {skillGroups.map((group) => (
          <StaggerItem key={group.id}>
            <h3 className="mb-3 font-mono text-[11px] tracking-widest text-subtle uppercase">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.group === group.id)
                .map((skill) => {
                  const isActive = active === skill.id;
                  const isPinned = pinned === skill.id;
                  return (
                    <li key={skill.id}>
                      <button
                        type="button"
                        aria-pressed={isPinned}
                        onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(skill.id)}
                        onPointerLeave={() => setHovered(null)}
                        onFocus={() => setHovered(skill.id)}
                        onBlur={() => setHovered(null)}
                        onClick={() => setPinned((current) => (current === skill.id ? null : skill.id))}
                        className={`relative rounded-full border px-3.5 py-1.5 text-sm transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 ${
                          isActive
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-line bg-elevated text-muted hover:border-line-strong hover:text-fg"
                        }`}
                      >
                        {skill.label}
                        {isPinned && (
                          <motion.span
                            layoutId="skill-pin"
                            className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-bg bg-accent"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-elevated p-5 sm:p-6" aria-live="polite">
          <p className="font-mono text-[11px] tracking-widest text-subtle uppercase">
            Where I&apos;ve used it
          </p>
          <p className="mt-2 min-h-14 text-lg font-semibold">
            {active ? (
              <>
                <span className="text-accent">{getSkill(active).label}</span>
                {usage && (
                  <span className="mt-1 block text-sm font-normal text-muted">
                    {usage.roles.length} role{usage.roles.length === 1 ? "" : "s"} · {usage.projects.length}{" "}
                    project
                    {usage.projects.length === 1 ? "" : "s"}
                    {usage.roles.length + usage.projects.length === 0 && " · from study and side work"}
                  </span>
                )}
              </>
            ) : (
              <span className="text-muted">Pick a skill to trace it through my work.</span>
            )}
          </p>

          <ul className="mt-5 space-y-1 border-t border-line pt-4">
            {experience.map((role) => {
              const on = lit("roles", role.id);
              return (
                <li
                  key={role.id}
                  className={`flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-all duration-300 ${
                    on ? "bg-accent-soft" : ""
                  } ${on === false ? "opacity-30" : "opacity-100"}`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-fg">{role.company}</span>
                    <span className="block truncate text-xs text-subtle">{role.role}</span>
                  </span>
                  <CompanyLogo company={role} size="sm" active={on === true} />
                </li>
              );
            })}
          </ul>

          <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4" aria-label="Projects">
            {projects.map((project) => {
              const on = lit("projects", project.id);
              return (
                <li
                  key={project.id}
                  className={`rounded-md border px-2 py-1 text-xs transition-all duration-300 ${
                    on ? "border-accent/40 bg-accent-soft text-accent" : "border-line text-muted"
                  } ${on === false ? "opacity-30" : "opacity-100"}`}
                >
                  {project.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
