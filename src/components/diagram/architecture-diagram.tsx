"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useMemo } from "react";
import type { Architecture } from "@/content/projects";
import { edgePath, layoutArchitecture, NODE } from "@/lib/diagram";
import { Packet } from "./packet";

type ArchitectureDiagramProps = {
  architecture: Architecture;
  title: string;
  /** Draws the diagram in and runs packets along the edges; off for small previews. */
  animated?: boolean;
  className?: string;
};

/** A project's request / event flow, drawn from the grid data in `content/projects.ts`. */
export function ArchitectureDiagram({
  architecture,
  title,
  animated = true,
  className,
}: ArchitectureDiagramProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const reduceMotion = useReducedMotion();
  const layout = useMemo(() => layoutArchitecture(architecture), [architecture]);
  const labels = new Map(architecture.nodes.map((node) => [node.id, node.label]));
  const flowing = animated && !reduceMotion;

  const description = architecture.edges
    .map((edge) => `${labels.get(edge.from)} → ${labels.get(edge.to)}`)
    .join("; ");

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={`Architecture of ${title}: ${description}`}
      className={className}
    >
      <defs>
        <marker
          id={`${uid}-arrow`}
          viewBox="0 0 10 10"
          refX="8.5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9 z" className="fill-line-strong" />
        </marker>
      </defs>

      {architecture.edges.map((edge, index) => {
        const from = layout.positions.get(edge.from)!;
        const to = layout.positions.get(edge.to)!;
        return (
          <motion.path
            key={`${edge.from}-${edge.to}`}
            id={`${uid}-edge-${index}`}
            d={edgePath(from, to)}
            fill="none"
            className="stroke-line-strong"
            strokeWidth={1.5}
            markerEnd={`url(#${uid}-arrow)`}
            initial={animated ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: "easeInOut" }}
          />
        );
      })}

      {flowing && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          {architecture.edges.map((edge, index) => (
            <Packet
              key={`${edge.from}-${edge.to}`}
              pathId={`${uid}-edge-${index}`}
              duration={1.8}
              offset={(index * 0.55) % 1.8}
            />
          ))}
        </motion.g>
      )}

      {architecture.nodes.map((node, index) => {
        const { x, y } = layout.positions.get(node.id)!;
        return (
          <motion.g
            key={node.id}
            initial={animated ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <rect
              x={x - NODE.width / 2}
              y={y - NODE.height / 2}
              width={NODE.width}
              height={NODE.height}
              rx={10}
              className={node.ai ? "fill-accent-soft stroke-accent" : "fill-surface stroke-line-strong"}
              strokeWidth={1.25}
            />
            <text
              x={x}
              y={node.detail ? y - 3 : y + 4}
              textAnchor="middle"
              className={`text-[13px] font-medium ${node.ai ? "fill-accent" : "fill-fg"}`}
            >
              {node.label}
            </text>
            {node.detail && (
              <text x={x} y={y + 13} textAnchor="middle" className="fill-muted font-mono text-[10px]">
                {node.detail}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
