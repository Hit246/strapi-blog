# Launchpad Journal

Launchpad Journal is a Strapi-powered blogging platform built for the Round 3 challenge (Option A – Blogging Website). It pairs a headless CMS with a Next.js 16 frontend so founders can publish announcements, categorize stories, and showcase progress in a polished UI.

## Highlights

- **Strapi CMS** with collection types for blog posts, categories, and tags, complete with lifecycle hooks for auto read-time calculation.
- **Seeded demo content** and role bootstrapping so the API works immediately after the first `npm run develop`.
- **Next.js 16 + Tailwind** frontend with featured stories, category/tag filters, responsive cards, and dynamic detail pages.
- **API-first** architecture: the frontend consumes Strapi’s REST endpoints via a typed data layer with graceful fallbacks.
- **Documentation deliverables**: architecture diagram, run instructions, and a clear checklist for recording the required demo video.

## Tech Stack

| Layer    | Tech                                                                 |
|----------|----------------------------------------------------------------------|
| Backend  | Strapi 5 (TypeScript), SQLite (Quickstart)                           |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 3, Suspense-ready UI |
| Tooling  | ESLint, TypeScript, qs for query building                            |

## Repository Structure

```
backend/   # Strapi CMS (content types, bootstrap seeding, permissions)
frontend/  # Next.js client (pages, components, Tailwind theme)
docs/
  architecture-diagram.md  # Mermaid diagram of data flow
README.md  # You are here
```

## Getting Started

### 0. Prerequisites

- Node.js 20+ (Strapi v5 requires Node 18+)
- npm 9+
- Optional: SQLite client for inspecting `backend/.tmp/data.db`

### 1. Configure Environment Variables

Strapi already generated `backend/.env` during scaffolding. Update the secrets if desired (keys, salts, admin email).  
For the frontend, create `frontend/.env.local`:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### 2. Install Dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Run the Stack Locally

#### Strapi CMS

```bash
cd backend
npm run develop
```

This boots Strapi at `http://localhost:1337`. The bootstrap script will:

- Ensure content types (Blog Post, Category, Tag) exist
- Seed three example categories/tags/posts
- Grant the **Public** role read access for blog endpoints

Visit `http://localhost:1337/admin` to create your admin user, upload images, or add new posts.

#### Next.js Frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

Browse `http://localhost:3000` to see the blog with featured stories, filters, and detail pages sourced from Strapi.

### 4. Production Builds

```bash
# Backend admin build (already executed once)
cd backend && npm run build

# Frontend static build
cd frontend && npm run build
```

The frontend build is resilient when Strapi is offline (it renders empty states during prerender) but you should keep Strapi running for real deployments.

## API Overview

All endpoints live under `http://localhost:1337/api`.

| Endpoint                    | Method | Description                          |
|-----------------------------|--------|--------------------------------------|
| `/blog-posts?populate=...`  | GET    | Public list of posts with relations  |
| `/blog-posts/:id`           | GET    | Single post (slug used on frontend)  |
| `/categories`               | GET    | Categories used for filtering        |
| `/tags`                     | GET    | Tag directory                        |

Authenticated users (via admin panel) get create/update/delete from Strapi UI, so no custom endpoints were necessary.

## Architecture Diagram

See `docs/architecture-diagram.md`. It illustrates:

1. Authors managing content inside Strapi’s admin panel.
2. Strapi exposing REST APIs + uploaded media.
3. Next.js fetching content server-side (App Router) and rendering React components.
4. Visitors interacting with filters and reading posts, with API responses cached per request (30s revalidate).

## Required Deliverables Checklist

- [x] **GitHub Repo** – push this workspace to a public repository.
- [x] **Working Demo** – `npm run develop` (backend) + `npm run dev` (frontend) on localhost.
- [ ] **Short Video (2–4 min)** – record a tour: Strapi admin CRUD, filters on the frontend, highlight architecture diagram.
- [x] **Architecture Diagram** – `docs/architecture-diagram.md`.
- [x] **Running Instructions** – this README.

## Testing & Verification

| Command                        | Purpose                         |
|--------------------------------|---------------------------------|
| `cd backend && npm run build`  | Validates Strapi schema/TS      |
| `cd frontend && npm run lint`  | Lints React/TypeScript code     |
| `cd frontend && npm run build` | Ensures the Next.js app compiles|

## Next Steps / Enhancements

- Add pagination + search endpoints in Strapi and surface them on the frontend.
- Swap SQLite for PostgreSQL when deploying (update `config/database.ts`).
- Add auth-protected preview mode so authors can view drafts from Next.js.
- Deploy: e.g., Render (Strapi) + Vercel (Next.js) and link via `NEXT_PUBLIC_STRAPI_URL`.

## Video & Demo Guidance

When recording the submission video:

1. Start with the architecture diagram.
2. Show Strapi admin: create/edit a post, upload an image, demonstrate categories/tags.
3. Refresh the frontend to show the new content, highlight filters & detail page.
4. Mention how reviewers can run `npm run develop` + `npm run dev`.

Good luck with the evaluation!

