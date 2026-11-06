import type { ReactNode } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { formatRange, formatYearMonth } from "@/lib/format";
import { withBasePath } from "@/lib/paths";
import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon } from "../icons";
import { CountUp } from "../ui/count-up";
import { Portrait } from "../ui/portrait";
import { Reveal, Stagger, StaggerItem } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { Spotlight } from "../ui/spotlight";

const latest = experience[0];
// Stamped at build time: every deploy refreshes it, which signals the availability is current.
const now = new Date();
const updated = formatYearMonth(`${now.getFullYear()}-${now.getMonth() + 1}`);
const [masters] = profile.education;

const certifications = (
  <ul className="space-y-1">
    {profile.certifications.map((certification) => (
      <li key={certification.name}>
        {certification.issuer}: {certification.name}
        {certification.url && (
          <a
            href={certification.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Verify
            <ArrowUpRightIcon className="size-3" />
          </a>
        )}
      </li>
    ))}
  </ul>
);

/** The answers to a recruiter's screening questions, in the order they usually ask them. */
const facts: { label: string; value: ReactNode; highlight?: boolean }[] = [
  { label: "Role", value: profile.role },
  { label: "Experience", value: "5 years · India & UK" },
  {
    label: "Most recent",
    value: `${latest.role}, ${latest.company} (${formatRange(latest.start, latest.end)})`,
  },
  { label: "Core stack", value: "Java 8–21, Spring Boot, Kafka, Redis, SQL, AWS" },
  { label: "Also", value: "React / TypeScript, LLM integration (Claude, AWS Bedrock)" },
  { label: "Domains", value: profile.domains.join(", ") },
  { label: "Open to", value: profile.openTo.roles.join(" · "), highlight: true },
  { label: "Work mode", value: profile.openTo.workModes.join(" · "), highlight: true },
  { label: "Availability", value: profile.openTo.availability, highlight: true },
  { label: "Based in", value: profile.location },
  { label: "Education", value: `${masters.degree}, ${masters.school} (${masters.year})` },
  { label: "Certified", value: certifications },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title="At a glance."
          description="Everything a hiring team usually asks first, on one card."
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-line bg-elevated">
              <div className="flex items-center gap-4 border-b border-line bg-surface/50 px-5 py-4 sm:px-6">
                <Portrait size={56} />
                <div className="min-w-0">
                  <p className="text-base font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted">{profile.role}</p>
                </div>
                <span className="ml-auto hidden shrink-0 rounded-full border border-ok/30 bg-ok/10 px-2.5 py-1 text-xs font-medium text-ok sm:inline">
                  {profile.openTo.availability}
                </span>
              </div>
              <dl className="divide-y divide-line">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-1 px-5 py-3.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4 sm:px-6"
                  >
                    <dt className="font-mono text-[11px] tracking-wider text-subtle uppercase sm:pt-0.5">
                      {fact.label}
                    </dt>
                    <dd
                      className={`text-sm sm:text-base ${fact.highlight ? "font-medium text-ok" : "text-fg"}`}
                    >
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3 border-t border-line bg-surface/50 px-5 py-4 sm:px-6">
                <a
                  href="#connect"
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-fg"
                >
                  Contact me
                  <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={withBasePath(profile.resume)}
                  download
                  className="group inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <DownloadIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download résumé
                </a>
                <p className="ml-auto self-center font-mono text-[10px] text-subtle">Updated {updated}</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <div className="space-y-4 text-base leading-relaxed text-pretty text-muted">
              {profile.about.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div>
              <Reveal>
                <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-subtle">
                  <span className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
                    impact.dashboard
                  </span>
                  <span>status: healthy</span>
                </div>
              </Reveal>
              <Stagger className="grid grid-cols-2 gap-3">
                {profile.metrics.map((metric) => (
                  <StaggerItem key={metric.label}>
                    <Spotlight className="group h-full rounded-2xl border border-line bg-elevated p-4 transition-colors hover:border-line-strong sm:p-5">
                      <CountUp
                        metric={metric}
                        className="block text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
                      />
                      <p className="mt-1.5 text-sm text-muted">{metric.label}</p>
                      <p className="mt-2 font-mono text-[10px] tracking-wider text-subtle uppercase transition-colors group-hover:text-accent">
                        {metric.source}
                      </p>
                    </Spotlight>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
