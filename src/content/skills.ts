// Languages first: Java and React are what recruiters look for before anything else.
export const skillGroups = [
  { id: "languages", label: "Languages & frameworks" },
  { id: "backend", label: "Core backend" },
  { id: "data", label: "Messaging & data" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI & agentic development" },
] as const;

export type SkillGroupId = (typeof skillGroups)[number]["id"];

type SkillDefinition = { id: string; label: string; group: SkillGroupId };

/**
 * Every skill shown on the site. Roles and projects reference these ids, so a typo in
 * `experience.ts` or `projects.ts` fails the type check instead of silently breaking a link.
 */
export const skills = [
  { id: "spring-boot", label: "Spring Boot", group: "backend" },
  { id: "spring-mvc", label: "Spring MVC", group: "backend" },
  { id: "spring-data-jpa", label: "Spring Data JPA / Hibernate", group: "backend" },
  { id: "spring-security", label: "Spring Security, OAuth2 & JWT", group: "backend" },
  { id: "rest-apis", label: "RESTful APIs", group: "backend" },
  { id: "microservices", label: "Microservices", group: "backend" },
  { id: "event-driven", label: "Distributed & event-driven systems", group: "backend" },
  { id: "concurrency", label: "Concurrency & multithreading", group: "backend" },
  { id: "system-design", label: "System design", group: "backend" },
  { id: "performance", label: "Performance tuning", group: "backend" },
  { id: "design-patterns", label: "Design patterns", group: "backend" },
  { id: "tdd", label: "TDD & unit testing", group: "backend" },

  { id: "kafka", label: "Apache Kafka", group: "data" },
  { id: "jms", label: "JMS", group: "data" },
  { id: "websocket", label: "WebSocket / STOMP", group: "data" },
  { id: "redis", label: "Redis", group: "data" },
  { id: "sql", label: "Advanced SQL", group: "data" },
  { id: "postgresql", label: "PostgreSQL", group: "data" },
  { id: "oracle", label: "Oracle", group: "data" },
  { id: "mysql", label: "MySQL", group: "data" },
  { id: "mongodb", label: "MongoDB", group: "data" },
  { id: "etl", label: "ETL & data ingestion", group: "data" },

  { id: "llm-integration", label: "LLM integration", group: "ai" },
  { id: "claude", label: "Anthropic Claude", group: "ai" },
  { id: "bedrock", label: "AWS Bedrock", group: "ai" },
  { id: "openai", label: "OpenAI", group: "ai" },
  { id: "gemini", label: "Google Gemini", group: "ai" },
  { id: "multi-llm", label: "Multi-LLM orchestration", group: "ai" },
  { id: "tool-calling", label: "Tool / function calling", group: "ai" },
  { id: "prompt-engineering", label: "Prompt engineering", group: "ai" },
  { id: "evals", label: "Eval-driven iteration", group: "ai" },
  { id: "ai-assisted-dev", label: "GitHub Copilot / Cursor", group: "ai" },

  { id: "aws", label: "AWS (EC2, ECS, S3, IAM)", group: "cloud" },
  { id: "azure", label: "Azure (AKS)", group: "cloud" },
  { id: "docker", label: "Docker", group: "cloud" },
  { id: "kubernetes", label: "Kubernetes", group: "cloud" },
  { id: "ci-cd", label: "CI/CD (Jenkins, GitLab, GitHub Actions)", group: "cloud" },
  { id: "observability", label: "Observability & monitoring", group: "cloud" },
  { id: "linux", label: "Linux", group: "cloud" },
  { id: "git", label: "Git", group: "cloud" },
  { id: "agile", label: "Agile / Scrum", group: "cloud" },

  { id: "java", label: "Java 8–21", group: "languages" },
  { id: "python", label: "Python", group: "languages" },
  { id: "typescript", label: "TypeScript", group: "languages" },
  { id: "javascript", label: "JavaScript (ES6)", group: "languages" },
  { id: "scala", label: "Scala", group: "languages" },
  { id: "bash", label: "Bash / Shell", group: "languages" },
  { id: "csharp", label: "C# / .NET Core", group: "languages" },
  { id: "react", label: "React", group: "languages" },
  { id: "angular", label: "Angular", group: "languages" },
  { id: "nodejs", label: "Node.js", group: "languages" },
  { id: "fastapi", label: "FastAPI", group: "languages" },
] as const satisfies readonly SkillDefinition[];

export type Skill = (typeof skills)[number];
export type SkillId = Skill["id"];

const byId = new Map<string, Skill>(skills.map((skill) => [skill.id, skill]));

export function getSkill(id: SkillId): Skill {
  return byId.get(id)!;
}
