# Codex Nexus — Orgst Community Platform

Plataforma open-source **weorgst.com**: perfis de membros, acervo de documentação e gestão de projetos.

---

## Visão do Produto

O Orgst nasce para ser a "casa" da comunidade:

- **Crachá** — cards de membros com avatar, nome, role/tags, bio, GitHub e LinkedIn
- **Directory de membros** — perfis ricos com skills, tecnologias e afinidades
- **Convites** — links/token controlados pelos admins
- **Docs** — documentação em Markdown com versionamento
- **Projetos e tarefas** — Kanban com colunas configuráveis por projeto

---

## Stack

### Frontend

| Tecnologia                 | Função                     |
| -------------------------- | -------------------------- |
| **Next.js 14+**            | Framework React (SSR/SSG)  |
| **TypeScript**             | Tipagem estática           |
| **Styled Components**      | CSS-in-JS                  |
| **React Query (TanStack)** | Cache e estado do servidor |
| **Zustand**                | Estado global leve         |
| **React Hook Form + Zod**  | Formulários e validação    |
| **Jest + Testing Library** | Testes unitários           |
| **ESLint + Prettier**      | Qualidade de código        |

### Backend

| Tecnologia                | Função                     |
| ------------------------- | -------------------------- |
| **Python 3.12**           | Linguagem                  |
| **Django + Django Ninja** | API REST + OpenAPI/Swagger |
| **PostgreSQL**            | Banco de dados             |

### Deploy

| Serviço    | Função                |
| ---------- | --------------------- |
| **Vercel** | Frontend              |
| **Docker** | Backend + banco local |

---

## Arquitetura Frontend — Feature Sliced Design (FSD)

Organizamos o código em **camadas** para manter tudo modular e escalável:

```
src/
├── app/            → Configuração global (providers, layout, rotas)
├── pages/          → Páginas da aplicação
├── widgets/        → Blocos compostos de UI (ex: MemberCardGrid)
├── features/       → Funcionalidades do usuário (ex: criar perfil)
├── entities/       → Entidades de negócio (ex: Member, Project)
├── shared/         → Componentes, hooks, utils, config reutilizáveis
│   ├── ui/         → Componentes base (Button, Input, Card)
│   ├── lib/        → Helpers e utilitários
│   ├── api/        → Cliente HTTP e configuração
│   └── config/     → Constantes e variáveis de ambiente
```

> Regra de ouro do FSD: camadas superiores podem importar das inferiores, nunca o contrário.

---

## Design System — Terminal Style

## O visual do projeto simula um **terminal de linha de comando**

## Estrutura do Monorepo

```
codex-nexus/
```

---

## Setup Rápido

### Pré-requisitos

- **Node.js 22+**

### Frontend

```bash
git clone git@github.com:orgst/codex-nexus.git
cd codex-nexus/frontend
npm install
npm run dev
```

**Acessos:**

- Frontend: http://localhost:3000
- Swagger API: http://127.0.0.1:8000/api/v1/docs
- Admin Django: http://127.0.0.1:8000/admin

---

## Convenções

### Git

- **Branches:** `feature/nome`, `fix/nome`, `chore/nome`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`)
- **PRs:** descrição com objetivo, mudanças e como testar
- **Hooks:** Husky + commitlint validam automaticamente

### Código

- ESLint + Prettier rodam no pre-commit
- TypeScript strict mode
- Cobertura de testes mínima: 75% branches, 80% functions, 85% lines
- Imports organizados automaticamente (eslint-plugin-simple-import-sort)

---

## Apps Django (planejados)

| App              | Responsabilidade                          |
| ---------------- | ----------------------------------------- |
| `apps.accounts`  | User, Profile, Roles, Invites             |
| `apps.community` | Skills, directory, filtros                |
| `apps.docs`      | Document + versionamento (body_md) + tags |
| `apps.projects`  | Projects, membership                      |
| `apps.boards`    | Boards/Columns (Kanban configurável)      |
| `apps.tasks`     | Tasks/Comments (ligadas ao Kanban)        |

---

## Como Contribuir

1. Crie uma branch a partir de `develop`: `git checkout -b feature/minha-feature`
2. Desenvolva seguindo as convenções acima
3. Rode `npm run lint && npm test` antes do commit
4. Abra um PR para `develop` com descrição clara

Issues com a tag **`good first issue`** são ótimos pontos de entrada para novos voluntários.

---

---

## Licença

MIT — veja [LICENSE](LICENSE)
