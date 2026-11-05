import { describe, expect, it } from "vitest";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { usageOf, usageOfAny } from "./skill-usage";

describe("usageOf", () => {
  it("links a skill to every role and project that lists it", () => {
    const kafka = usageOf("kafka");
    expect(kafka.roles).toEqual(["inbetween", "william-hill"]);
    expect(kafka.projects).toEqual(
      expect.arrayContaining(["publication-suite", "betting-portal", "real-time-chat", "loan-platform"]),
    );
  });

  it("returns empty usage for a skill nothing references", () => {
    expect(usageOf("scala")).toEqual({ roles: [], projects: [] });
  });
});

describe("usageOfAny", () => {
  it("merges skills without duplicates, keeping content order", () => {
    const ai = usageOfAny(["claude", "bedrock"]);
    expect(ai.roles).toEqual(["techbulls"]);
    expect(new Set(ai.projects).size).toBe(ai.projects.length);
    const order = projects.map((project) => project.id);
    expect([...ai.projects].sort((a, b) => order.indexOf(a) - order.indexOf(b))).toEqual(ai.projects);
  });
});

describe("content", () => {
  it("lists roles newest first", () => {
    const starts = experience.map((role) => role.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it("has unique project ids", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
