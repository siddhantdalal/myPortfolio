# Siddhant Dalal: portfolio

Personal portfolio at **https://siddhantdalal.github.io/myPortfolio/**: experience, projects with live architecture
diagrams, skills traced to where they were used, and one-tap email / call / WhatsApp.

Built with Next.js (static export), TypeScript, Tailwind CSS and Motion. Hosted on GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` (writes the static site to `out/`).

## Editing content

Everything on the page comes from typed files in `src/content/`, so updating the site rarely means touching
components:

| File            | What it holds                                                     |
| --------------- | ----------------------------------------------------------------- |
| `profile.ts`    | Name, about text, headline metrics, education, links, contact     |
| `experience.ts` | Roles, newest first, with highlights, metrics and skills used     |
| `projects.ts`   | Projects, their categories and the architecture diagram for each  |
| `skills.ts`     | Every skill and its group; roles and projects reference these ids |

Skill ids are typed, so a typo in a role or project fails the type check instead of silently breaking the
Skills section.

Company logos in `public/logos/` are single-colour silhouettes used as CSS masks, which lets them take the
theme's muted colour and switch to the brand colour on hover.

## Deploying

Every push to `main` runs lint, type check, tests and the build, then publishes `out/` to GitHub Pages
(`.github/workflows/deploy.yml`). In the repository settings, **Pages → Source** must be set to
**GitHub Actions**.
