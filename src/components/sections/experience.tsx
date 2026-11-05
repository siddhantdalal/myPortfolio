import { experience } from "@/content/experience";
import { ExperienceItem } from "../experience/experience-item";
import { Timeline } from "../experience/timeline";
import { SectionHeading } from "../ui/section-heading";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title="Five teams, two countries."
          description="From betting payments in London to banking and AI products in Pune: the roles, and what changed because I was there."
        />
        <Timeline>
          {experience.map((role, index) => (
            <ExperienceItem key={role.id} role={role} index={index} />
          ))}
        </Timeline>
      </div>
    </section>
  );
}
