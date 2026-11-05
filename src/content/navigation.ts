/** Page sections in order; ids match the `<section id>` of each. */
export const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "connect", label: "Connect" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
