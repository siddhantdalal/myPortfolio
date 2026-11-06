import { sections } from "@/content/navigation";
import { profile } from "@/content/profile";
import { mailtoUrl } from "@/lib/contact";
import { withBasePath } from "@/lib/paths";
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const headingClass = "font-mono text-[11px] tracking-widest text-subtle uppercase";
const linkClass = "inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { linkedin, github } = profile.links;

  return (
    // Extra bottom space on phones keeps the floating contact bar from covering the last line.
    <footer className="border-t border-line bg-elevated/40 pb-28 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ok">
            <span className="size-2 rounded-full bg-ok" aria-hidden="true" />
            Open to work · {profile.openTo.availability}
          </p>
          <p className="mt-1 text-sm text-muted">Based in {profile.location}</p>
        </div>

        <nav aria-label="Footer">
          <p className={headingClass}>Sections</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className={linkClass}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={headingClass}>Contact</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={mailtoUrl()} className={linkClass}>
                <MailIcon className="shrink-0" />
                {profile.contact.email}
              </a>
            </li>
            {linkedin && (
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <LinkedInIcon className="shrink-0" />
                  LinkedIn
                  <ArrowUpRightIcon className="size-3" />
                </a>
              </li>
            )}
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubIcon className="shrink-0" />
                GitHub
                <ArrowUpRightIcon className="size-3" />
              </a>
            </li>
            <li>
              <a href={withBasePath(profile.resume)} download className={linkClass}>
                <DownloadIcon className="shrink-0" />
                Download résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-subtle sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="md:max-w-md md:text-center">
            Company names and logos are trademarks of their respective owners, shown only to indicate past
            employment.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
