import { SkillsExplorer } from "../skills/skills-explorer";
import { SectionHeading } from "../ui/section-heading";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="skills-title"
          index="04"
          eyebrow="Skills"
          title="Skills, and where I've used them."
          description="Tap any skill to light up the roles and projects behind it."
        />
        <SkillsExplorer />
      </div>
    </section>
  );
}
