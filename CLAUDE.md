# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server (Vite, hot reload)
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
npm run deploy    # Build and deploy to GitHub Pages (gh-pages -d dist)
```

No test suite is configured.

## Architecture

This is a single-page React dashboard for the ALX Creative Economy team. The entire application lives in **`src/App.jsx`** — there are no routes, no state management library, and no separate component files.

**Data model:** All metrics (KPIs, weekly stats, funnel data, cohort tables) are defined as plain JS arrays/objects at the top of `App.jsx`. The data is **hardcoded** — sourced manually from CSVs and updated in-place. There is no API or backend.

**Key data structures in `App.jsx`:**
- `kpiData2025` / `kpiData2026` — top-level KPI cards with values, targets, and progress percentages
- `weeklyMetricsData` — weekly OKR/metric tracker with target, current, WoW progress, and comments
- `funnelData` — enrollment-to-payment funnel by program (AI for Creatives, Content Creation, Graphic Design, Music & Audio)
- `cohortGroups` — cohort performance data grouped by Professional Foundations + Creative Tech Lite Specialization pairs, with activated/graduated counts per program

**Inline components (all in `App.jsx`):**
- `Card` — base card wrapper with hover shadow
- `CohortSection` — renders a cohort table + three donut charts (activated, graduated, graduation rate) side-by-side
- `PROGRAM_COLORS` — canonical color map keyed by program name, used in charts and table dots

**Charting:** Uses **Recharts** (`ComposedChart`, `Bar`, `Line`, `PieChart`). Charts are wrapped in `ResponsiveContainer`.

**Styling:** Tailwind CSS (v3) utility classes throughout. No custom CSS beyond `src/index.css` (Tailwind directives) and `src/App.css` (minimal overrides).

**Deployment:** GitHub Pages via `gh-pages`. The Vite base path is `/creative-dashboard` (matches the `homepage` in `package.json`). Build output goes to `dist/`.

## Updating data

When metrics change, edit the relevant data array at the top of `App.jsx`. For cohort data, match the existing shape: each entry needs `program`, `activated`, `graduated`, `rate` (string with `%`), and `dates`. A `graduated` value of `"Pending Graduation"` and `rate` of `"N/A"` are handled gracefully in the UI.
