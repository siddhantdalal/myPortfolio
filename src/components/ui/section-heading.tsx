import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
};

export function SectionHeading({ index, eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
        <span className="text-subtle">{index}</span>
        <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-pretty text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
