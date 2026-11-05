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
          title="5 years across payments, banking and healthcare."
          description="Newest first. Open any role for the details and the stack I used there."
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
