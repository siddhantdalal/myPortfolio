"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import { type ProjectCategory, type ProjectId, projectCategories, projects } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { ProjectDialog } from "./project-dialog";

type Filter = ProjectCategory | "all";

const filters: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: projects.length },
  ...projectCategories.map((category) => ({
    id: category.id,
    label: category.label,
    count: projects.filter((project) => (project.categories as readonly string[]).includes(category.id))
      .length,
  })),
];

export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => (project.categories as readonly string[]).includes(filter));
  const openProject = projects.find((project) => project.id === openId);

  function open(id: ProjectId) {
    opener.current = document.activeElement as HTMLElement | null;
    setOpenId(id);
  }

  function close() {
    setOpenId(null);
    opener.current?.focus({ preventScroll: true });
  }

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label="Filter projects"
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {filters.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={selected}
              className={`relative isolate shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                selected
                  ? "border-transparent text-accent-fg"
                  : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {item.label}
              <span
                className={`ml-2 font-mono text-[11px] ${selected ? "text-accent-fg/70" : "text-subtle"}`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={"featured" in project && project.featured ? "sm:col-span-2" : undefined}
            >
              <ProjectCard project={project} onOpen={() => open(project.id)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {openProject && <ProjectDialog key={openProject.id} project={openProject} onClose={close} />}
      </AnimatePresence>
    </LayoutGroup>
  );
}
