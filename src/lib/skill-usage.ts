import { experience, type ExperienceId } from "@/content/experience";
import { projects, type ProjectId } from "@/content/projects";
import type { SkillId } from "@/content/skills";

export type SkillUsage = { roles: ExperienceId[]; projects: ProjectId[] };

/**
 * Which roles and projects used each skill, derived from the content files so the Skills section
 * can never drift out of step with the Experience and Projects sections.
 */
function buildSkillUsage(): Map<SkillId, SkillUsage> {
  const usage = new Map<SkillId, SkillUsage>();
  const entry = (skill: SkillId) => {
    let found = usage.get(skill);
    if (!found) {
      found = { roles: [], projects: [] };
      usage.set(skill, found);
    }
    return found;
  };

  for (const role of experience) for (const skill of role.skills) entry(skill).roles.push(role.id);
  for (const project of projects) for (const skill of project.skills) entry(skill).projects.push(project.id);
  return usage;
}

const skillUsage = buildSkillUsage();
const unused: SkillUsage = { roles: [], projects: [] };

export function usageOf(skill: SkillId): SkillUsage {
  return skillUsage.get(skill) ?? unused;
}

/** Usage merged across several skills, e.g. "Claude" and "AWS Bedrock" for one diagram node. */
export function usageOfAny(skills: readonly SkillId[]): SkillUsage {
  const roles = new Set<ExperienceId>();
  const work = new Set<ProjectId>();
  for (const skill of skills) {
    const { roles: r, projects: p } = usageOf(skill);
    r.forEach((id) => roles.add(id));
    p.forEach((id) => work.add(id));
  }
  // Keep the content files' order (newest role first) rather than insertion order.
  return {
    roles: experience.map((role) => role.id).filter((id) => roles.has(id)),
    projects: projects.map((project) => project.id).filter((id) => work.has(id)),
  };
}
