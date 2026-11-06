import { SystemGraph } from "../hero/system-graph";
import { SkillsExplorer } from "../skills/skills-explorer";
import { Reveal } from "../ui/reveal";
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

        {/* The shape of a typical system I build, as an interactive overview before the full list. */}
        <Reveal className="mb-14 grid items-center gap-6 rounded-2xl border border-line bg-elevated/50 p-5 sm:p-8 lg:grid-cols-[1fr_1.6fr] lg:gap-10">
          <div>
            <p className="font-mono text-[11px] tracking-widest text-subtle uppercase">system.map</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              A typical system I build
            </h3>
            <p className="mt-2 text-sm text-pretty text-muted">
              A Spring Boot API with Redis in front, Kafka feeding multithreaded consumers, PostgreSQL behind
              them and Claude on AWS Bedrock for the AI features.{" "}
              <span className="hidden pointer-fine:inline">Hover</span>
              <span className="pointer-fine:hidden">Tap</span> a component to see where I&apos;ve used it.
            </p>
          </div>
          <SystemGraph />
        </Reveal>

        <SkillsExplorer />
      </div>
    </section>
  );
}
