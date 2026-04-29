# Foundation

Angular + Sanity template. Reusable across projects — all credentials live in one place.

## Setup

1. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_STUDIO_APP_ID=your_studio_app_id
SANITY_STUDIO_TITLE=your_studio_title
SANITY_API_VERSION=2026-04-29
```

2. Install dependencies:

```bash
npm install
cd studio && npm install && cd ..
```

## Development

Start the Angular dev server (generates `src/environments/environment.ts` from `.env` automatically):

```bash
npm start
```

Start Sanity Studio:

```bash
cd studio && npm run dev
```

## Build

```bash
npm run build
```

## How configuration works

All project-specific values are stored in `.env` at the root. This file is never committed.

| Variable | Used by |
|---|---|
| `SANITY_PROJECT_ID` | Angular app, Sanity Studio, Sanity CLI |
| `SANITY_DATASET` | Angular app, Sanity Studio, Sanity CLI |
| `SANITY_STUDIO_APP_ID` | Sanity CLI (deploy) |
| `SANITY_STUDIO_TITLE` | Sanity Studio UI |
| `SANITY_API_VERSION` | Angular app |

**Angular** reads env vars via `scripts/set-env.ts`, which generates `src/environments/environment.ts` before each build/serve (`prestart`, `prebuild` hooks in `package.json`). The generated file is gitignored.

**Sanity Studio** (`studio/`) reads env vars via `dotenv-cli`, which loads `../.env` before every `sanity` command.

## Reusing for a new project

1. Clone / fork this repo
2. Create a new `.env` with your new project's credentials
3. If reusing the same Sanity project, change `SANITY_DATASET` to a new dataset name
4. Update `SANITY_STUDIO_APP_ID` after running `cd studio && npm run deploy` for the first time (Sanity will assign a new ID)

## Deploy Sanity Studio

```bash
cd studio && npm run deploy
```
