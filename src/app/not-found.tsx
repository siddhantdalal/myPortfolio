import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-6xl flex-col items-start justify-center px-4 sm:px-6">
      <p className="font-mono text-sm text-accent">404 Not Found</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        This route doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-muted">No service is listening here. The rest of the system is up, though.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-fg"
      >
        Back to the homepage
      </Link>
    </section>
  );
}
