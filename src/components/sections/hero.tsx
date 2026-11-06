import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { RESUME_HASH } from "@/lib/resume";
import { AnimatedName } from "../hero/animated-name";
import { HeroBackdrop } from "../hero/hero-backdrop";
import { HeroPortrait } from "../hero/hero-portrait";
import { RotatingText } from "../hero/rotating-text";
import { ArrowDownIcon, ArrowRightIcon, FileIcon, GitHubIcon, LinkedInIcon } from "../icons";
import { CompanyLogo } from "../ui/company-logo";
import { CountUp } from "../ui/count-up";
import { Magnetic } from "../ui/magnetic";

const heroMetrics = profile.metrics.filter((metric) => "hero" in metric && metric.hero);

/**
 * Built for a recruiter skimming on a phone: title, availability, keywords and proof come before
 * anything decorative, and both calls to action sit high on the page.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-x-clip pt-24 pb-16 sm:pt-28"
    >
      <HeroBackdrop />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <p
            className="animate-fade-up mb-5 inline-flex items-center gap-2.5 rounded-full border border-ok/30 bg-ok/10 px-3 py-1.5 text-xs font-medium text-ok"
            style={{ animationDelay: "0s" }}
          >
            <span className="relative flex size-2">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-ok" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            Open to work · {profile.openTo.availability}
          </p>

          <h1
            id="hero-title"
            className="text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <AnimatedName text={profile.name} />
          </h1>

          <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <p className="mt-4 text-xl font-semibold text-fg sm:text-3xl">{profile.role}</p>
            <p className="mt-2 text-base text-muted sm:text-xl">
              5 years building
              <br />
              <RotatingText phrases={profile.focus} />
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Core skills">
              {profile.keyStack.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line bg-surface/70 px-2.5 py-1 font-mono text-xs text-fg"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid max-w-md grid-cols-3 divide-x divide-line rounded-xl border border-line bg-elevated/60 backdrop-blur">
              {heroMetrics.map((metric) => (
                <div key={metric.label} className="px-3 py-3 sm:px-4">
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <CountUp
                      metric={metric}
                      className="block text-lg font-semibold text-accent sm:text-2xl"
                    />
                    <span
                      aria-hidden="true"
                      className="mt-0.5 block text-[11px] leading-tight text-muted sm:text-xs"
                    >
                      {metric.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="animate-fade-up mt-7 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <Magnetic>
              <a
                href="#connect"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/20 transition-shadow hover:shadow-accent/40"
              >
                Contact me
                <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={RESUME_HASH}
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <FileIcon className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Résumé
              </a>
            </Magnetic>
            {profile.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="grid size-12 place-items-center rounded-full border border-line text-lg text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedInIcon />
              </a>
            )}
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid size-12 place-items-center rounded-full border border-line text-lg text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon />
            </a>
          </div>

          <div className="animate-fade-up mt-8" style={{ animationDelay: "0.65s" }}>
            <p className="font-mono text-[10px] tracking-widest text-subtle uppercase">Experience at</p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-4">
              {experience.map((role) => (
                <li
                  key={role.id}
                  className="group"
                  title={"legalName" in role ? role.legalName : role.company}
                >
                  <CompanyLogo company={role} size="sm" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shown first on phones, so visitors see who they're reading about before the details. */}
        <div className="max-lg:order-first">
          <HeroPortrait />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-subtle transition-colors hover:text-accent lg:block"
      >
        <ArrowDownIcon className="size-5" />
      </a>
    </section>
  );
}
