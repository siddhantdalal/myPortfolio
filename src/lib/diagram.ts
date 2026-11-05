import type { Architecture } from "@/content/projects";

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };

export const NODE: Size = { width: 148, height: 50 };
const COLUMN_STEP = 196;
const ROW_STEP = 84;
const MARGIN = 6;

/**
 * S-curve connector between two node centres. When there is horizontal room between the boxes it
 * leaves one box's side and enters the other's; otherwise it runs bottom-to-top. Either way it comes
 * out as a straight line when the boxes are aligned.
 */
export function edgePath(from: Point, to: Point, node: Size = NODE): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (Math.abs(dx) > node.width && Math.abs(dx) >= Math.abs(dy)) {
    const sx = from.x + (Math.sign(dx) * node.width) / 2;
    const ex = to.x - (Math.sign(dx) * node.width) / 2;
    const mx = (sx + ex) / 2;
    return `M ${sx} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${ex} ${to.y}`;
  }

  const sy = from.y + (Math.sign(dy) * node.height) / 2;
  const ey = to.y - (Math.sign(dy) * node.height) / 2;
  const my = (sy + ey) / 2;
  return `M ${from.x} ${sy} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${ey}`;
}

/** Converts grid cells to SVG coordinates, trimming unused rows so short diagrams stay compact. */
export function layoutArchitecture(architecture: Architecture): Size & { positions: Map<string, Point> } {
  const rows = architecture.nodes.map((node) => node.row);
  const cols = architecture.nodes.map((node) => node.col);
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const maxCol = Math.max(...cols);

  const positions = new Map<string, Point>();
  for (const node of architecture.nodes) {
    positions.set(node.id, {
      x: MARGIN + NODE.width / 2 + node.col * COLUMN_STEP,
      y: MARGIN + NODE.height / 2 + (node.row - minRow) * ROW_STEP,
    });
  }

  return {
    width: MARGIN * 2 + NODE.width + maxCol * COLUMN_STEP,
    height: MARGIN * 2 + NODE.height + (maxRow - minRow) * ROW_STEP,
    positions,
  };
}
