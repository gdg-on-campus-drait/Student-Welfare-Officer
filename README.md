# Student Welfare Office — Dr. AIT

Website of the Student Welfare Office (SWO), Dr. Ambedkar Institute of Technology, Bengaluru: clubs,
fests, events, the core team, achievements and the gallery.

**Stack:** React 19 · Vite · Tailwind CSS 3 · React Router · GSAP (ScrollTrigger) · Lenis · lucide-react

```bash
npm install
npm run dev      # local development
npm run build    # production build to dist/
npm run lint     # oxlint
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — campus hero, SWO introduction and highlights |
| `/about` | Vision, mission, objectives, initiatives, Student Council |
| `/clubs`, `/clubs/:slug` | Club directory and club profiles |
| `/fests`, `/fests/:slug` | Cultural fests, technical fests, annual celebrations |
| `/events` | Upcoming (with registration) and past events |
| `/team` | SWO officials, leadership, club coordinators, Student Council |
| `/achievements` | Awards, competitions and success stories |
| `/gallery` | Photo albums and videos |
| `/contact` | Contact details, helpdesk, social links |

## Editing content

All content is plain data in **`src/content/`**: clubs, fests, events, team, achievements, gallery and
SWO details. Pages are built from it automatically. **See [`src/content/README.md`](src/content/README.md)**
for the fields and common tasks. Photos go in `src/assets/photos/`.

Content is taken only from official sources: https://drait.edu.in (SWO page, event reports, gallery and
announcements) and the SWO roles & responsibilities document. Please keep it that way, and record the
source of every addition.

## Structure

```
src/
  content/        Editable data + helpers (the single source of truth)
  pages/          One component per route (lazy-loaded except Home)
  components/
    cards/        ClubCard, FestCard, EventCard, AchievementCard, PersonCard
    ui/           Section, PageHeader, Button, Photo, FilterChips, Lightbox, EmptyState, …
    layout/       Navbar, Footer
    features/     SearchDialog (⌘K or /)
  assets/photos/  Real Dr. AIT photographs (WebP)
```

## Hosting

The site uses client-side routes, so the static host must serve `index.html` for unknown paths
(SPA fallback).
