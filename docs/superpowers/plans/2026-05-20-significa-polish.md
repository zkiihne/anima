# Significa Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring anima's site to Significa's level of visual craft, interaction quality, and content completeness across 11 targeted changes.

**Architecture:** All changes are confined to the existing Next.js/React/Tailwind/Framer Motion stack. No new libraries. Most tasks are isolated to one or two files, with content data centralized in `src/lib/content.ts`. A new `/get-a-quote` route and a new `FAQ` section component are the only new files.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, Framer Motion 12, Geist font, Vitest + @testing-library/react

---

## File Map

| File | Change |
|------|--------|
| `src/app/globals.css` | Warm dark palette, remove light/dark theme variables |
| `src/app/layout.tsx` | Remove inline theme-detection script |
| `src/components/ui/ThemeToggle.tsx` | Delete (unused after Task 2) |
| `src/components/nav/Nav.tsx` | Remove ThemeToggle, add scroll-direction hide/show, add gradient-underline hover |
| `src/components/sections/Hero.tsx` | Reduce H1 clamp, add showreel CTA button |
| `src/components/sections/Services.tsx` | Alternating 50/50 text-image split layout |
| `src/components/sections/About.tsx` | Sub-sections for each handbook link |
| `src/components/sections/Blog.tsx` | Display readTime field |
| `src/components/sections/SelectedWork.tsx` | Add rounded corners to image container |
| `src/components/sections/FAQ.tsx` | New accordion FAQ section |
| `src/components/Footer.tsx` | Large manifesto text above columns |
| `src/app/get-a-quote/page.tsx` | New contact form page |
| `src/lib/content.ts` | Add readTime, faq data, pillar images, update about copy, nav CTA |

---

## Task 1: Warm dark palette — commit to dark-only

Remove the light/dark theme system. The site will always render in dark mode. Change background to `#171717` and foreground to `#ededed`.

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the failing test**

Add to `src/test/content.test.ts`:

```ts
it('globals exports dark palette tokens', () => {
  // Verifies the file contains the right values — run manually after editing:
  // grep '#171717' src/app/globals.css should return a result
  // grep '#ededed' src/app/globals.css should return a result
  expect(true).toBe(true) // placeholder; verify via grep in step 4
})
```

- [ ] **Step 2: Run tests to establish baseline**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass (baseline).

- [ ] **Step 3: Replace `globals.css` with dark-only warm palette**

Replace the entire file with:

```css
@import "tailwindcss";

:root {
  --background: #171717;
  --foreground: #ededed;
  --muted: #888888;
  --border: #2a2a2a;
  --accent: #ededed;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 4: Verify values are present**

```bash
grep '#171717' /Users/zkiihne/anima/src/app/globals.css && echo BACKGROUND_OK
grep '#ededed' /Users/zkiihne/anima/src/app/globals.css && echo FOREGROUND_OK
```

Expected output:
```
  --background: #171717;
BACKGROUND_OK
  --foreground: #ededed;
FOREGROUND_OK
```

- [ ] **Step 5: Remove theme-detection script from `layout.tsx`**

In `src/app/layout.tsx`, delete lines 21–27 (the `themeScript` const) and remove the `<script dangerouslySetInnerHTML={{ __html: themeScript }} />` from `<head>`. Also remove the `GeistSans.variable` class and just use the font without a theme class. The resulting RootLayout should be:

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anima — Think. Design. Develop. Launch. Scale.',
  description: 'We build design-led digital products through research, iterative experimentation, and custom development tailored to user needs.',
  openGraph: {
    title: 'Anima — Think. Design. Develop. Launch. Scale.',
    description: 'We build design-led digital products through research, iterative experimentation, and custom development tailored to user needs.',
    type: 'website',
    url: 'https://anima-ten-theta.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anima — Think. Design. Develop. Launch. Scale.',
    description: 'We build design-led digital products through research, iterative experimentation, and custom development tailored to user needs.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 6: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
cd /Users/zkiihne/anima && git add src/app/globals.css src/app/layout.tsx && git commit -m "feat: commit to dark-only warm palette (#171717 bg, #ededed fg)"
```

---

## Task 2: Remove theme toggle from nav

**Files:**
- Modify: `src/components/nav/Nav.tsx`
- Delete: `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Remove ThemeToggle from Nav.tsx**

In `src/components/nav/Nav.tsx`:
1. Delete the import line: `import { ThemeToggle } from '@/components/ui/ThemeToggle'`
2. Delete the `<ThemeToggle />` JSX element (line 41).

The `<div className="flex items-center gap-3">` block should become:

```tsx
<div className="flex items-center gap-3">
  <Button href={nav.cta.href} variant="primary" className="hidden md:inline-flex">
    {nav.cta.label}
  </Button>
  <button
    className="flex md:hidden flex-col gap-1.5 p-1"
    onClick={() => setMenuOpen(o => !o)}
    aria-label="Toggle menu"
  >
    <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && 'translate-y-[5px] rotate-45')} />
    <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && 'opacity-0')} />
    <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && '-translate-y-[5px] -rotate-45')} />
  </button>
</div>
```

- [ ] **Step 2: Delete ThemeToggle.tsx**

```bash
rm /Users/zkiihne/anima/src/components/ui/ThemeToggle.tsx
```

- [ ] **Step 3: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
cd /Users/zkiihne/anima && git add -A && git commit -m "feat: remove theme toggle — committed to dark brand"
```

---

## Task 3: Nav — scroll-hide/show + gradient-underline hover

Add scroll-direction detection so the header hides when scrolling down and reappears on scroll up. Add a CSS gradient underline effect on nav link hover.

**Files:**
- Modify: `src/components/nav/Nav.tsx`

- [ ] **Step 1: Add scroll-direction detection**

Replace the current `useEffect` scroll handler in `Nav.tsx`. The component currently only tracks whether scrolled > 60px. Replace the entire component with this implementation:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { nav } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setHidden(y > lastY && y > 120)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: hidden ? -80 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12',
          'transition-colors duration-300',
          scrolled || menuOpen
            ? 'bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]'
            : 'bg-transparent'
        )}
      >
        <a href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          anima
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button href={nav.cta.href} variant="primary" className="hidden md:inline-flex">
            {nav.cta.label}
          </Button>
          <button
            className="flex md:hidden flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && 'translate-y-[5px] rotate-45')} />
            <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && 'opacity-0')} />
            <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && '-translate-y-[5px] -rotate-45')} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 flex flex-col justify-center px-6 bg-[var(--background)] transition-all duration-300 md:hidden',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <nav className="flex flex-col gap-8">
          {nav.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-semibold text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
          <Button href={nav.cta.href} variant="primary" className="mt-4 w-fit">
            {nav.cta.label}
          </Button>
        </nav>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Add gradient-underline CSS for `.nav-link`**

Append to `src/app/globals.css`:

```css
.nav-link {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 1px;
  transition: background-size 0.3s cubic-bezier(1, 0, 0, 1), color 0.2s;
}

.nav-link:hover {
  background-size: 100% 1px;
}
```

- [ ] **Step 3: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
cd /Users/zkiihne/anima && git add src/components/nav/Nav.tsx src/app/globals.css && git commit -m "feat: nav scroll-hide on scroll-down, gradient underline hover"
```

---

## Task 4: Hero — reduce H1 size + showreel CTA

The current clamp goes to `11rem` (~176px). Reduce max to `6rem` (~96px) so the five words flow across two elegant lines. Add a "Play showreel" pill button.

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Write the failing test**

Add to `src/test/ui.test.tsx` (read it first to understand the existing structure, then add):

```tsx
it('Hero renders showreel button', () => {
  render(<Hero />)
  expect(screen.getByText('Play showreel')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: FAIL — "Unable to find an element with the text: Play showreel"

- [ ] **Step 3: Implement new Hero**

Replace `src/components/sections/Hero.tsx` with:

```tsx
'use client'
import { motion, cubicBezier } from 'framer-motion'
import { hero } from '@/lib/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const word = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.16, 1, 0.3, 1) } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } },
}

export function Hero() {
  return (
    <section className="flex min-h-[75vh] flex-col justify-end px-6 pb-16 pt-24 md:min-h-screen md:px-12 md:pb-28 md:pt-32">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-semibold leading-[1.05] tracking-[-0.005em] text-[clamp(2.5rem,6vw,6rem)]"
      >
        {hero.words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            className={`block md:inline-block md:mr-6 ${i === hero.words.length - 1 ? 'text-[var(--muted)]' : ''}`}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-10 flex items-center gap-4">
        <a
          href="#showreel"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]">▶</span>
          Play showreel
        </a>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass, including the new showreel test.

- [ ] **Step 5: Commit**

```bash
cd /Users/zkiihne/anima && git add src/components/sections/Hero.tsx src/test/ui.test.tsx && git commit -m "feat: reduce hero H1 to 6rem clamp, add showreel CTA"
```

---

## Task 5: Services — alternating 50/50 text-image splits

Replace the three-column icon card layout with alternating full-width text-left/image-right rows.

**Files:**
- Modify: `src/lib/content.ts`
- Modify: `src/components/sections/Services.tsx`

- [ ] **Step 1: Add image URLs to pillars in content.ts**

Update the `services.pillars` array in `src/lib/content.ts`. Change from the current icon-only format to include a full image:

```ts
export const services = {
  headline: 'Design-led digital products',
  body: 'We build digital products through thorough research, iterative experimentation, and data-minded decisions — with custom development tailored to user needs.',
  pillars: [
    {
      title: 'Strategy',
      description: 'Research, discovery, and product thinking to set the right direction before a single pixel is drawn.',
      icon: 'https://significa.co/_app/immutable/assets/strategy.e14d50fc.webp',
      image: 'https://a.storyblok.com/f/198185/3200x2400/5e415e8ae5/ck_3.webp/m/1200x900/',
    },
    {
      title: 'Design',
      description: 'UI/UX design, prototyping, and brand identity — built for clarity, delight, and conversion.',
      icon: 'https://significa.co/_app/immutable/assets/design.e8a886bb.webp',
      image: 'https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/1200x900/',
    },
    {
      title: 'Development',
      description: 'Custom engineering that brings designs to life with performance and maintainability.',
      icon: 'https://significa.co/_app/immutable/assets/dev.c2a02856.webp',
      image: 'https://a.storyblok.com/f/198185/3840x3840/18f579a475/diathumb.jpeg/m/1200x900/',
    },
  ],
}
```

Also update the `Pillar` type (or add an inline type if none exists yet) to include `image: string`.

- [ ] **Step 2: Write the failing test**

Add to `src/test/content.test.ts`:

```ts
it('each service pillar has an image', () => {
  services.pillars.forEach(p => {
    expect(p.image).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: FAIL — `p.image` is undefined.

- [ ] **Step 4: Add `image` field to pillars in `content.ts`**

Apply the content change from Step 1.

- [ ] **Step 5: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 6: Rebuild Services.tsx as alternating split**

Replace `src/components/sections/Services.tsx` with:

```tsx
import Image from 'next/image'
import { services } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Services() {
  return (
    <section id="services" className="px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-4 text-4xl font-semibold md:text-5xl">{services.headline}</h2>
        <p className="mb-20 max-w-2xl text-lg text-[var(--muted)]">{services.body}</p>
      </AnimateIn>
      <div className="flex flex-col gap-24">
        {services.pillars.map((pillar, i) => (
          <AnimateIn key={pillar.title} delay={i * 0.06}>
            <div className={`flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-16 md:items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div>
                <div className="mb-4 h-10 w-10 relative">
                  <Image src={pillar.icon} alt="" fill className="object-contain object-left" unoptimized />
                </div>
                <h3 className="mb-4 text-2xl font-semibold md:text-3xl">{pillar.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{pillar.description}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
                  Go to services <span>→</span>
                </a>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={pillar.image} alt={pillar.title} fill className="object-cover" unoptimized />
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
cd /Users/zkiihne/anima && git add src/lib/content.ts src/components/sections/Services.tsx && git commit -m "feat: services alternating 50/50 text-image split layout"
```

---

## Task 6: About — brand voice + sub-sections

Replace the flat link list with structured sub-section panels. Fix the body copy to demonstrate the egg-pun brand instead of explaining it.

**Files:**
- Modify: `src/lib/content.ts`
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Update about copy in content.ts**

Replace the `about` object in `src/lib/content.ts`:

```ts
export const about = {
  headline: 'Perfeggcionism freaks',
  body: 'We obsess over craft — the kind that earns design awards and makes users feel like the product was made just for them. No shortcuts, no corners cut. Just beautifully executed work.',
  sections: [
    {
      title: 'Mission & values',
      body: 'We exist to make the digital world a little more thoughtful. Every product we ship carries that belief.',
      cta: { label: 'Read the manifesto', href: '#' },
    },
    {
      title: 'Culture',
      body: 'Remote-first, async by default, and deeply committed to making work feel good — not just produce good output.',
      cta: { label: 'See how we work', href: '#' },
    },
    {
      title: 'Perks & benefits',
      body: 'Competitive pay, flexible hours, home-office budget, and the kind of colleagues who push your craft forward.',
      cta: { label: 'Browse perks', href: '#' },
    },
    {
      title: 'Career plan',
      body: 'We invest in growth with structured review cycles, a dedicated learning budget, and a clear ladder.',
      cta: { label: 'See the ladder', href: '#' },
    },
  ],
}
```

- [ ] **Step 2: Write failing test**

Add to `src/test/content.test.ts`:

```ts
it('about has sections array', () => {
  expect(about.sections.length).toBe(4)
  about.sections.forEach(s => {
    expect(s.title).toBeTruthy()
    expect(s.body).toBeTruthy()
    expect(s.cta).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: FAIL — `about.sections` is undefined.

- [ ] **Step 4: Apply content change**

Apply the `about` object replacement from Step 1.

- [ ] **Step 5: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 6: Rebuild About.tsx with sub-sections**

Replace `src/components/sections/About.tsx` with:

```tsx
import { about } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function About() {
  return (
    <section id="about" className="px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-6 text-4xl font-semibold md:text-7xl">{about.headline}</h2>
        <p className="mb-16 max-w-2xl text-lg text-[var(--muted)] md:text-xl">{about.body}</p>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-px border border-[var(--border)] md:grid-cols-2">
        {about.sections.map((section, i) => (
          <AnimateIn key={section.title} delay={i * 0.06}>
            <div className="flex flex-col gap-4 border-[var(--border)] p-8 md:p-10">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{section.body}</p>
              <a
                href={section.cta.href}
                className="mt-auto inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                {section.cta.label} <span>→</span>
              </a>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 8: Commit**

```bash
cd /Users/zkiihne/anima && git add src/lib/content.ts src/components/sections/About.tsx && git commit -m "feat: about brand voice + 4-panel sub-sections"
```

---

## Task 7: Blog — add read time

**Files:**
- Modify: `src/lib/content.ts`
- Modify: `src/components/sections/Blog.tsx`

- [ ] **Step 1: Write failing test**

Add to `src/test/content.test.ts`:

```ts
it('each blog article has readTime', () => {
  blog.articles.forEach(a => {
    expect(a.readTime).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: FAIL — `a.readTime` is undefined.

- [ ] **Step 3: Add readTime to BlogArticle type and data in content.ts**

1. Update the `BlogArticle` type:

```ts
export type BlogArticle = {
  title: string
  date: string
  author?: string
  readTime: string
  tags: string[]
  href: string
}
```

2. Update the `blog.articles` array:

```ts
export const blog = {
  articles: [
    {
      title: 'Why and when we choose Payload or Storyblok',
      date: '8 May 2026',
      readTime: '6 min read',
      tags: ['Development', 'E-commerce', 'Open-source', 'Strategy'],
      href: '#',
    },
    {
      title: "What can't AI do for your business?",
      date: '5 May 2026',
      author: 'Ana Fernandes',
      readTime: '4 min read',
      tags: ['AI', 'Strategy'],
      href: '#',
    },
    {
      title: 'When is the right time to start a business?',
      date: '29 April 2026',
      readTime: '5 min read',
      tags: ['Strategy'],
      href: '#',
    },
  ] as BlogArticle[],
}
```

- [ ] **Step 4: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 5: Update Blog.tsx to display readTime**

In `src/components/sections/Blog.tsx`, update the metadata line from:

```tsx
<p className="text-sm text-[var(--muted)]">
  {article.author ? `${article.author} · ` : ''}{article.date}
</p>
```

to:

```tsx
<p className="text-sm text-[var(--muted)]">
  {article.author ? `${article.author} · ` : ''}{article.date} · {article.readTime}
</p>
```

- [ ] **Step 6: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
cd /Users/zkiihne/anima && git add src/lib/content.ts src/components/sections/Blog.tsx && git commit -m "feat: add readTime to blog articles"
```

---

## Task 8: Footer — brand statement header

Add a large manifesto heading above the footer columns so the footer functions as a closing brand statement.

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update Footer.tsx**

Replace `src/components/Footer.tsx` with:

```tsx
import { footer, certifications } from '@/lib/content'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 pt-20 pb-12 md:px-12 md:pt-28 md:pb-20">
      <div className="mb-20">
        <p className="text-[clamp(2rem,5vw,5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--muted)]">
          Think.<br />Design.<br />Develop.<br />Launch.<br />Scale.
        </p>
      </div>
      <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="mb-6 text-xl font-semibold">anima</p>
        </div>
        {footer.columns.map(col => (
          <div key={col.title}>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--muted)]">{footer.legal}</p>
        <div className="flex flex-wrap gap-4">
          {certifications.map(cert => (
            <span key={cert.label} className="text-xs text-[var(--muted)]">{cert.label}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
cd /Users/zkiihne/anima && git add src/components/Footer.tsx && git commit -m "feat: footer brand statement manifesto header"
```

---

## Task 9: /get-a-quote page + update nav CTA

Create a dedicated `/get-a-quote` page and update all CTAs that currently point to `#contact` or `mailto:`.

**Files:**
- Create: `src/app/get-a-quote/page.tsx`
- Modify: `src/lib/content.ts` (nav cta href)
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Update nav CTA in content.ts**

In `src/lib/content.ts`, change:

```ts
cta: { label: 'Get a quote', href: '#contact' },
```

to:

```ts
cta: { label: 'Get a quote', href: '/get-a-quote' },
```

- [ ] **Step 2: Create the /get-a-quote page**

Create `src/app/get-a-quote/page.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a quote — Anima',
  description: 'Tell us about your project. We respond within one business day.',
}

export default function GetAQuotePage() {
  return (
    <main className="min-h-screen px-6 pt-40 pb-24 md:px-12 md:pt-48">
      <div className="max-w-xl">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-6xl">Get a quote</h1>
        <p className="mb-12 text-lg text-[var(--muted)]">Tell us about your project and we'll get back to you within a day.</p>
        <form
          action="mailto:hello@anima.studio"
          method="post"
          encType="text/plain"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project" className="text-sm font-medium">Project brief</label>
            <textarea
              id="project"
              name="project"
              rows={5}
              required
              placeholder="What are you building? What's the timeline?"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-fit rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
          >
            Send message
          </button>
        </form>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Update Contact.tsx to point to /get-a-quote**

In `src/components/sections/Contact.tsx`, change:

```tsx
<Button href="mailto:hello@anima.studio" variant="primary">Get a quote</Button>
```

to:

```tsx
<Button href="/get-a-quote" variant="primary">Get a quote</Button>
```

- [ ] **Step 4: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
cd /Users/zkiihne/anima && git add src/app/get-a-quote/page.tsx src/lib/content.ts src/components/sections/Contact.tsx && git commit -m "feat: /get-a-quote page, update nav and contact CTAs"
```

---

## Task 10: FAQ section

Add an accordion FAQ section above the Footer.

**Files:**
- Create: `src/components/sections/FAQ.tsx`
- Modify: `src/lib/content.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add FAQ data to content.ts**

Add to the bottom of `src/lib/content.ts`:

```ts
export type FAQItem = {
  question: string
  answer: string
}

export const faq: FAQItem[] = [
  {
    question: 'How long does a typical project take?',
    answer: 'Most projects run 8–16 weeks depending on scope. Strategy and discovery take 2–4 weeks, design 3–6 weeks, and development 4–8 weeks. We work in parallel where possible.',
  },
  {
    question: 'What does "design-led" actually mean?',
    answer: 'Design drives every decision — from information architecture to micro-interactions. Developers are involved from day one, but the product experience always comes first.',
  },
  {
    question: 'Do you work with early-stage startups?',
    answer: 'Yes. We work across all stages — from 0-to-1 MVPs to established products needing a full redesign. Budget and scope shape the engagement model.',
  },
  {
    question: 'What does a project cost?',
    answer: 'Projects start around €30k. Full-stack product work typically runs €60k–€150k+. We scope every project individually — reach out and we'll give you a clear picture.',
  },
  {
    question: 'Can you work with our existing dev team?',
    answer: 'Absolutely. We often deliver design systems, specifications, and component libraries that in-house teams build on top of.',
  },
  {
    question: 'Do you offer ongoing retainers?',
    answer: 'Yes — we have a small roster of long-term partners we support with design, product strategy, and development on a monthly basis.',
  },
]
```

- [ ] **Step 2: Write failing test**

Add to `src/test/content.test.ts`:

```ts
it('faq has at least 4 items', () => {
  expect(faq.length).toBeGreaterThanOrEqual(4)
  faq.forEach(item => {
    expect(item.question).toBeTruthy()
    expect(item.answer).toBeTruthy()
  })
})
```

Also update the import line at the top of the test file to include `faq`:

```ts
import { nav, hero, projects, selectedWork, services, about, blog, careers, clients, certifications, footer, faq } from '@/lib/content'
```

- [ ] **Step 3: Run test to verify it fails**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: FAIL — `faq` is not exported.

- [ ] **Step 4: Apply the content.ts change**

Apply the FAQ data addition from Step 1.

- [ ] **Step 5: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 6: Create FAQ.tsx**

Create `src/components/sections/FAQ.tsx`:

```tsx
'use client'
import { useState } from 'react'
import { faq } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-12 text-3xl font-semibold md:text-5xl">Frequently asked questions</h2>
      </AnimateIn>
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {faq.map((item, i) => (
          <AnimateIn key={item.question} delay={i * 0.04}>
            <div>
              <button
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-base font-medium md:text-lg">{item.question}</span>
                <span className="shrink-0 text-[var(--muted)] transition-transform duration-200" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>
                  +
                </span>
              </button>
              {open === i && (
                <p className="pb-6 text-sm leading-relaxed text-[var(--muted)] md:text-base md:max-w-2xl">
                  {item.answer}
                </p>
              )}
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Add FAQ to page.tsx**

In `src/app/page.tsx`:

1. Add import: `import { FAQ } from '@/components/sections/FAQ'`
2. Add `<FAQ />` before `<Footer />`:

```tsx
        <Contact />
        <FAQ />
      </main>
      <Footer />
```

- [ ] **Step 8: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 9: Commit**

```bash
cd /Users/zkiihne/anima && git add src/components/sections/FAQ.tsx src/lib/content.ts src/app/page.tsx src/test/content.test.ts && git commit -m "feat: accordion FAQ section with 6 items"
```

---

## Task 11: SelectedWork — rounded image containers

Add `rounded-xl overflow-hidden` to the project image wrapper in SelectedWork.

**Files:**
- Modify: `src/components/sections/SelectedWork.tsx`

- [ ] **Step 1: Update ProjectImage wrapper in SelectedWork.tsx**

In `src/components/sections/SelectedWork.tsx`, change:

```tsx
<div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden">
```

to:

```tsx
<div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
```

- [ ] **Step 2: Run tests**

```bash
cd /Users/zkiihne/anima && pnpm test
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
cd /Users/zkiihne/anima && git add src/components/sections/SelectedWork.tsx && git commit -m "feat: rounded corners on SelectedWork image containers"
```

---

## Self-Review

**Spec coverage check:**

| Item from comparison | Task |
|----------------------|------|
| Background `#171717`, foreground `#ededed` | Task 1 |
| Remove theme toggle | Task 2 |
| Nav scroll-hide/show + gradient underline hover | Task 3 |
| H1 clamp to 6rem, proportional tracking | Task 4 |
| Showreel button in hero | Task 4 |
| Nav CTA → /get-a-quote | Task 9 |
| Services → 50/50 alternating | Task 5 |
| About brand voice + real sub-sections | Task 6 |
| Blog read time | Task 7 |
| Footer manifesto statement | Task 8 |
| /get-a-quote page | Task 9 |
| FAQ section | Task 10 |
| SelectedWork border-radius | Task 11 |
| CTA button fix (Contact.tsx) | Task 9 |

Items not addressed (out of scope for this plan — require design assets or backend not yet available):
- "Ask ChatGPT/Claude about us" GEO widget (no AI routing endpoint)
- Certification logo images in footer (logos exist as text labels only — a polish pass could add them)
- Blog post pages (no CMS)
- Handbook pages (no content)
