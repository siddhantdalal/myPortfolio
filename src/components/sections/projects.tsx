import { ProjectsExplorer } from "../projects/projects-explorer";
import { SectionHeading } from "../ui/section-heading";

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Projects"
          title="What I've built."
          description="Each project opens into a live diagram of how its requests and events flow. The personal projects link to their code; employer projects are shown at architecture level only."
        />
        <ProjectsExplorer />
      </div>
    </section>
  );
}
