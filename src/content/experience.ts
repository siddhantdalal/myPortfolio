import type { SkillId } from "./skills";
import type { Metric, YearMonth } from "./types";

export type Logo = {
  /** Single-colour silhouette in /public/logos, used as a CSS mask so it can take any tint. */
  src: string;
  /** Intrinsic size from the SVG's viewBox, used to keep every logo at the same visual weight. */
  width: number;
  height: number;
};

export type Experience = {
  id: string;
  company: string;
  /** Registered name, shown when it differs from the brand people recognise. */
  legalName?: string;
  logo: Logo;
  /** Brand tint the logo takes on hover, per theme so it stays legible on either background. */
  brand: { dark: string; light: string };
  role: string;
  location: string;
  start: YearMonth;
  /** `null` while the role is current. */
  end: YearMonth | null;
  summary: string;
  highlights: readonly string[];
  metrics: readonly Metric[];
  skills: readonly SkillId[];
};

/** Newest first, as shown on the timeline. */
export const experience = [
  {
    id: "techbulls",
    company: "TechBulls",
    legalName: "TechBulls SoftTech Pvt. Ltd.",
    logo: { src: "/logos/techbulls.svg", width: 148, height: 30 },
    brand: { dark: "#7b9bff", light: "#3a5fd9" },
    role: "Software Developer",
    location: "Pune, India",
    start: "2025-08",
    end: null,
    summary:
      "I own Java and Python microservices end to end for fintech and banking clients, with LLM features built into the backend.",
    highlights: [
      "Own and deliver Java 8 Spring Boot and Python microservices (Spring MVC, Spring Data JPA, OAuth2) end to end across fintech and banking engagements, in Agile / Scrum.",
      "Integrated LLM capabilities through Anthropic Claude and AWS Bedrock into backend services across multiple products.",
      "Cut p95 REST API latency by ~30% with Redis caching and advanced SQL: CTEs, indexing and PostgreSQL tuning.",
      "Ship through CI/CD on AWS and Linux, with heavy use of GitHub Copilot and Cursor.",
    ],
    metrics: [{ value: 30, prefix: "−", suffix: "%", label: "p95 API latency" }],
    skills: [
      "java",
      "python",
      "spring-boot",
      "spring-mvc",
      "spring-data-jpa",
      "spring-security",
      "rest-apis",
      "microservices",
      "llm-integration",
      "claude",
      "bedrock",
      "tool-calling",
      "prompt-engineering",
      "redis",
      "sql",
      "postgresql",
      "performance",
      "aws",
      "ci-cd",
      "linux",
      "ai-assisted-dev",
      "agile",
      "react",
      "typescript",
    ],
  },
  {
    id: "inbetween",
    company: "InBetween",
    legalName: "InBetween Software Development Pvt. Ltd.",
    logo: { src: "/logos/inbetween.svg", width: 252.1, height: 40.4 },
    brand: { dark: "#ff4d6d", light: "#d31245" },
    role: "Software Developer",
    location: "Goa, India",
    start: "2024-09",
    end: "2025-04",
    summary: "I architected the event-driven backbone of a multi-format publication platform.",
    highlights: [
      "Architected 4 Spring Boot and Node.js distributed, event-driven microservices on Oracle and PostgreSQL for a scalable multi-format publication platform.",
      "Built ETL / data-ingestion pipelines and AI-suggested templates (LLM integration) for users.",
      "Cut async processing latency by ~40% by moving the work onto Kafka event streams.",
      "Containerised with Docker and shipped through Jenkins CI/CD on AWS (ECS, S3, IAM) and Linux.",
    ],
    metrics: [
      { value: 4, label: "microservices architected" },
      { value: 40, prefix: "−", suffix: "%", label: "async latency" },
    ],
    skills: [
      "java",
      "spring-boot",
      "spring-mvc",
      "nodejs",
      "microservices",
      "event-driven",
      "kafka",
      "oracle",
      "postgresql",
      "etl",
      "llm-integration",
      "docker",
      "ci-cd",
      "aws",
      "linux",
    ],
  },
  {
    id: "william-hill",
    company: "William Hill",
    logo: { src: "/logos/william-hill.svg", width: 76, height: 21 },
    brand: { dark: "#d4bd85", light: "#00143c" },
    role: "Software Developer",
    location: "London, UK",
    start: "2023-03",
    end: "2024-01",
    summary: "I kept payments, settlement and reconciliation running for a high-traffic betting platform.",
    highlights: [
      "Designed and operated high-traffic, fault-tolerant Spring Boot REST microservices for payments, settlement and reconciliation.",
      "Sustained 99.9% uptime across 500K+ transactions a day.",
      "Migrated synchronous workflows to multithreaded, Kafka event-driven processing, with ~25% faster confirmations.",
      "Drove observability and incident response across 25+ P1/P2 incidents with MTTR under 30 minutes, and ran in-depth code reviews.",
    ],
    metrics: [
      { value: 99.9, decimals: 1, suffix: "%", label: "uptime" },
      { value: 500, suffix: "K+", label: "transactions / day" },
      { value: 30, prefix: "<", suffix: " min", label: "MTTR" },
    ],
    skills: [
      "java",
      "spring-boot",
      "rest-apis",
      "microservices",
      "spring-security",
      "kafka",
      "event-driven",
      "concurrency",
      "system-design",
      "redis",
      "azure",
      "kubernetes",
      "observability",
    ],
  },
  {
    id: "vision-rt",
    company: "Vision RT",
    legalName: "Vision RT Ltd.",
    logo: { src: "/logos/vision-rt.svg", width: 181.08, height: 51.61 },
    brand: { dark: "#4ea8e6", light: "#0066a5" },
    role: "Software Engineer",
    location: "London, UK",
    start: "2022-09",
    end: "2023-03",
    summary: "I built services and data pipelines for safety-critical radiation-therapy software.",
    highlights: [
      "Built Java / Spring Boot services and large-scale ETL / data-ingestion pipelines for safety-critical, high-reliability software.",
      "Contributed C# / .NET Core imaging work alongside the Java stack.",
      "Wrote clean, testable code with TDD and design patterns, reaching ~90% unit-test coverage through CI/CD.",
    ],
    metrics: [{ value: 90, prefix: "~", suffix: "%", label: "unit-test coverage" }],
    skills: ["java", "spring-boot", "etl", "csharp", "tdd", "design-patterns", "ci-cd"],
  },
  {
    id: "code-ninjas",
    company: "Code Ninjas",
    legalName: "iDOJO Ltd.",
    logo: { src: "/logos/code-ninjas.svg", width: 158.408, height: 33.164 },
    brand: { dark: "#3fa9dd", light: "#1880b3" },
    role: "Application Developer & Coding Mentor",
    location: "London, UK",
    start: "2021-05",
    end: "2022-08",
    summary: "I built the app that tracked student progress, and taught kids to code.",
    highlights: [
      "Built a full-stack Spring Boot and SQL Server application tracking 300+ students' progress.",
      "Automated weekly reporting, cutting admin time by ~30%.",
      "Mentored learners aged 7–14 in JavaScript and game development.",
    ],
    metrics: [
      { value: 300, suffix: "+", label: "students tracked" },
      { value: 30, prefix: "−", suffix: "%", label: "admin time" },
    ],
    skills: ["java", "spring-boot", "sql", "javascript"],
  },
] as const satisfies readonly Experience[];

export type ExperienceId = (typeof experience)[number]["id"];

const byId = new Map<string, Experience>(experience.map((role) => [role.id, role]));

export function getExperience(id: ExperienceId): Experience {
  return byId.get(id)!;
}
