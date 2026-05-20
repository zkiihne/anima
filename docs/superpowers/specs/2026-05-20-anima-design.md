# Anima — Design Spec
_2026-05-20_

## Goal

1:1 clone of significa.co, with all text and structure preserved verbatim. Content lives in a single typed data file for easy rebrand swap-out later.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Framer Motion (scroll animations, stagger reveals)
- pnpm

## Project Structure

```
anima/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # root layout, fonts, metadata
│   │   └── page.tsx          # composes all sections
│   ├── components/
│   │   ├── nav/
│   │   │   └── Nav.tsx       # sticky top nav, logo, links, CTA button
│   │   ├── sections/
│   │   │   ├── Hero.tsx      # "Think. Design. Develop. Launch. Scale." marquee
│   │   │   ├── Projects.tsx  # 2×2 project grid
│   │   │   ├── SelectedWork.tsx  # expanded project cards with award badges
│   │   │   ├── Services.tsx  # Strategy / Design / Development pillars
│   │   │   ├── About.tsx     # "Perfectionism freaks" culture copy
│   │   │   ├── Blog.tsx      # article cards with author/date/tags
│   │   │   ├── Careers.tsx   # job listing
│   │   │   ├── Clients.tsx   # logo strip "Proud to have worked with"
│   │   │   └── Certifications.tsx  # B Corp, 1% for the Planet
│   │   ├── ui/
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Button.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   └── content.ts        # all copy, projects, blog posts, clients as typed objects
│   └── styles/
│       └── globals.css
├── public/
└── package.json
```

## Sections & Content

### Nav
Links: Home, Projects, Services, About | CTA: "Get a quote"

### Hero
Animated headline: "Think. Design. Develop. Launch. Scale."
Implementation: CSS marquee or Framer Motion stagger — each word fades/slides in on load.

### Project Grid (2×2)
| Title | Description |
|-------|-------------|
| Coffee King | A unified e-commerce platform selling to consumers and businesses alike |
| mishmash | Unique e-commerce design for the ultimate product experience |
| Diesta | Streamlining insurance payments |
| Dia | An app to empower women in their fertility journey |

### Selected Work
Expanded cards for Dia and mishmash. Award badges per project:
- Dia: iF Design, German Design Gold Award, Good Design, European Design Gold Award, Red Dot, Awwwards Distinction
- mishmash: (same set)

### Services
Three pillars: Strategy, Design, Development
Body: "Design-led digital products" — research, iterative experimentation, data-minded decisions with custom development tailored to user needs.

### About
Headline: "Perfectionism freaks"
Body: Committed to excellence while maintaining quirky creativity and egg puns. Links to handbook (mission, values, perks, career plans).

### Blog
Three articles:
1. "Why and when we choose Payload or Storyblok" — 8 May 2026 — Tags: Development, E-commerce, Open-source, Strategy
2. "What can't AI do for your business?" — 5 May 2026 — Author: Ana Fernandes — Tags: AI, Strategy
3. "When is the right time to start a business?" — 29 April 2026 — Tag: Strategy

### Careers
Single listing: Product Designer

### Clients
FCP, Emma, TFP, HeyHarper, allO, mishmash

### Certifications
B Corp, 1% for the Planet, Seloid

### Footer
Columns: Main nav (Projects, Services, About, Blog, Contact, Careers) | Handbook (Playbook, Mission and values, Culture, How we collaborate) | Social (Instagram, X, LinkedIn, Behance, GitHub, YouTube)

## Animations

All scroll-triggered via Framer Motion `useInView` + `variants`:
- **Hero**: staggered word reveal on load (opacity 0→1, y 20→0, 80ms stagger per word)
- **Section entries**: fade + slide up when entering viewport (threshold 0.2)
- **Project cards**: stagger children 60ms apart on parent enter
- **Nav**: transparent on hero, transitions to solid on scroll

## Content Strategy

`src/lib/content.ts` exports typed constants for every piece of copy. No hardcoded strings in components. This makes the rebrand a single-file edit.

## Light/Dark Mode

Tailwind `dark:` variants throughout. System preference default via `prefers-color-scheme`.

## Deployment

Vercel (static export compatible). `vercel.json` added at scaffold time.
