import type { Metric } from "./types";

export const profile = {
  name: "Siddhant Dalal",
  role: "Senior Java Backend Engineer",
  location: "Nagpur, India",
  url: "https://siddhantdalal.github.io/myPortfolio",
  description:
    "Senior Java Backend Engineer with 5 years of building Spring Boot microservices for payments, banking and fintech (Kafka, AWS, React, LLM integration). Immediate joiner, open to remote or Mumbai roles.",
  /** Rotating phrases in the hero: "5 years building …". */
  focus: [
    "Spring Boot microservices",
    "event-driven systems on Kafka",
    "full-stack apps with React",
    "LLM features with Claude",
  ],
  /** What recruiters screen for first: shown in the hero, the At-a-glance card and Connect. */
  openTo: {
    roles: ["Java / Spring Boot backend", "Full-stack (Java + React)"],
    workModes: ["Remote", "Hybrid or on-site in Mumbai"],
    availability: "Immediate joiner",
  },
  /** Search keywords recruiters match on, shown as chips in the hero. */
  keyStack: ["Java", "Spring Boot", "Kafka", "Microservices", "AWS", "React"],
  domains: ["Payments", "Banking & fintech", "Publishing", "Healthcare"],
  about: [
    "I'm a senior Java backend engineer with five years of building Spring Boot microservices for payments, banking and fintech, in London and in India. I focus on what keeps systems fast and up: Kafka event flows, Redis caching, SQL tuning, concurrency, observability and incident response.",
    "I also work across the stack with React and TypeScript, and I've built LLM features into production backends with Anthropic Claude and AWS Bedrock.",
    "Highlights so far: 99.9% uptime on a betting platform handling 500K+ transactions a day, p95 API latency cut by 30%, async processing latency cut by 40%, and ~90% test coverage on safety-critical healthcare software.",
  ],
  /**
   * Headline numbers for the About dashboard, each tied to where it was achieved.
   * `hero` marks the three strongest, repeated above the fold.
   */
  metrics: [
    { value: 5, suffix: " yrs", label: "building backends", source: "2021 – 2026" },
    { value: 99.9, decimals: 1, suffix: "%", label: "uptime", source: "William Hill", hero: true },
    { value: 500, suffix: "K+", label: "transactions a day", source: "William Hill", hero: true },
    { value: 30, prefix: "−", suffix: "%", label: "p95 API latency", source: "TechBulls", hero: true },
    { value: 40, prefix: "−", suffix: "%", label: "async processing latency", source: "InBetween" },
    { value: 30, prefix: "<", suffix: " min", label: "MTTR across 25+ P1/P2s", source: "William Hill" },
  ] satisfies readonly (Metric & { source: string; hero?: boolean })[],
  education: [
    {
      degree: "MSc Network Management & Cloud Computing",
      school: "Middlesex University, London",
      year: 2021,
    },
    { degree: "BCA Computer Science", school: "Sri Shivaji Science College, Nagpur", year: 2019 },
  ],
  /** `url` is the public credential page; a "Verify" link appears once it is set. */
  certifications: [
    { name: "Frontend Developer (React)", issuer: "HackerRank", url: null as string | null },
    { name: "Angular (Intermediate)", issuer: "HackerRank", url: null as string | null },
  ],
  resume: "/Siddhant_Dalal_Resume.pdf",
  links: {
    github: "https://github.com/siddhantdalal",
    /** Optional: the LinkedIn button is only shown while this is set. */
    linkedin: "https://www.linkedin.com/in/siddhantdalal" as string | null,
  },
  contact: {
    email: "siddhantsdalal@gmail.com",
    /**
     * Kept in pieces so the full number never appears as one string in the page or its scripts,
     * which is what scrapers pattern-match on. It is assembled only when someone clicks.
     */
    phoneParts: ["+91", "73874", "53882"],
    whatsappGreeting:
      "Hi Siddhant, I'm a recruiter and found your portfolio. I have a role that may suit you.",
    emailSubject: "Job opportunity for Siddhant Dalal",
    /** Pre-filled so recruiters send the details needed to reply quickly. */
    emailBody: [
      "Hi Siddhant,",
      "",
      "I'm hiring for a role that may suit you.",
      "",
      "Role:",
      "Company:",
      "Location / work mode:",
      "",
      "Thanks,",
    ].join("\n"),
  },
} as const;
