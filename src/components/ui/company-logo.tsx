import type { CSSProperties } from "react";
import type { Experience } from "@/content/experience";
import { withBasePath } from "@/lib/paths";

/** Area in px² each logo covers; wide and compact logos then read at the same visual weight. */
const AREA = { sm: 1150, md: 2600 } as const;

type CompanyLogoProps = {
  company: Pick<Experience, "company" | "logo" | "brand">;
  size?: keyof typeof AREA;
  /** Forces the brand tint, e.g. when the company is highlighted from elsewhere on the page. */
  active?: boolean;
  className?: string;
};

export function CompanyLogo({ company, size = "md", active, className = "" }: CompanyLogoProps) {
  const ratio = company.logo.width / company.logo.height;
  const style = {
    width: Math.round(Math.sqrt(AREA[size] * ratio)),
    height: Math.round(Math.sqrt(AREA[size] / ratio)),
    "--logo": `url(${withBasePath(company.logo.src)})`,
    "--brand-dark": company.brand.dark,
    "--brand-light": company.brand.light,
  } as CSSProperties;

  return (
    <span
      role="img"
      aria-label={`${company.company} logo`}
      data-active={active ? "true" : undefined}
      className={`logo-mark ${className}`}
      style={style}
    />
  );
}
