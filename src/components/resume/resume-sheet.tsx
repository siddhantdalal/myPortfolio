import type { ReactNode } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { type Project, projects } from "@/content/projects";
import { skillGroups, skills } from "@/content/skills";
import { mailtoUrl } from "@/lib/contact";
import { formatRange } from "@/lib/format";
import { RESUME_TITLE_ID } from "@/lib/resume";
import { ArrowUpRightIcon } from "../icons";

// Client work is already told role by role under Experience, so the projects list adds the personal ones.
const personalProjects: readonly Project[] = projects.filter((project) => project.org === "personal");

const linkClass = "inline-flex items-center gap-1 transition-colors hover:text-accent";

function Block({ title, delay, children }: { title: string; delay: number; children: ReactNode }) {
  return (
    <section className="animate-fade-up" style={{ animationDelay: `${delay}s` }}>
      <h3 className="mb-4 border-b border-line pb-2 font-mono text-[11px] tracking-widest text-accent uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2.5 space-y-1.5 text-sm text-muted">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The résumé as a page, built from the same content as the rest of the site, so it can't drift
 * from it. Shown inside the résumé viewer; the PDF stays available to download.
 */
export function ResumeSheet() {
  const { linkedin, github } = profile.links;
  const { roles, workModes, availability } = profile.openTo;

  return (
    <article className="px-5 py-7 sm:px-10 sm:py-9">
      <header className="animate-fade-up border-b border-line pb-6">
        <h2 id={RESUME_TITLE_ID} className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.name}
        </h2>
        <p className="mt-1 text-lg text-fg">{profile.role}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
          <li>{profile.location}</li>
          <li>
            <a href={mailtoUrl()} className={linkClass}>
              {profile.contact.email}
            </a>
          </li>
          {linkedin && (
            <li>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
                <ArrowUpRightIcon className="size-3" />
              </a>
            </li>
          )}
          <li>
            <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
              <ArrowUpRightIcon className="size-3" />
            </a>
          </li>
        </ul>
        <p className="mt-4 inline-flex items-start gap-2 rounded-lg border border-ok/30 bg-ok/10 px-3 py-1.5 text-xs font-medium text-ok">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-ok" aria-hidden="true" />
          Open to {roles.join(" · ")} · {workModes.join(" · ")} · {availability}
        </p>
      </header>

      <div className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-9">
          <Block title="Summary" delay={0.05}>
            <p className="text-sm text-pretty text-muted">{profile.about[0]}</p>
          </Block>

          <Block title="Experience" delay={0.1}>
            <ol className="space-y-6">
              {experience.map((role) => (
                <li key={role.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h4 className="font-semibold">
                      {role.role} · {role.company}
                    </h4>
                    <p className="font-mono text-xs text-subtle">{formatRange(role.start, role.end)}</p>
                  </div>
                  <p className="text-xs text-subtle">
                    {"legalName" in role && role.legalName ? `${role.legalName} · ` : ""}
                    {role.location}
                  </p>
                  <Bullets items={role.highlights} />
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Personal projects" delay={0.15}>
            <ul className="space-y-5">
              {personalProjects.map((project) => (
                <li key={project.id}>
                  <h4 className="font-semibold">
                    {project.repo ? (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {project.title}
                        <ArrowUpRightIcon className="size-3" />
                      </a>
                    ) : (
                      project.title
                    )}
                  </h4>
                  <p className="mt-0.5 font-mono text-xs text-accent">{project.proof}</p>
                  <p className="mt-1.5 text-sm text-pretty text-muted">{project.summary}</p>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <div className="space-y-9">
          <Block title="Skills" delay={0.2}>
            <dl className="space-y-3 text-sm">
              {skillGroups.map((group) => (
                <div key={group.id}>
                  <dt className="font-medium">{group.label}</dt>
                  <dd className="mt-0.5 text-pretty text-muted">
                    {skills
                      .filter((skill) => skill.group === group.id)
                      .map((skill) => skill.label)
                      .join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Education" delay={0.25}>
            <ul className="space-y-3 text-sm">
              {profile.education.map((entry) => (
                <li key={entry.degree}>
                  <p className="font-medium">{entry.degree}</p>
                  <p className="text-muted">
                    {entry.school} · {entry.year}
                  </p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Certifications" delay={0.3}>
            <ul className="space-y-2 text-sm">
              {profile.certifications.map((certification) => (
                <li key={certification.name}>
                  <span className="font-medium">{certification.name}</span>
                  <span className="text-muted"> · {certification.issuer}</span>
                  {certification.url && (
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} ml-2 text-accent`}
                    >
                      Verify
                      <ArrowUpRightIcon className="size-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Domains" delay={0.35}>
            <p className="text-sm text-muted">{profile.domains.join(", ")}</p>
          </Block>
        </div>
      </div>
    </article>
  );
}
