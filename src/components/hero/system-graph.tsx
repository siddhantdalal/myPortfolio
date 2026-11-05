"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { getExperience } from "@/content/experience";
import type { SkillId } from "@/content/skills";
import { edgePath, type Point, type Size } from "@/lib/diagram";
import { usageOfAny } from "@/lib/skill-usage";
import { Packet } from "../diagram/packet";

type GraphNode = Point & { id: string; label: string; detail: string; skills: readonly SkillId[] };

const VIEW = { width: 640, height: 350 };
const NODE: Size = { width: 128, height: 46 };

/** A stylised version of the systems I build. Each node links to the skills it stands for. */
const nodes: readonly GraphNode[] = [
  { id: "client", label: "Client", detail: "web · mobile", x: 74, y: 210, skills: ["react", "typescript"] },
  { id: "api", label: "Spring Boot", detail: "REST · OAuth2", x: 234, y: 210, skills: ["spring-boot"] },
  { id: "redis", label: "Redis", detail: "cache", x: 234, y: 60, skills: ["redis"] },
  { id: "kafka", label: "Kafka", detail: "event streams", x: 404, y: 130, skills: ["kafka"] },
  { id: "workers", label: "Consumers", detail: "multithreaded", x: 566, y: 130, skills: ["concurrency"] },
  { id: "llm", label: "Claude", detail: "AWS Bedrock", x: 404, y: 290, skills: ["claude", "bedrock"] },
  { id: "db", label: "PostgreSQL", detail: "tuned SQL", x: 566, y: 290, skills: ["postgresql", "sql"] },
];

const edges = [
  ["client", "api"],
  ["api", "redis"],
  ["api", "kafka"],
  ["kafka", "workers"],
  ["workers", "db"],
  ["api", "llm"],
] as const;

const byId = new Map(nodes.map((node) => [node.id, node]));

function describe(node: GraphNode) {
  const usage = usageOfAny(node.skills);
  const companies = usage.roles.map((id) => getExperience(id).company);
  return { companies, projects: usage.projects.length };
}

export function SystemGraph() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const activeNode = active ? byId.get(active) : undefined;
  const info = activeNode ? describe(activeNode) : null;

  const isLinked = (from: string, to: string) => active !== null && (from === active || to === active);
  const isDimmed = (id: string) =>
    active !== null && id !== active && !edges.some(([a, b]) => isLinked(a, b) && (a === id || b === id));

  return (
    <div className="relative" style={{ aspectRatio: `${VIEW.width} / ${VIEW.height}` }}>
      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        className="absolute inset-0 size-full overflow-visible"
        role="group"
        aria-label="Interactive diagram of a typical system I build. Focus a component to see where I've used it."
        // Tapping empty space on a touch screen clears the highlighted node.
        onPointerDown={(event) => event.target === event.currentTarget && setActive(null)}
      >
        <rect
          x={166}
          y={14}
          width={468}
          height={318}
          rx={20}
          fill="none"
          className="pointer-events-none stroke-line"
          strokeDasharray="4 7"
        />
        <text
          x={620}
          y={36}
          textAnchor="end"
          className="pointer-events-none fill-subtle font-mono text-[11px] max-sm:text-[17px]"
        >
          aws · azure aks
        </text>

        {edges.map(([from, to], index) => {
          const linked = isLinked(from, to);
          return (
            <motion.path
              key={`${from}-${to}`}
              id={`${uid}-edge-${index}`}
              d={edgePath(byId.get(from)!, byId.get(to)!, NODE)}
              fill="none"
              strokeWidth={linked ? 2 : 1.5}
              className={`transition-colors duration-300 ${linked ? "stroke-accent" : "stroke-line-strong"}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.5 + index * 0.12, ease: "easeInOut" }}
            />
          );
        })}

        {!reduceMotion && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            aria-hidden="true"
          >
            {edges.map(([from, to], index) => (
              <Packet
                key={`${from}-${to}`}
                pathId={`${uid}-edge-${index}`}
                duration={2.2}
                offset={index * 0.7}
                className={isLinked(from, to) || active === null ? "fill-accent" : "fill-line-strong"}
              />
            ))}
          </motion.g>
        )}

        {nodes.map((node, index) => {
          const isActive = node.id === active;
          const { companies } = describe(node);
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: isDimmed(node.id) ? 0.35 : 1, scale: isActive ? 1.06 : 1 }}
              transition={{ duration: 0.4, delay: active === null ? 0.2 + index * 0.08 : 0 }}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`${node.label}: used at ${companies.join(", ")}`}
              onPointerEnter={(event) => event.pointerType === "mouse" && setActive(node.id)}
              onPointerLeave={(event) => event.pointerType === "mouse" && setActive(null)}
              onPointerDown={(event) => event.pointerType !== "mouse" && setActive(node.id)}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
              className="cursor-pointer outline-none"
            >
              <rect
                x={node.x - NODE.width / 2}
                y={node.y - NODE.height / 2}
                width={NODE.width}
                height={NODE.height}
                rx={11}
                strokeWidth={1.25}
                className={`transition-colors duration-300 ${
                  isActive ? "fill-accent-soft stroke-accent" : "fill-elevated stroke-line-strong"
                }`}
              />
              <text
                x={node.x}
                y={node.y - 3}
                textAnchor="middle"
                className={`text-[14px] font-semibold max-sm:translate-y-[9px] max-sm:text-[21px] ${
                  isActive ? "fill-accent" : "fill-fg"
                }`}
              >
                {node.label}
              </text>
              <text
                x={node.x}
                y={node.y + 13}
                textAnchor="middle"
                className="fill-muted font-mono text-[10.5px] max-sm:hidden"
              >
                {node.detail}
              </text>
            </motion.g>
          );
        })}
      </svg>

      <AnimatePresence>
        {activeNode && info && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute z-10 w-48 -translate-x-1/2 rounded-xl border border-line-strong bg-elevated/95 p-3 text-xs shadow-xl shadow-black/30 backdrop-blur"
            style={{
              // Kept away from the edges so the tooltip never spills off a narrow screen.
              left: `${Math.min(Math.max((activeNode.x / VIEW.width) * 100, 28), 72)}%`,
              top: `${((activeNode.y + NODE.height / 2 + 10) / VIEW.height) * 100}%`,
            }}
          >
            <p className="font-mono text-[10px] tracking-widest text-accent uppercase">{activeNode.label}</p>
            <p className="mt-1.5 text-muted">
              Used at <span className="text-fg">{info.companies.join(", ")}</span>
              {info.projects > 0 && (
                <>
                  {" "}
                  across <span className="text-fg">{info.projects}</span> project
                  {info.projects === 1 ? "" : "s"}
                </>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
