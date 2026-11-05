import { profile } from "@/content/profile";
import { AnimatedName } from "../hero/animated-name";
import { HeroBackdrop } from "../hero/hero-backdrop";
import { RotatingText } from "../hero/rotating-text";
import { SystemGraph } from "../hero/system-graph";
import { ArrowDownIcon, ArrowRightIcon, DownloadIcon } from "../icons";
import { Magnetic } from "../ui/magnetic";
import { Reveal } from "../ui/reveal";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-x-clip pt-28 pb-20"
    >
      <HeroBackdrop />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <Reveal y={12}>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur">
              <span className="relative flex size-2">
                <span className="animate-pulse-ring absolute inset-0 rounded-full bg-ok" />
                <span className="relative size-2 rounded-full bg-ok" />
              </span>
              {profile.role} · {profile.location}
            </p>
          </Reveal>

          <h1
            id="hero-title"
            className="text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <AnimatedName text={profile.name} />
          </h1>

          <Reveal delay={0.5} y={16}>
            <p className="mt-6 text-lg font-medium sm:text-2xl">
              I build
              <br />
              <RotatingText phrases={profile.focus} />
            </p>
            <p className="mt-5 max-w-xl text-base text-pretty text-muted sm:text-lg">
              Five years of scalable Spring Boot microservices for fintech: 99.9% uptime at 500K+ transactions
              a day. Now I build LLMs into the backend.
            </p>
          </Reveal>

          <Reveal delay={0.7} y={16} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/20 transition-shadow hover:shadow-accent/40"
              >
                View projects
                <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#connect"
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Connect
              </a>
            </Magnetic>
            <a
              href={profile.resume}
              download
              className="group inline-flex h-12 items-center gap-2 px-3 text-sm text-muted transition-colors hover:text-fg"
            >
              <DownloadIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Résumé
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={0}>
          <SystemGraph />
          <p className="mt-3 text-center font-mono text-[11px] text-subtle">
            <span className="pointer-fine:inline hidden">Hover</span>
            <span className="pointer-fine:hidden">Tap</span> a component to see where I&apos;ve used it
          </p>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-subtle transition-colors hover:text-accent md:block"
      >
        <ArrowDownIcon className="size-5" />
      </a>
    </section>
  );
}
