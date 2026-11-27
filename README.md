# Dr. Ambedkar Institute of Technology — Website

Redesigned website for Dr. Ambedkar Institute of Technology (Dr. AIT), Bengaluru, including the
Student Welfare Office (SWO) page.

**Stack:** React 19 · Vite · Tailwind CSS 3 · GSAP (ScrollTrigger) · Lenis smooth scroll · React Router · lucide-react

```bash
npm install
npm run dev      # local development
npm run build    # production build to dist/
npm run lint     # oxlint
```

## Structure

```
src/
  data/site.js           Verified institutional content (single source of truth)
  data/searchIndex.js    Index + ranking for global search and the assistant
  components/layout/     Navbar (dropdowns, mobile drawer), Footer
  components/home/       Homepage sections (Hero, About, Academics, Departments, Placements,
                         NewsNotices, Research, EventsCalendar, CampusLife, Gallery, Alumni, Contact)
  components/swo/        Student Welfare Office sections
  components/features/   SearchDialog (⌘K or /), Assistant (campus chat)
  components/ui/         Reusable Section, SectionHeading, Button, SmartLink
  pages/                 HomePage, StudentWelfarePage (lazy-loaded)
  assets/                Real Dr. AIT photographs (WebP) from drait.edu.in
```

## Content policy

All facts, figures, names and photographs come from the official website, https://drait.edu.in.
Each block in `src/data/site.js` notes the page it came from. Please don't add statistics or
institutional details unless they come from an official source. To update notices or events, edit
`NOTICES` / `EVENTS`. Status badges such as "Upcoming", "In 5 days" and "Concluded" are calculated
from today's date.

## Campus assistant

The assistant answers only from the verified content in `src/data`. To connect an AI backend, set
`VITE_ASSISTANT_ENDPOINT` to a URL that accepts `POST { question, history }` and returns
`{ reply, links? }`. Keep the model and API key on that server, never in the frontend. If the
endpoint fails, the assistant falls back to the local, grounded answers.

## Routing / hosting

The site uses client-side routes (`/` and `/student-welfare`). The static host must serve
`index.html` for unknown paths (SPA fallback).
