```
 ██████╗ ██████╗  ██████╗ ███████╗████████╗
██╔═══██╗██╔══██╗██╔════╝ ██╔════╝╚══██╔══╝
██║   ██║██████╔╝██║  ███╗███████╗   ██║
██║   ██║██╔══██╗██║   ██║╚════██║   ██║
╚██████╔╝██║  ██║╚██████╔╝███████║   ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝
```

# Codex Nexus — Orgst Community Platform

Open-source platform for the [Orgst](https://weorgst.com) developer community. Terminal-first interface built on Next.js, TypeScript strict mode, and Feature Sliced Design.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org)

---

## About

Orgst is a volunteer-driven tech community structured as a real software workplace, not a course, not a bootcamp. Members contribute to open-source projects inside an async engineering workflow: sprints, PRs, code review, Kanban, and weekly syncs per discipline (Frontend, Backend, QA, Product).

Mentors operate as tech leads: they review code, pair, and guide architectural decisions. They do not lecture. The work members ship here is verifiable work experience.

Every merged PR, code review, and shipped feature is permanently recorded in a public git history, a verifiable contribution record that belongs to the member, not the platform.

---

## Platform

Codex Nexus is the community's digital home > an open-source platform designed, built, and maintained by its own members.

### Why a terminal

Every interaction in the UI uses real Linux/Unix/Git vocabulary. The design decision is intentional: members absorb technical concepts through daily use before writing a single line of code.

| UI element            | Underlying concept        |
| --------------------- | ------------------------- |
| `git init --identity` | Repository initialization |
| `set-env USER_ID`     | Environment variables     |
| `chmod 755 --role`    | Unix permissions          |
| `cat README.md`       | File output via terminal  |
| `man <username>`      | Linux manual pages        |
| `ln -s /github ~/`    | Symbolic links            |
| `ps aux --community`  | Process listing           |
| `PID 001`             | Process ID                |
| `uptime: 142d`        | System uptime             |
| `grep` in search      | Text filtering            |
| `fork --this-repo`    | Repository forking        |

### Modules

- **Community Terminal** — command-driven shell as the primary navigation layer
- **Member Card** — profile with PID, roles, bio, stack, contribution graph and social links
- **Member Directory** — community feed w/ role filters and search
- **Invite System** — token-based onboarding controlled by admins
- **Documentation** — Markdown rendered in the content panel _(in progress)_
- **Projects & Tasks** — Kanban boards per project _(in progress)_

---

## Stack

### Frontend

| Package                     | Version | Role                                      |
| --------------------------- | ------- | ----------------------------------------- |
| **Next.js**                 | 14.2+   | React framework — SSR, RSC, App Router    |
| **TypeScript**              | 5.3+    | Static typing — strict mode               |
| **Styled Components**       | 6.1+    | CSS-in-JS — terminal theme                |
| **TanStack Query**          | 5.75+   | Server state and cache                    |
| **Zustand**                 | 4.4+    | Client state — session, terminal          |
| **React Hook Form**         | 7.49+   | Form state management                     |
| **Zod**                     | 3.22+   | Schema validation and type inference      |
| **openapi-fetch**           | 0.14+   | Type-safe HTTP client from OpenAPI schema |
| **i18next + react-i18next** | 25 / 15 | i18n                                      |
| **Jest + Testing Library**  | 29 / 14 | Unit testing                              |

### Backend _(separate repository)_

| Package                        | Role                       |
| ------------------------------ | -------------------------- |
| **Python 3.12 + Django Ninja** | REST API + OpenAPI/Swagger |
| **PostgreSQL**                 | Database                   |

## Project structure

[Feature Sliced Design](https://feature-sliced.design/)

---

## Setup

Requires **Node.js 22+**

```bash
git clone git@github.com:orgst-br/codex-nexus-frontend.git
cd codex-nexus-frontend
npm install
npm run dev
```

---

## Contributing

```bash
...... TODO

# open PR to main: objective, changes, how to test
```

### Commit convention

[Conventional Commits](https://www.conventionalcommits.org), enforced by commitlint on `commit-msg`:

```
feature(community-terminal): add ping command
fix(member-card): resolve bio overflow on mobile
refactor(auth-login): simplify useLogin hook
docs: update setup instructions
chore: upgrade jest dependencies
```

Allowed types: `feature` `fix` `chore` `docs` `refactor` `test` `build` `ci` `style`

Issues tagged **`good first issue`** are scoped for first-time contributors.

---

## Code quality

Enforced automatically via Husky pre-commit hooks.

| Tool           | Config                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------ |
| **TypeScript** | `strict` · `noUncheckedIndexedAccess` · `exactOptionalPropertyTypes` · `noImplicitReturns` |
| **ESLint**     | typescript-eslint · react-hooks · simple-import-sort · import                              |
| **Prettier**   | 100 chars · no semi · single quotes · trailing commas · LF                                 |
| **Husky**      | `pre-commit`: lint + format · `commit-msg`: commitlint                                     |

Minimum coverage thresholds (`jest.config.cjs`)

## Membership

**Mentees** > early-career or career-transition developers. No prior experience required. Contributions serve as verifiable work experience and portfolio.

**Mentors** > tech professionals acting as project tech leads: code review, pairing, architectural decisions, team guidance within the agile workflow. \*Seniority not required: commitment is.

Admission by invite at [weorgst.com](https://weorgst.com).

---

## Maintainers

| PID | Name            | Role                |
| --- | --------------- | ------------------- |
| 001 | Saphira Cardoso | Co-founder · Mentor |
| 002 | Tiago Monteiro  | Co-founder · Mentor |

---

## License

MIT — see [LICENSE](LICENSE)
