import type { Metric } from "./types";

export const profile = {
  name: "Siddhant Dalal",
  role: "Java Backend Engineer",
  location: "Nagpur, India",
  url: "https://siddhantdalal.github.io/myPortfolio",
  description:
    "Java backend engineer with 5 years of building scalable Spring Boot microservices for financial services and fintech, now integrating LLMs (Anthropic Claude, AWS Bedrock) into production backends.",
  /** Rotating phrases in the hero: "I build …". */
  focus: [
    "Spring Boot microservices",
    "event-driven systems on Kafka",
    "LLM features with Claude",
    "APIs that hold up under load",
  ],
  about: [
    "I'm a Java backend engineer with five years of building enterprise microservices for financial services and fintech: payments, settlement, invoice financing, disputes. Most of my work lives in Spring Boot, Kafka, Redis and SQL, and in the details that keep systems fast and up: concurrency, query tuning, observability and incident response.",
    "Lately I've been building LLMs into those backends: Anthropic Claude and AWS Bedrock in production services, and multi-model orchestration across Claude, GPT and Gemini, with tool calling and evals to keep the output honest.",
    "I've worked in London and in India, on everything from a betting platform handling half a million transactions a day to safety-critical radiation-therapy software. Along the way I taught kids aged 7 to 14 to code.",
  ],
  /** Headline numbers for the About dashboard, each tied to where it was achieved. */
  metrics: [
    { value: 5, suffix: "+ yrs", label: "building backends", source: "2021 – today" },
    { value: 99.9, decimals: 1, suffix: "%", label: "uptime sustained", source: "William Hill" },
    { value: 500, suffix: "K+", label: "transactions a day", source: "William Hill" },
    { value: 30, prefix: "−", suffix: "%", label: "p95 API latency", source: "TechBulls" },
    { value: 40, prefix: "−", suffix: "%", label: "async processing latency", source: "InBetween" },
    { value: 30, prefix: "<", suffix: " min", label: "MTTR across 25+ P1/P2s", source: "William Hill" },
  ] satisfies readonly (Metric & { source: string })[],
  education: [
    {
      degree: "MSc Network Management & Cloud Computing",
      school: "Middlesex University, London",
      year: 2021,
    },
    { degree: "BCA Computer Science", school: "Sri Shivaji Science College, Nagpur", year: 2019 },
  ],
  certifications: ["HackerRank Frontend Developer (React)", "HackerRank Angular (Intermediate)"],
  resume: "/Siddhant_Dalal_Resume.pdf",
  links: {
    github: "https://github.com/siddhantdalal",
    /** Not shown until a URL is filled in. */
    linkedin: null as string | null,
  },
  contact: {
    email: "siddhantsdalal@gmail.com",
    /**
     * Kept in pieces so the full number never appears as one string in the page or its scripts,
     * which is what scrapers pattern-match on. It is assembled only when someone clicks.
     */
    phoneParts: ["+91", "73874", "53882"],
    whatsappGreeting: "Hi Siddhant, I came across your portfolio and would like to connect.",
    emailSubject: "Hello from your portfolio",
  },
} as const;
