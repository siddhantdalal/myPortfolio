import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { edgePath, layoutArchitecture, NODE } from "./diagram";

describe("edgePath", () => {
  it("joins vertically stacked nodes bottom to top", () => {
    expect(edgePath({ x: 100, y: 50 }, { x: 100, y: 200 })).toBe(
      `M 100 ${50 + NODE.height / 2} C 100 125, 100 125, 100 ${200 - NODE.height / 2}`,
    );
  });

  it("joins side-by-side nodes from side to side", () => {
    const path = edgePath({ x: 100, y: 50 }, { x: 400, y: 50 });
    expect(path.startsWith(`M ${100 + NODE.width / 2} 50`)).toBe(true);
    expect(path.endsWith(`${400 - NODE.width / 2} 50`)).toBe(true);
  });

  it("leaves from the left when the target is to the left", () => {
    expect(edgePath({ x: 400, y: 50 }, { x: 100, y: 120 }).startsWith(`M ${400 - NODE.width / 2} 50`)).toBe(
      true,
    );
  });
});

describe("project architectures", () => {
  it.each(projects.map((project) => [project.id, project.architecture] as const))(
    "%s only connects nodes that exist, and no two nodes share a cell",
    (_, architecture) => {
      const ids = new Set(architecture.nodes.map((node) => node.id));
      for (const edge of architecture.edges) {
        expect(ids.has(edge.from), `missing node ${edge.from}`).toBe(true);
        expect(ids.has(edge.to), `missing node ${edge.to}`).toBe(true);
      }
      const cells = architecture.nodes.map((node) => `${node.col},${node.row}`);
      expect(new Set(cells).size).toBe(cells.length);
    },
  );

  it("trims unused rows from the layout", () => {
    const linear = projects.find((project) => project.id === "simrt-alignrt")!;
    const { height } = layoutArchitecture(linear.architecture);
    expect(height).toBeLessThan(NODE.height * 2);
  });
});
