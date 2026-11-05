import { profile } from "@/content/profile";
import { ConnectChannels, CopyEmailButton } from "../connect/connect-channels";
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "../icons";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";

const linkClass =
  "group inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg";

export function ConnectSection() {
  const { github, linkedin } = profile.links;

  return (
    <section id="connect" aria-labelledby="connect-title" className="relative overflow-x-clip py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,var(--accent-soft),transparent)]"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="connect-title"
          index="05"
          eyebrow="Connect"
          title="Let's build something that stays up."
          description="A role, a project or a question about distributed systems: pick whichever channel suits you."
        />
        <ConnectChannels />

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <LinkedInIcon />
              LinkedIn
              <ArrowUpRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <GitHubIcon />
            GitHub
            <ArrowUpRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href={profile.resume} download className={linkClass}>
            <DownloadIcon className="transition-transform duration-300 group-hover:translate-y-0.5" />
            Résumé (PDF)
          </a>
          <CopyEmailButton />
        </Reveal>
      </div>
    </section>
  );
}
