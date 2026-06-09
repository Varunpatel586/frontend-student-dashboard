# Aetheris - Handcrafted Student Dashboard

A premium, highly polished student dashboard built using Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, and Supabase. The visual layout moves away from standardized frosted glass interfaces, opting for custom white underglow effects, solid dark cards, and deep ambient gradients.

---

## Architectural Choices

1. **Modern Framework Foundation**
   - Built on **Next.js 16** and **React 19** to take advantage of React Server Components (RSC) and Suspense-driven data streaming.
   - Leveraged **Framer Motion** for spring-physics animations (`whileHover`, active tab transition slides using `layoutId`, and rotating conic border gradient tracking).

2. **Tailwind CSS v4 CSS-First Styling**
   - Configured custom theme colors (`accent-blue`, `accent-cyan`, etc.) and visual configurations inside `app/globals.css` using the new `@theme` API, bypassing the obsolete `tailwind.config.js` and improving overall styling compilation speed.

3. **Resilient Supabase Integration**
   - The data service layer in `lib/supabase.ts` fetches active syllabus progress.
   - It is designed with failure resilience: if Supabase environment keys are missing, the table fails to query, or SQL connection errors arise, it gracefully catches the error and falls back to a high-fidelity mock course dataset to keep the prototype visual and functional.

---

## Server vs. Client Component Split

To maximize performance, security, and rendering speed, a strict component split is enforced:

### React Server Components (RSC)
- **Data Fetching (`CourseListSection.tsx`)**: Database queries reside fully on the server. The database is accessed directly, keeping SQL scripts and access keys secure and out of client bundles.
- **Incremental Loading (`page.tsx`)**: The dashboard main page structure renders immediately. The course syllabus section is wrapped in a React `<Suspense>` boundary with a custom `CourseGridSkeleton`, streaming in database content asynchronously once resolved.

### Client Components (`"use client"`)
- **Collapsible Sidebar (`Sidebar.tsx`)**: Manages navigation states, mobile layouts, and animated tab markers.
- **Hero & Badge Sizing (`HeroTile.tsx`, `DailyStreakBadge.tsx`)**: Operates reactive mock state counters, flame flickering keyframes, and conic rotation elements.
- **Momentum Contribution Grid (`ActivityTile.tsx`)**: Tracks grid block hover interactions, populating local state tooltips on cell hover with custom spring transition scale-ups.
- **Interactive Tiles (`CourseTile.tsx`)**: Manages individual card hover effects (lift-ups, border highlight morphing, and white underglow boxShadow depth).

---

## Challenges Faced & Solutions

1. **Cumulative Layout Shift (CLS) on Animations**
   - *Challenge*: Initially, animating progress bars and expanding widgets caused the layout to jump, impacting page responsiveness score.
   - *Solution*: Replaced width animation properties with Framer Motion `scaleX` transitions aligned with `originX: 0`, which runs hardware-accelerated animations without triggering page layout reflows.

2. **Gamer-style Streak & Rank Badge Widths**
   - *Challenge*: Getting two visually rich, multi-layered badges to align side-by-side with exact 50% split sizing across all viewport resolutions.
   - *Solution*: Replaced flexible alignment containers with a strict CSS Grid setup (`grid grid-cols-2 items-stretch gap-4 w-full`) and set outer wrappers to `flex-1 w-full`.

3. **Eliminating the "AI-generated" Glassmorphism Tropes**
   - *Challenge*: The initial design relied heavily on thick frosted-glass borders and backdrop blurs, making the dashboard look generic.
   - *Solution*: Reduced card border opacity to a thin frame (`border-white/[0.1]`), stripped out backdrop blurs, and utilized deeper solid dark backdrops (`bg-[#0c0c0e]` or `bg-white/[0.02]`) backed by customized white radial shadows underneath the card borders.

---

## Getting Started

First, install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
