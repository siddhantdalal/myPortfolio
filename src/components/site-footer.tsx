import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono">
          Next.js · Tailwind CSS · Motion · GitHub Pages
          <span className="hidden sm:inline">
            {" "}
            · press <kbd className="rounded border border-line px-1">⌘K</kbd>
          </span>
        </p>
      </div>
    </footer>
  );
}
