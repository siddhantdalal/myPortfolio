import type { ExperienceId } from "./experience";
import type { SkillId } from "./skills";

export const projectCategories = [
  { id: "ai", label: "AI" },
  { id: "fintech", label: "Fintech" },
  { id: "event-driven", label: "Event-driven" },
  { id: "healthcare", label: "Healthcare" },
  { id: "personal", label: "Personal" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

/**
 * A box in an architecture diagram, placed on a small grid (columns 0–3, rows 0–2) so the diagrams
 * stay consistent without hand-tuned coordinates.
 */
export type ArchitectureNode = {
  id: string;
  label: string;
  detail?: string;
  col: number;
  row: number;
  /** Highlights where the LLM sits in the flow. */
  ai?: boolean;
};

export type ArchitectureEdge = { from: string; to: string };

export type Architecture = {
  nodes: readonly ArchitectureNode[];
  edges: readonly ArchitectureEdge[];
  caption: string;
};

export type Project = {
  id: string;
  title: string;
  /** The employer it was built for, or `personal` for side projects. */
  org: ExperienceId | "personal";
  categories: readonly ProjectCategory[];
  /** One line of proof shown on the card: a measured result where there is one, else the key fact. */
  proof: string;
  summary: string;
  description: string;
  highlights: readonly string[];
  /** Why it is built the way it is; shown for personal projects, where the full design can be shared. */
  decisions?: readonly string[];
  skills: readonly SkillId[];
  repo?: string;
  /** Spans two grid columns on wide screens. */
  featured?: boolean;
  architecture: Architecture;
};

export const projects = [
  {
    id: "doc-to-app",
    title: "AI Document-to-App Orchestrator",
    org: "personal",
    categories: ["ai", "personal"],
    proof: "142 pytest tests · Claude, GPT & Gemini",
    featured: true,
    summary:
      "Turns a requirements document into a runnable full-stack app, orchestrating Claude, GPT and Gemini.",
    description:
      "Upload a .md, .txt, .pdf or .docx spec and get back a working FastAPI + React application. A structured Spec is the contract: every generated file traces back to a Spec node, and every node must be implemented. Bring your own key for Anthropic, OpenAI or Gemini.",
    highlights: [
      "Pipeline of extract spec → generate → validate → reconcile → package, plus chat-style refinement that produces spec-level diffs.",
      "Provider-agnostic LLM client with adapters for Claude, GPT and Gemini, tool calling and an optional per-job token budget.",
      "Live preview in a Docker Compose sandbox and one-click push to GitHub.",
      "142 pytest tests covering parsing, codegen, validation, reconciliation and the end-to-end job lifecycle.",
    ],
    decisions: [
      "The Spec is the contract: every generated file must trace back to a Spec node, and the reconciler checks that every node was built before anything is packaged.",
      "One provider-agnostic LLM client with adapters for Anthropic, OpenAI and Gemini, so a job can switch models without touching the pipeline.",
      "Users bring their own API key: it is sent per request and can be encrypted at rest in the browser (AES-GCM-256, non-extractable master key).",
      "An optional per-job token budget stops the pipeline cleanly instead of running up cost.",
    ],
    skills: [
      "python",
      "fastapi",
      "react",
      "typescript",
      "llm-integration",
      "multi-llm",
      "claude",
      "openai",
      "gemini",
      "tool-calling",
      "prompt-engineering",
      "evals",
      "docker",
    ],
    repo: "https://github.com/siddhantdalal/Document-to-a-Full-Fledge-Application",
    architecture: {
      nodes: [
        { id: "web", label: "Web UI", detail: "React · TypeScript", col: 0, row: 1 },
        { id: "api", label: "Orchestrator", detail: "FastAPI", col: 1, row: 1 },
        { id: "spec", label: "Spec extractor", detail: "doc → spec", col: 2, row: 1 },
        { id: "llm", label: "LLM client", detail: "Claude · GPT · Gemini", col: 2, row: 0, ai: true },
        { id: "gen", label: "Generator", detail: "spec → code + tests", col: 3, row: 1 },
        { id: "check", label: "Reconciler", detail: "every node built?", col: 3, row: 2 },
        { id: "preview", label: "Live preview", detail: "Docker Compose", col: 2, row: 2 },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "api", to: "spec" },
        { from: "spec", to: "llm" },
        { from: "spec", to: "gen" },
        { from: "gen", to: "llm" },
        { from: "gen", to: "check" },
        { from: "check", to: "preview" },
      ],
      caption:
        "The Spec is the contract between stages. The reconciler cross-checks every Spec node against the generated code before anything is packaged.",
    },
  },
  {
    id: "orderflow",
    title: "OrderFlow: E-commerce Order Management",
    org: "personal",
    categories: ["event-driven", "personal"],
    proof: "5 services · Kafka-driven order flow · Angular",
    summary:
      "A full-stack store where orders, payments, inventory and notifications are separate services that coordinate through Kafka events.",
    description:
      "An Angular storefront with catalogue, cart, checkout and order tracking, backed by Spring Boot microservices behind a JWT-validating Spring Cloud Gateway. Placing an order starts a chain of Kafka events through payment and inventory to confirmation and delivery.",
    highlights: [
      "Order lifecycle driven by Kafka events: ORDER_PLACED → PAYMENT_COMPLETED → STOCK_RESERVED → CONFIRMED → SHIPPED → DELIVERED.",
      "Order, payment, inventory and notification services, each with its own PostgreSQL database.",
      "Redis caching for products and order status; product images on S3 (LocalStack locally).",
      "Angular 17 SPA served by Nginx; the whole stack runs with Docker Compose.",
    ],
    decisions: [
      "Choreography over orchestration: services react to each other's events on Kafka instead of calling each other, so they stay decoupled.",
      "Failures are events too (PAYMENT_FAILED, STOCK_UNAVAILABLE), so the order service always learns the outcome and can update the order.",
      "A database per service keeps data ownership clear; Redis caches the hot reads (products and order status).",
    ],
    skills: [
      "java",
      "spring-boot",
      "spring-security",
      "microservices",
      "kafka",
      "event-driven",
      "redis",
      "postgresql",
      "angular",
      "typescript",
      "aws",
      "docker",
    ],
    repo: "https://github.com/siddhantdalal/order-management-system",
    architecture: {
      nodes: [
        { id: "web", label: "Angular SPA", detail: "via Nginx", col: 0, row: 1 },
        { id: "gw", label: "API Gateway", detail: "JWT · routing", col: 1, row: 1 },
        { id: "order", label: "Order service", detail: "order lifecycle", col: 2, row: 0 },
        { id: "payment", label: "Payment service", detail: "Spring Boot", col: 2, row: 1 },
        { id: "inventory", label: "Inventory service", detail: "stock", col: 2, row: 2 },
        { id: "db", label: "PostgreSQL", detail: "per service + Redis", col: 3, row: 0 },
        { id: "kafka", label: "Kafka", detail: "order events", col: 3, row: 1 },
        { id: "notify", label: "Notifications", detail: "listens to all", col: 3, row: 2 },
      ],
      edges: [
        { from: "web", to: "gw" },
        { from: "gw", to: "order" },
        { from: "order", to: "db" },
        { from: "order", to: "kafka" },
        { from: "kafka", to: "payment" },
        { from: "kafka", to: "inventory" },
        { from: "kafka", to: "notify" },
      ],
      caption:
        "No service calls another directly: each reacts to the previous event, and notifications listen to all of them.",
    },
  },
  {
    id: "ai-interviewer",
    title: "AI-Interviewer",
    org: "techbulls",
    categories: ["ai"],
    proof: "Claude on AWS Bedrock · tool calling",
    summary: "An LLM-powered platform that runs multi-turn interviews and scores candidate answers.",
    description:
      "Generates interview questions, conducts multi-turn interviews and evaluates and scores candidate responses, with Claude on AWS Bedrock doing the reasoning through tool calls.",
    highlights: [
      "Multi-turn interview flow with generated questions and follow-ups.",
      "Evaluation and scoring of candidate responses through Claude on AWS Bedrock, using tool / function calling.",
      "Java / Python services on Spring Boot with a React / TypeScript front end, PostgreSQL and AWS.",
    ],
    skills: [
      "llm-integration",
      "claude",
      "bedrock",
      "tool-calling",
      "prompt-engineering",
      "java",
      "python",
      "spring-boot",
      "react",
      "typescript",
      "postgresql",
      "aws",
    ],
    architecture: {
      nodes: [
        { id: "ui", label: "Candidate UI", detail: "React · TypeScript", col: 0, row: 1 },
        { id: "api", label: "Interview API", detail: "Spring Boot", col: 1, row: 1 },
        { id: "engine", label: "Interview engine", detail: "Java · Python", col: 2, row: 1 },
        { id: "llm", label: "Claude", detail: "AWS Bedrock · tools", col: 3, row: 0, ai: true },
        { id: "db", label: "PostgreSQL", detail: "sessions · scores", col: 3, row: 2 },
      ],
      edges: [
        { from: "ui", to: "api" },
        { from: "api", to: "engine" },
        { from: "engine", to: "llm" },
        { from: "engine", to: "db" },
      ],
      caption:
        "Questions, follow-ups and scoring come from the model through tool calls; results are stored for review.",
    },
  },
  {
    id: "supply-chain-finance",
    title: "Supply Chain Finance Platform",
    org: "techbulls",
    categories: ["fintech", "ai"],
    proof: "Banking clients · LLM-assisted workflows",
    summary: "Invoice-financing and vendor-funding workflows for banking clients, with LLM assistance.",
    description:
      "Spring Boot microservices that run invoice-financing and vendor-funding workflows for banks, with Anthropic Claude on AWS Bedrock integrated into the flow.",
    highlights: [
      "Invoice-financing and vendor-funding workflows built as Spring Boot microservices.",
      "Anthropic Claude / AWS Bedrock LLM integration inside the backend services.",
      "OAuth2-secured REST APIs on PostgreSQL and Redis, deployed on AWS.",
    ],
    skills: [
      "java",
      "python",
      "spring-boot",
      "microservices",
      "spring-data-jpa",
      "spring-security",
      "postgresql",
      "redis",
      "rest-apis",
      "llm-integration",
      "claude",
      "bedrock",
      "aws",
    ],
    architecture: {
      nodes: [
        { id: "portal", label: "Bank portal", detail: "anchors · vendors", col: 0, row: 1 },
        { id: "api", label: "SCF API", detail: "OAuth2 · REST", col: 1, row: 1 },
        { id: "invoice", label: "Invoice service", detail: "Spring Boot", col: 2, row: 0 },
        { id: "funding", label: "Funding service", detail: "Spring Boot", col: 2, row: 2 },
        { id: "llm", label: "Claude", detail: "AWS Bedrock", col: 3, row: 0, ai: true },
        { id: "db", label: "PostgreSQL", detail: "+ Redis cache", col: 3, row: 2 },
      ],
      edges: [
        { from: "portal", to: "api" },
        { from: "api", to: "invoice" },
        { from: "api", to: "funding" },
        { from: "invoice", to: "llm" },
        { from: "invoice", to: "db" },
        { from: "funding", to: "db" },
      ],
      caption: "A simplified view: client systems and internal names are left out.",
    },
  },
  {
    id: "disputes",
    title: "Dispute & Chargeback Product",
    org: "techbulls",
    categories: ["fintech", "ai"],
    proof: "Full chargeback lifecycle · LLM-assisted",
    summary: "Manages the full lifecycle of card and payment disputes and chargebacks.",
    description:
      "Card / payment dispute and chargeback lifecycle management on Spring Boot, with Anthropic Claude on AWS Bedrock integrated, and advanced SQL on PostgreSQL behind it.",
    highlights: [
      "Dispute and chargeback lifecycle management for card and payment disputes.",
      "Anthropic Claude / AWS Bedrock LLM integration.",
      "Spring Boot, Spring Data JPA and OAuth2 over PostgreSQL with advanced SQL, on AWS.",
    ],
    skills: [
      "java",
      "spring-boot",
      "spring-data-jpa",
      "spring-security",
      "postgresql",
      "sql",
      "rest-apis",
      "llm-integration",
      "claude",
      "bedrock",
      "aws",
    ],
    architecture: {
      nodes: [
        { id: "ops", label: "Ops console", detail: "dispute teams", col: 0, row: 1 },
        { id: "api", label: "Dispute API", detail: "Spring Boot · OAuth2", col: 1, row: 1 },
        { id: "lifecycle", label: "Lifecycle engine", detail: "chargeback states", col: 2, row: 1 },
        { id: "llm", label: "Claude", detail: "AWS Bedrock", col: 3, row: 0, ai: true },
        { id: "db", label: "PostgreSQL", detail: "advanced SQL", col: 3, row: 2 },
      ],
      edges: [
        { from: "ops", to: "api" },
        { from: "api", to: "lifecycle" },
        { from: "lifecycle", to: "llm" },
        { from: "lifecycle", to: "db" },
      ],
      caption: "A simplified view: client systems and internal names are left out.",
    },
  },
  {
    id: "field-force-crm",
    title: "Field-Force CRM for Bank Field Staff",
    org: "techbulls",
    categories: ["fintech"],
    proof: "Bank field staff · OAuth2 + Redis",
    summary: "Lead, customer and field-visit management for banking field employees.",
    description:
      "A CRM for bank field staff covering leads, customers and field visits, built on Java 8 and Spring Boot with OAuth2, PostgreSQL and Redis on AWS.",
    highlights: [
      "Lead, customer and field-visit management for banking field employees.",
      "Java 8, Spring Boot (Spring MVC, Spring Data JPA) and OAuth2-secured REST APIs.",
      "PostgreSQL with Redis caching, deployed on AWS.",
    ],
    skills: [
      "java",
      "spring-boot",
      "spring-mvc",
      "spring-data-jpa",
      "spring-security",
      "postgresql",
      "redis",
      "rest-apis",
      "aws",
    ],
    architecture: {
      nodes: [
        { id: "app", label: "Field app", detail: "bank staff", col: 0, row: 1 },
        { id: "auth", label: "OAuth2", detail: "Spring Security", col: 1, row: 1 },
        { id: "api", label: "CRM services", detail: "Spring Boot", col: 2, row: 1 },
        { id: "cache", label: "Redis", detail: "cache", col: 3, row: 0 },
        { id: "db", label: "PostgreSQL", detail: "leads · visits", col: 3, row: 2 },
      ],
      edges: [
        { from: "app", to: "auth" },
        { from: "auth", to: "api" },
        { from: "api", to: "cache" },
        { from: "api", to: "db" },
      ],
      caption: "A simplified view: client systems and internal names are left out.",
    },
  },
  {
    id: "publication-suite",
    title: "Publication Suite",
    org: "inbetween",
    categories: ["event-driven", "ai"],
    proof: "−40% async processing latency",
    summary: "Automated multi-format publishing with data ingestion and AI-suggested templates.",
    description:
      "An automated multi-format publication platform: content is ingested through ETL pipelines, flows through Kafka event streams to the publishing services, and users get AI-suggested templates.",
    highlights: [
      "4 Spring Boot and Node.js event-driven microservices on Oracle and PostgreSQL.",
      "Kafka event streams cut async processing latency by ~40%.",
      "ETL / data ingestion and AI-suggested templates (LLM integration) for users.",
      "Docker images shipped through Jenkins CI/CD to AWS.",
    ],
    skills: [
      "java",
      "spring-boot",
      "spring-mvc",
      "nodejs",
      "kafka",
      "event-driven",
      "microservices",
      "oracle",
      "postgresql",
      "etl",
      "llm-integration",
      "docker",
      "ci-cd",
      "aws",
    ],
    architecture: {
      nodes: [
        { id: "sources", label: "Content sources", detail: "data feeds", col: 0, row: 1 },
        { id: "etl", label: "Ingestion", detail: "ETL · Spring Boot", col: 1, row: 1 },
        { id: "db", label: "Oracle · PostgreSQL", detail: "content store", col: 1, row: 2 },
        { id: "kafka", label: "Kafka", detail: "event streams", col: 2, row: 1 },
        { id: "ai", label: "Template AI", detail: "LLM suggestions", col: 2, row: 0, ai: true },
        { id: "render", label: "Publishing", detail: "Node.js · multi-format", col: 3, row: 1 },
      ],
      edges: [
        { from: "sources", to: "etl" },
        { from: "etl", to: "db" },
        { from: "etl", to: "kafka" },
        { from: "kafka", to: "render" },
        { from: "ai", to: "render" },
      ],
      caption: "Moving the slow work onto Kafka event streams is what cut async processing latency by ~40%.",
    },
  },
  {
    id: "betting-portal",
    title: "Transactions & Betting Portal",
    org: "william-hill",
    categories: ["fintech", "event-driven"],
    proof: "99.9% uptime · 500K+ transactions a day",
    summary: "High-throughput transactions, bet placement and settlement: 500K+ transactions a day.",
    description:
      "A high-throughput portal for managing transactions, placing bets and settling them. Synchronous workflows were moved to multithreaded, Kafka event-driven processing on Azure AKS.",
    highlights: [
      "99.9% uptime across 500K+ transactions a day.",
      "Multithreaded Kafka event-driven processing with ~25% faster confirmations.",
      "OAuth2-secured Spring Boot REST APIs with Redis, on Azure (AKS / Kubernetes).",
    ],
    skills: [
      "java",
      "spring-boot",
      "rest-apis",
      "spring-security",
      "kafka",
      "concurrency",
      "event-driven",
      "redis",
      "azure",
      "kubernetes",
      "observability",
    ],
    architecture: {
      nodes: [
        { id: "portal", label: "Web portal", detail: "bets · payments", col: 0, row: 1 },
        { id: "api", label: "REST APIs", detail: "Spring Boot · OAuth2", col: 1, row: 1 },
        { id: "cache", label: "Redis", detail: "hot data", col: 1, row: 0 },
        { id: "kafka", label: "Kafka", detail: "bet & payment events", col: 2, row: 1 },
        { id: "settle", label: "Settlement", detail: "multithreaded workers", col: 3, row: 0 },
        { id: "recon", label: "Reconciliation", detail: "payments", col: 3, row: 2 },
      ],
      edges: [
        { from: "portal", to: "api" },
        { from: "api", to: "cache" },
        { from: "api", to: "kafka" },
        { from: "kafka", to: "settle" },
        { from: "kafka", to: "recon" },
      ],
      caption: "Runs on Azure AKS. A simplified view: internal service names are left out.",
    },
  },
  {
    id: "simrt-alignrt",
    title: "SimRT & AlignRT",
    org: "vision-rt",
    categories: ["healthcare"],
    proof: "~90% unit-test coverage · safety-critical",
    summary: "Backend services and imaging workflows for surface-guided radiation therapy.",
    description:
      "Backend services and imaging workflows for clinical patient-positioning software used in surface-guided radiation therapy, where reliability is not optional.",
    highlights: [
      "Java / Spring Boot services and ETL / data-ingestion pipelines.",
      "C# / .NET Core imaging work.",
      "TDD and CI/CD for safety-critical code, with ~90% unit-test coverage.",
    ],
    skills: ["java", "spring-boot", "etl", "csharp", "tdd", "design-patterns", "ci-cd"],
    architecture: {
      nodes: [
        { id: "imaging", label: "Imaging", detail: "C# · .NET Core", col: 0, row: 1 },
        { id: "etl", label: "Ingestion", detail: "ETL pipelines", col: 1, row: 1 },
        { id: "svc", label: "Clinical services", detail: "Spring Boot", col: 2, row: 1 },
        { id: "flow", label: "Positioning", detail: "SimRT · AlignRT", col: 3, row: 1 },
      ],
      edges: [
        { from: "imaging", to: "etl" },
        { from: "etl", to: "svc" },
        { from: "svc", to: "flow" },
      ],
      caption: "A simplified view of the data path; clinical systems are left out.",
    },
  },
  {
    id: "real-time-chat",
    title: "Real-Time Chat Platform",
    org: "personal",
    categories: ["event-driven", "personal"],
    proof: "4 services · WebSocket + Kafka + Redis",
    summary: "Instant messaging over WebSocket/STOMP, with Kafka fan-out and Redis presence.",
    description:
      "A full-stack chat app split into auth, chat and presence services behind a Spring Cloud Gateway. Messages travel over WebSocket/STOMP, Kafka distributes events between services, and Redis tracks who is online.",
    highlights: [
      "Direct messages and group chats in real time over WebSocket / STOMP.",
      "Presence and typing indicators, read receipts and cursor-paginated history.",
      "JWT auth at the gateway, which also passes WebSocket traffic through.",
      "Whole stack runs with Docker Compose.",
    ],
    decisions: [
      "Kafka carries chat events between services, so the presence service never calls the chat service directly.",
      "JWTs are validated once, at the gateway, which also passes WebSocket traffic straight through to the chat service.",
      "Presence lives in Redis; message history uses cursor-based pagination so long conversations stay fast to scroll.",
    ],
    skills: [
      "java",
      "spring-boot",
      "websocket",
      "kafka",
      "redis",
      "postgresql",
      "spring-security",
      "microservices",
      "event-driven",
      "react",
      "docker",
    ],
    repo: "https://github.com/siddhantdalal/real-time-chat-system",
    architecture: {
      nodes: [
        { id: "web", label: "React client", detail: "SockJS · STOMP", col: 0, row: 1 },
        { id: "gw", label: "API Gateway", detail: "JWT · WS passthrough", col: 1, row: 1 },
        { id: "auth", label: "Auth service", detail: "JWT · BCrypt", col: 2, row: 0 },
        { id: "chat", label: "Chat service", detail: "WebSocket / STOMP", col: 2, row: 1 },
        { id: "presence", label: "Presence service", detail: "online status", col: 2, row: 2 },
        { id: "db", label: "PostgreSQL", detail: "users · messages", col: 3, row: 0 },
        { id: "kafka", label: "Kafka", detail: "chat events", col: 3, row: 1 },
        { id: "redis", label: "Redis", detail: "presence", col: 3, row: 2 },
      ],
      edges: [
        { from: "web", to: "gw" },
        { from: "gw", to: "auth" },
        { from: "gw", to: "chat" },
        { from: "gw", to: "presence" },
        { from: "auth", to: "db" },
        { from: "chat", to: "kafka" },
        { from: "presence", to: "redis" },
      ],
      caption:
        "The presence service consumes chat events from Kafka, so services never call each other directly.",
    },
  },
  {
    id: "loan-platform",
    title: "Loan Application Microservices",
    org: "personal",
    categories: ["fintech", "event-driven", "personal"],
    proof: "Event-driven · a database per service",
    summary: "Users, loans and notifications as separate services, talking through Kafka.",
    description:
      "A loan-application system with user, loan and notification services behind a JWT-validating Spring Cloud Gateway. Services publish events to Kafka instead of calling each other, with Redis caching and a PostgreSQL database per service.",
    highlights: [
      "User and loan services publish to Kafka; the notification service consumes.",
      "Redis distributed caching and a PostgreSQL database per service.",
      "Spring Security + JWT at the gateway; React UI served by Nginx.",
      "Whole stack runs with Docker Compose.",
    ],
    decisions: [
      "User and loan services publish events and the notification service consumes them, keeping notifications out of the loan workflow.",
      "A PostgreSQL database per service, with Redis as a distributed cache.",
      "Spring Cloud Gateway validates JWTs and routes requests to the right service.",
    ],
    skills: [
      "java",
      "spring-boot",
      "spring-security",
      "microservices",
      "kafka",
      "event-driven",
      "redis",
      "postgresql",
      "react",
      "typescript",
      "docker",
    ],
    repo: "https://github.com/siddhantdalal/loan-platform-services",
    architecture: {
      nodes: [
        { id: "web", label: "React UI", detail: "via Nginx", col: 0, row: 1 },
        { id: "gw", label: "API Gateway", detail: "JWT · routing", col: 1, row: 1 },
        { id: "user", label: "User service", detail: "Spring Boot", col: 2, row: 0 },
        { id: "loan", label: "Loan service", detail: "Spring Boot", col: 2, row: 1 },
        { id: "notify", label: "Notifications", detail: "Spring Boot", col: 2, row: 2 },
        { id: "db", label: "PostgreSQL", detail: "per service + Redis", col: 3, row: 0 },
        { id: "kafka", label: "Kafka", detail: "loan events", col: 3, row: 1 },
      ],
      edges: [
        { from: "web", to: "gw" },
        { from: "gw", to: "user" },
        { from: "gw", to: "loan" },
        { from: "gw", to: "notify" },
        { from: "user", to: "db" },
        { from: "loan", to: "kafka" },
        { from: "kafka", to: "notify" },
      ],
      caption: "Event-driven by design: the notification service only ever hears about loans through Kafka.",
    },
  },
] as const satisfies readonly Project[];

export type ProjectId = (typeof projects)[number]["id"];
