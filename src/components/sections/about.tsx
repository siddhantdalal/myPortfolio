import { profile } from "@/content/profile";
import { CountUp } from "../ui/count-up";
import { Reveal, Stagger, StaggerItem } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { Spotlight } from "../ui/spotlight";

const path = [
  { place: "Nagpur", detail: "BCA Computer Science", years: "→ 2019" },
  { place: "London", detail: "MSc, then three roles", years: "2021 – 2024" },
  { place: "Goa", detail: "InBetween", years: "2024 – 2025" },
  { place: "Pune", detail: "TechBulls", years: "2025 →" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="about-title"
          index="01"
          eyebrow="About"
          title="Backends that stay fast, stay up, and now think."
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {profile.about.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p>{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <ol className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                {path.map((stop, index) => (
                  <li key={stop.place} className="bg-bg p-4">
                    <p className="font-mono text-[10px] tracking-widest text-subtle uppercase">
                      0{index + 1} · {stop.years}
                    </p>
                    <p className="mt-2 text-base font-semibold text-fg">{stop.place}</p>
                    <p className="mt-0.5 text-xs text-muted">{stop.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-subtle">
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
                  <Spotlight className="group h-full rounded-2xl border border-line bg-elevated p-5 transition-colors hover:border-line-strong">
                    <CountUp
                      metric={metric}
                      className="block text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
                    />
                    <p className="mt-2 text-sm text-muted">{metric.label}</p>
                    <p className="mt-3 font-mono text-[10px] tracking-wider text-subtle uppercase transition-colors group-hover:text-accent">
                      {metric.source}
                    </p>
                  </Spotlight>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-6 rounded-2xl border border-line p-5">
              <p className="font-mono text-[10px] tracking-widest text-subtle uppercase">Education</p>
              <ul className="mt-3 space-y-2.5">
                {profile.education.map((item) => (
                  <li key={item.degree} className="flex items-baseline justify-between gap-4 text-sm">
                    <span>
                      <span className="text-fg">{item.degree}</span>
                      <span className="block text-muted">{item.school}</span>
                    </span>
                    <span className="font-mono text-xs text-subtle">{item.year}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] tracking-widest text-subtle uppercase">
                Certifications
              </p>
              <p className="mt-2 text-sm text-muted">{profile.certifications.join(" · ")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
