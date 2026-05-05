# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Numoo App (`artifacts/numoo`)

Kuwaiti Arabic-first React+Vite web platform for autism family support.

### Full Fusha + Bilingual EN pass (2026-05)
- **All pages now bilingual (AR Fusha + EN)** via `useLangStore` + TXT object pattern. Coverage added to: index (splash/home), chatbot, onboarding, visit-prep, printables (+detail), for-mom, judges, gov-support, restore, results-30-day-plan, results-doctor-questions, results-family-talk, about, not-found, report-translator, visual-schedule, aac, centers (+ governorate query), age (Lucide swap). privacy + loading + assessment-centers were already bilingual via i18n.ts. Each page reads `{lang}` and renders ar/en strings via TXT lookup or inline ternary, with lang-aware text alignment where alignment was hardcoded.
- **Kuwaiti dialect → MSA Fusha** across UI chrome, components (cloud-backup-card, results-backup-nudge, results-family-talk), data files (data.ts, result-resources.ts, gov-resources.ts, i18n.ts), and pages (library, sources, results, restore). Removed all KW pronouns (ج suffix, "تبين", "تقدرين", "ها العملية", "بزعل", emojis like 🌱⚠️📍🔎🌸💡).
- **Sed-corruption fix**: bulk-fixed `اكتريدين`→`اكتبي` (broken by earlier `s/تبي/تريدين/g` matching inside `اكتبي`), plus `الأولادة`→`الولادة`, `قدرنا نقدّم`→`استطعنا تقديم`, `مو يجب`→`لا حاجة لأن`.

### Judge-ready polish pass (2026-05)
- **Removed all "coming soon" pages** (workshops, community, ai-suite, progress, ramadan) — files, routes, tiles, footer links, and i18n keys all cleaned. Tiles replaced with: Sources, About, Visit-Prep on home.
- **M-CHAT-R toddler expanded 10 → 20 items** (added items 6/8/9/10/14/15/17/19 + CDC milestones in `src/lib/data.ts`). Matching `RW` weights added.
- **Risk meter dynamic max**: `results.tsx` now derives the gauge max from `QDB[ageGroup]` + `RW` instead of hardcoded 30 (was misleading after expansion to 20 items).
- **Onboarding flow** (`/onboarding`): 3-step (name → age band → top 3 concerns). Persists `childProfile` in zustand. Home greets by child name + offers CTA when no profile.
- **Visit-Prep** (`/results/visit-prep`): printable A4 one-pager auto-filled from screening + child profile. `window.print()` button. Linked from results toolkit.
- **Credibility**: `/sources` rewritten with 10 real refs (M-CHAT-R, CDC, Mayo, Hopkins, Yale, WHO, AAP, DSM-5, PADA, MOH). `/about` adds Methodology + Team + Medical-Disclaimer cards. `/doctors` adds expandable transparency card ("كيف جُمِعت هذه القائمة"). Footer adds Kuwait emergency lines (112 / 147 / 1861111). `/library` shows EN-only badge when lang=en.

### Recent additions (2026-05)
- **ICS calendar export**: 30-day plan page has "أضيفي للتقويم" button generating .ics with daily 9 AM reminders.
- **PWA**: `public/manifest.webmanifest` + `public/sw.js` for installability and offline cache. Skipped in `BUILD_STANDALONE=1`.
- **Large text mode**: Three sizes (normal/large/xlarge) controlled from `/about`, persisted in zustand store, applies via `html.text-large`/`text-xlarge` classes (CSS in `src/index.css`).
- **Article bookmarks**: `src/lib/bookmarks.ts` (zustand persist). Star button on each library card and inside article header. "مفضلتي" filter chip at top of `/library`.
- **Assessment history & comparison**: `useAssessmentStore.history` (capped 24). `/progress` page shows latest comparison card, trend bars, and full history list with delta indicators.
- **Government support guide**: `/gov-support` page with 8 Kuwait resources (PIFSS disability card, MOH clinics, Afia, KASDP, CCSD, MOE special ed, Bait al-Zakat, Diwan Amiri). Filterable by type. Linked from `/results`.
- **Doctors directory**: `/doctors` page with 59 specialists across 7 specialties (dermatology, gastro, dental, eye, ENT, neurology, psychiatry) — community-shared from Kuwaiti mothers' experiences. Data in `src/lib/doctors.ts`. Linked from splash + results.
- **Official assessment centers**: `/assessment-centers` page with 7 government-approved evaluation entities (PADA Tests Unit, MOE Psych Services, MOH Mental Health Center, MOH Developmental Medicine, MOH Genetics Center, MOH Government Hospitals, Sabah Hospital Developmental Unit). Data in `src/lib/assessment-centers.ts`. Each shows tap-to-call phone + "officially recognized" badge. Linked from splash + results.
- **Cloud backup & recovery code**: 8-character recovery codes (e.g. `D4FV-YXTB`) let mothers restore their full local state on a new device. Schema: `lib/db/src/schema/numooBackups.ts` (`numoo_backups` table, jsonb data column). API: `POST /api/backup` and `GET /api/backup/:code` in `artifacts/api-server/src/routes/backup.ts`, contract in `lib/api-spec/openapi.yaml`. Client: `artifacts/numoo/src/lib/cloud-backup.ts` snapshots all four persisted localStorage keys (assessment, bookmarks, favorites, lang). UI: `CloudBackupCard` on `/about` and dedicated `/restore` page with a confirmation step. In standalone (file://) mode the card and page show a friendly "online required" notice instead.
- **AI Suite — Live tools (powered by OpenAI)**:
  - **Medical Report Translator** (`/report-translator` + `POST /api/translate-report`): Mothers photograph any medical report (Arabic or English). GPT-5.4 Vision returns plain-Arabic summary, diagnoses, medications with purpose, key terms with explanations, 5 doctor questions, and warnings. Multer in-memory upload (10 MB max, MIME allowlist, dedicated error handler). Server-only client lives in `lib/integrations-openai-ai-server`.
  - **Visual Schedule Generator** (`/visual-schedule` + `POST /api/visual-schedule` + `POST /api/visual-schedule/illustrate`): Mother types her day in plain Arabic; GPT-5.4 returns 6–10 PECS-style task cards (time, title AR/EN, emoji, duration, parent tip). Output is shape-validated server-side (502 on bad model JSON). Per-task on-demand `gpt-image-1` illustration replaces the emoji with a flat clipart, served as PNG with cache headers. Print stylesheet hides the chrome so the card grid prints cleanly on one page.
  - `/ai-suite` page now shows two "جاهزة" tools at top with teal borders, plus the original 5 "قريباً" tiles below.
  - OpenAI integration env vars `AI_INTEGRATIONS_OPENAI_BASE_URL` + `AI_INTEGRATIONS_OPENAI_API_KEY` provisioned via Replit AI Integrations.
- **AAC Voice Communication Board** (`/aac`): For non-verbal children. 7 categories (feelings, needs, food, body, people, places, actions) with 60+ Arabic words (large emoji + AR/EN labels). Tap a card → Web Speech API speaks the word in `ar-SA`. Sentence strip at top accumulates words; play-sentence button reads them in order. Vocab in `src/lib/aac-vocabulary.ts`. Listed as "ready" tile in AI Suite.
- **Judges landing page** (`/judges`): Demo entry point with hero (logo + tagline + 4 stats: 59 doctors, 7 centers, 8 gov resources, 20+ articles), "جربي نمو في ٦٠ ثانية" 4-step deep-link path (Age → Report Translator → Visual Schedule → AAC), 4 pillars (science, Kuwaiti, mother-first, community), 3 mother testimonials, CTA back to splash + sources. Reachable from gold "للجنة التحكيم" CTA card on splash.
- **Splash polish**: Gold judges CTA card + mother testimonial ("أم علي · حولي") added to home page.
- **Progress dashboard upgrade**: Replaced bar viz with `recharts` LineChart (gradient stroke, ReferenceLines for low/medium thresholds, dark Arabic tooltip). Added trend-delta pill + AI insight card with contextual interpretation (improvement, regression, stable).
- **Smart Ask Numoo (RAG)** (`/chatbot` + `POST /api/ask`): Chatbot now sends the user's question + the full library article catalog (id/title/summary, ~52 articles) to a server-side endpoint. GPT-5.4 returns `{answer, citationIds, needsSpecialist}` strictly grounded in the catalog (refuses to invent). UI shows the answer plus tappable citation cards (sand-colored, link to `/library/:id`) and an amber "needs specialist" warning that links to `/doctors` when the model flags it. Plain validation (no zod) on `req.body`.
- **Printable PDF Library** (`/printables` + `/printables/:id`): Six visual sequence cards (haircut, doctor, dental, school first day, bedtime, eid-visit), each a 6-step grid + tips section in print-friendly A4 layout. Toolbar hidden via `@media print`, includes `print-color-adjust: exact`. Save-as-PDF works via the browser print dialog.
- **Ramadan / Eid Mode** (`/ramadan`): Three tabs — adapted 12-slot Ramadan day schedule, 5 Eid sensory tips for Kuwaiti gatherings, and a 7-line Carol-Gray-style social story for Eid visits.
- **Mom Self-Care** (`/for-mom`): Three tabs — animated 4-7-8 breathing exercise (Andrew Weil/Harvard cited; concentric circles scale via framer-motion), mood journal with 5-emoji scale + optional note saved to localStorage `numoo_mom_journal_v1` (capped 30 entries, today overwrites), and a 7-affirmation carousel. Mental-health hotline 1888888 cited.
- **Splash entry tiles**: Added "✨ ميزات جديدة" 2×2 grid (printables, ramadan, for-mom, AAC) below the existing CTA buttons on the home page.

### Canvas: Splash redesign exploration (2026-05)
Three premium splash redesigns live on the canvas, mobile 402×1400, all three meet brand brief (MSA Arabic, RTL, no emojis, real Numoo numbers 52/59/7/6, Lucide icons, framer-motion):
- `artifacts/mockup-sandbox/src/components/mockups/numoo-redesign-calm/Splash.tsx` — Headspace/Calm lineage. Sand background, serif editorial headlines, narrative chapter scroll.
- `artifacts/mockup-sandbox/src/components/mockups/numoo-redesign-clinical/Splash.tsx` — Babylon/Maven lineage. Navy hero, KPI grid, structured service cards, 4 neutral content-quality trust tiles (no fabricated institutions).
- `artifacts/mockup-sandbox/src/components/mockups/numoo-redesign-hospitality/Splash.tsx` — Kuwaiti regional luxury. Navy→teal gradient with diamond pattern overlay, gold accents, mother-voice testimonial spine on sand.
- `artifacts/mockup-sandbox/src/components/mockups/numoo-redesign-hybrid/Splash.tsx` — Premium hybrid merging best of all three: Clinical's navy hero structure + 4-stat bar + 6-card services grid + content-quality tiles, Hospitality's gold accents + mother-voice testimonial spine + رمضان cultural strip, Calm's oversized serif headline + breathing whitespace.
Pending user pick to graduate via mockup-graduate skill.

### Standalone build
- `cd artifacts/numoo && BUILD_STANDALONE=1 NODE_ENV=production pnpm exec vite build`
- `cd scripts && pnpm exec tsx ./src/build-numoo-standalone.ts`
- Output: `artifacts/numoo/numoo.zip` (~940 KB) — single HTML with inlined CSS/JS/images.
