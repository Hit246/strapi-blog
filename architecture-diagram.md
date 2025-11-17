# Architecture Diagram

```mermaid
flowchart LR
    subgraph CMS["Strapi CMS (backend/)"]
        A[Content Types\nBlog Post / Category / Tag]
        B[Bootstrap\nSeed data + permissions]
        A -->|REST API| C
        B -->|SQLite| D[(SQLite DB)]
    end

    subgraph Frontend["Next.js Frontend (frontend/)"]
        E[Data Layer\nsrc/lib/strapi.ts]
        F[UI Components\nHero, Cards, Filters]
        G[Pages\nHome & Post Detail]
        E --> F --> G
    end

    Admin[Strapi Admin UI] -->|CRUD content| A
    Visitor[Browser] -->|HTTP| G

    C[( /api endpoints )] --> E
    G -->|Image URLs| H[(Uploads CDN/Local)]
```

**Legend**

- Blue group (left): Strapi handles all CMS logic, authentication, and media.
- Purple group (right): Next.js fetches content server-side, renders React components, and delivers the blog experience.
- Double circles represent persisted storage (SQLite DB for content, upload directory or CDN for media).

