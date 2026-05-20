# Anima Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-faithful Next.js clone of significa.co with all content in a single typed data file for easy rebrand.

**Architecture:** Next.js 14 App Router with TypeScript. All copy lives in `src/lib/content.ts` as typed constants — components never contain hardcoded strings. Framer Motion handles all scroll-triggered animations and the hero stagger reveal.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, pnpm, Vitest + @testing-library/react

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/lib/content.ts` | All copy, project data, blog posts, clients — single source of truth |
| `src/app/layout.tsx` | Root layout, font imports, metadata |
| `src/app/globals.css` | Base reset, Tailwind directives, custom CSS vars |
| `src/app/page.tsx` | Composes all sections in order |
| `src/components/ui/Button.tsx` | Reusable button (variant: primary, ghost) |
| `src/components/ui/Badge.tsx` | Pill badge for award names and blog tags |
| `src/components/ui/AnimateIn.tsx` | Shared scroll-triggered fade+slide wrapper |
| `src/components/nav/Nav.tsx` | Sticky nav — transparent on hero, solid on scroll |
| `src/components/sections/Hero.tsx` | Staggered word reveal headline |
| `src/components/sections/Projects.tsx` | 2×2 project grid |
| `src/components/sections/SelectedWork.tsx` | Expanded project cards with award badges |
| `src/components/sections/Services.tsx` | Strategy / Design / Development pillars |
| `src/components/sections/About.tsx` | Perfectionism freaks culture copy |
| `src/components/sections/Blog.tsx` | Article cards with tags |
| `src/components/sections/Careers.tsx` | Job listing |
| `src/components/sections/Clients.tsx` | Client logo strip |
| `src/components/sections/Certifications.tsx` | B Corp / 1% for the Planet badges |
| `src/components/Footer.tsx` | Multi-column footer |
| `vercel.json` | Vercel deployment config |

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Scaffold Next.js app with pnpm**

```bash
cd /Users/zkiihne/anima
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```
When prompted, accept all defaults (App Router, no Turbopack is fine either way).

- [ ] **Step 2: Install Framer Motion and testing dependencies**

```bash
pnpm add framer-motion
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Verify scaffold builds**

```bash
pnpm build
```
Expected: build succeeds with no type errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 + Tailwind + Framer Motion"
```

---

### Task 2: Content data file

**Files:**
- Create: `src/lib/content.ts`
- Create: `src/test/content.test.ts`

- [ ] **Step 1: Write the failing type test**

Create `src/test/content.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { nav, hero, projects, selectedWork, services, about, blog, careers, clients, certifications, footer } from '@/lib/content'

describe('content', () => {
  it('nav has links and cta', () => {
    expect(nav.links.length).toBeGreaterThan(0)
    expect(nav.cta).toBeTruthy()
  })
  it('hero has words array', () => {
    expect(hero.words.length).toBeGreaterThan(0)
  })
  it('projects has 4 entries', () => {
    expect(projects.length).toBe(4)
    projects.forEach(p => {
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
    })
  })
  it('selectedWork has award badges', () => {
    selectedWork.forEach(p => {
      expect(p.awards.length).toBeGreaterThan(0)
    })
  })
  it('services has 3 pillars', () => {
    expect(services.pillars.length).toBe(3)
  })
  it('blog has 3 articles', () => {
    expect(blog.articles.length).toBe(3)
    blog.articles.forEach(a => {
      expect(a.title).toBeTruthy()
      expect(a.date).toBeTruthy()
      expect(a.tags.length).toBeGreaterThan(0)
    })
  })
  it('clients has entries', () => {
    expect(clients.length).toBeGreaterThan(0)
  })
  it('footer has columns', () => {
    expect(footer.columns.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test
```
Expected: FAIL — `Cannot find module '@/lib/content'`

- [ ] **Step 3: Create content.ts**

Create `src/lib/content.ts`:
```typescript
export const nav = {
  links: [
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
  ],
  cta: { label: 'Get a quote', href: '#contact' },
}

export const hero = {
  words: ['Think.', 'Design.', 'Develop.', 'Launch.', 'Scale.'],
}

export type Project = {
  id: string
  title: string
  description: string
  category: string
}

export const projects: Project[] = [
  { id: 'coffee-king', title: 'Coffee King', description: 'A unified e-commerce platform selling to consumers and businesses alike', category: 'E-commerce' },
  { id: 'mishmash', title: 'mishmash', description: 'Unique e-commerce design for the ultimate product experience', category: 'E-commerce' },
  { id: 'diesta', title: 'Diesta', description: 'Streamlining insurance payments', category: 'Fintech' },
  { id: 'dia', title: 'Dia', description: 'An app to empower women in their fertility journey', category: 'Health' },
]

export type SelectedProject = {
  id: string
  title: string
  description: string
  awards: string[]
}

export const selectedWork: SelectedProject[] = [
  {
    id: 'dia',
    title: 'Dia',
    description: 'An app to empower women in their fertility journey',
    awards: ['iF Design', 'German Design Gold Award', 'Good Design', 'European Design Gold Award', 'Red Dot', 'Awwwards Distinction'],
  },
  {
    id: 'mishmash',
    title: 'mishmash',
    description: 'Unique e-commerce design for the ultimate product experience',
    awards: ['iF Design', 'German Design Gold Award', 'Good Design', 'European Design Gold Award', 'Red Dot', 'Awwwards Distinction'],
  },
]

export const services = {
  headline: 'Design-led digital products',
  body: 'We build digital products through thorough research, iterative experimentation, and data-minded decisions — with custom development tailored to user needs.',
  pillars: [
    { title: 'Strategy', description: 'Research, discovery, and product thinking to set the right direction before a single pixel is drawn.' },
    { title: 'Design', description: 'UI/UX design, prototyping, and brand identity — built for clarity, delight, and conversion.' },
    { title: 'Development', description: 'Custom engineering that brings designs to life with performance and maintainability.' },
  ],
}

export const about = {
  headline: 'Perfectionism freaks',
  body: 'We are committed to excellence while maintaining random, quirky creativity and egg puns.',
  handbook: [
    { label: 'Mission and values', href: '#' },
    { label: 'Culture', href: '#' },
    { label: 'Perks', href: '#' },
    { label: 'Career plans', href: '#' },
  ],
}

export type BlogArticle = {
  title: string
  date: string
  author?: string
  tags: string[]
  href: string
}

export const blog = {
  articles: [
    {
      title: 'Why and when we choose Payload or Storyblok',
      date: '8 May 2026',
      tags: ['Development', 'E-commerce', 'Open-source', 'Strategy'],
      href: '#',
    },
    {
      title: 'What can\'t AI do for your business?',
      date: '5 May 2026',
      author: 'Ana Fernandes',
      tags: ['AI', 'Strategy'],
      href: '#',
    },
    {
      title: 'When is the right time to start a business?',
      date: '29 April 2026',
      tags: ['Strategy'],
      href: '#',
    },
  ] as BlogArticle[],
}

export const careers = {
  headline: 'Join us',
  listings: [
    { title: 'Product Designer', type: 'Full-time', href: '#' },
  ],
}

export const clients = ['FCP', 'Emma', 'TFP', 'HeyHarper', 'allO', 'mishmash']

export const certifications = [
  { label: 'B Corp', description: 'Certified B Corporation' },
  { label: '1% for the Planet', description: 'Environmental commitment' },
  { label: 'Seloid', description: 'Seloid partnership' },
]

export const footer = {
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'Projects', href: '#projects' },
        { label: 'Services', href: '#services' },
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
        { label: 'Careers', href: '#careers' },
      ],
    },
    {
      title: 'Handbook',
      links: [
        { label: 'Playbook', href: '#' },
        { label: 'Mission and values', href: '#' },
        { label: 'Culture', href: '#' },
        { label: 'How we collaborate', href: '#' },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'Instagram', href: '#' },
        { label: 'X', href: '#' },
        { label: 'LinkedIn', href: '#' },
        { label: 'Behance', href: '#' },
        { label: 'GitHub', href: '#' },
        { label: 'YouTube', href: '#' },
      ],
    },
  ],
  legal: '© 2026 Anima. All rights reserved.',
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test
```
Expected: all 8 content tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content.ts src/test/
git commit -m "feat: typed content data file with all significa.co copy"
```

---

### Task 3: Global styles, fonts, layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update globals.css**

Replace the default `src/app/globals.css` entirely:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #6b7280;
  --border: #e5e7eb;
  --accent: #0a0a0a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #fafafa;
    --muted: #9ca3af;
    --border: #1f2937;
    --accent: #fafafa;
  }
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
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Update layout.tsx with Geist font**

Replace `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anima — Think. Design. Develop. Launch. Scale.',
  description: 'Design-led digital products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  )
}
```

Install Geist if not already present:
```bash
pnpm add geist
```

- [ ] **Step 3: Stub page.tsx**

Replace `src/app/page.tsx`:
```typescript
export default function Home() {
  return <main>Anima</main>
}
```

- [ ] **Step 4: Verify build**

```bash
pnpm build
```
Expected: builds clean, no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/
git commit -m "feat: global styles, Geist font, layout"
```

---

### Task 4: UI primitives — Button, Badge, AnimateIn

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/AnimateIn.tsx`
- Create: `src/test/ui.test.tsx`

- [ ] **Step 1: Write failing render tests**

Create `src/test/ui.test.tsx`:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

describe('Button', () => {
  it('renders label', () => {
    render(<Button>Get a quote</Button>)
    expect(screen.getByText('Get a quote')).toBeInTheDocument()
  })
  it('renders ghost variant', () => {
    const { container } = render(<Button variant="ghost">Learn more</Button>)
    expect(container.firstChild).toHaveClass('border')
  })
})

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge>iF Design</Badge>)
    expect(screen.getByText('iF Design')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm test
```
Expected: FAIL — cannot find Button, Badge modules.

- [ ] **Step 3: Create Button**

Create `src/components/ui/Button.tsx`:
```typescript
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  href?: string
}

export function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200'
  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-80',
    ghost: 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]',
  }
  const cls = cn(base, variants[variant], className)
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button className={cls} {...props}>{children}</button>
}
```

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Install deps:
```bash
pnpm add clsx tailwind-merge
```

- [ ] **Step 4: Create Badge**

Create `src/components/ui/Badge.tsx`:
```typescript
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]', className)}>
      {children}
    </span>
  )
}
```

- [ ] **Step 5: Create AnimateIn**

Create `src/components/ui/AnimateIn.tsx`:
```typescript
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
pnpm test
```
Expected: all UI tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/ src/lib/utils.ts src/test/ui.test.tsx
git commit -m "feat: Button, Badge, AnimateIn primitives"
```

---

### Task 5: Nav

**Files:**
- Create: `src/components/nav/Nav.tsx`

- [ ] **Step 1: Create Nav**

Create `src/components/nav/Nav.tsx`:
```typescript
'use client'
import { useEffect, useState } from 'react'
import { nav } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300',
        scrolled ? 'bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--border)]' : 'bg-transparent'
      )}
    >
      <a href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
        anima
      </a>
      <nav className="hidden md:flex items-center gap-8">
        {nav.links.map(link => (
          <a key={link.label} href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
      <Button href={nav.cta.href} variant="primary">
        {nav.cta.label}
      </Button>
    </header>
  )
}
```

- [ ] **Step 2: Add Nav to page.tsx**

Replace `src/app/page.tsx`:
```typescript
import { Nav } from '@/components/nav/Nav'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20">
        <p className="p-8 text-[var(--muted)]">Sections coming soon…</p>
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav/ src/app/page.tsx
git commit -m "feat: sticky Nav with scroll-triggered background"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero**

Create `src/components/sections/Hero.tsx`:
```typescript
'use client'
import { motion } from 'framer-motion'
import { hero } from '@/lib/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const word = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl text-6xl font-semibold leading-tight tracking-tight md:text-8xl"
      >
        {hero.words.map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block mr-4">
            {w}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page.tsx**

```typescript
import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: Hero section with staggered word reveal"
```

---

### Task 7: Projects grid

**Files:**
- Create: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Create Projects section**

Create `src/components/sections/Projects.tsx`:
```typescript
import { projects } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Projects() {
  return (
    <section id="projects" className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">Selected Projects</h2>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.06}>
            <a href={`#${project.id}`} className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 transition-all duration-300 hover:border-[var(--foreground)]">
              <span className="mb-2 block text-xs text-[var(--muted)]">{project.category}</span>
              <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
              <p className="text-[var(--muted)]">{project.description}</p>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects.tsx src/app/page.tsx
git commit -m "feat: Projects 2x2 grid with AnimateIn"
```

---

### Task 8: Selected Work

**Files:**
- Create: `src/components/sections/SelectedWork.tsx`

- [ ] **Step 1: Create SelectedWork section**

Create `src/components/sections/SelectedWork.tsx`:
```typescript
import { selectedWork } from '@/lib/content'
import { Badge } from '@/components/ui/Badge'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function SelectedWork() {
  return (
    <section className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">Awards & Recognition</h2>
      </AnimateIn>
      <div className="flex flex-col gap-16">
        {selectedWork.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.08}>
            <div className="border-t border-[var(--border)] pt-10">
              <h3 className="mb-3 text-3xl font-semibold">{project.title}</h3>
              <p className="mb-6 text-[var(--muted)]">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.awards.map(award => (
                  <Badge key={award}>{award}</Badge>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx**

```typescript
import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { SelectedWork } from '@/components/sections/SelectedWork'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <SelectedWork />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify build + commit**

```bash
pnpm build && git add src/components/sections/SelectedWork.tsx src/app/page.tsx && git commit -m "feat: SelectedWork with award badges"
```

---

### Task 9: Services

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1: Create Services section**

Create `src/components/sections/Services.tsx`:
```typescript
import { services } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Services() {
  return (
    <section id="services" className="px-8 py-24 bg-[var(--foreground)] text-[var(--background)]">
      <AnimateIn>
        <h2 className="mb-4 text-4xl font-semibold md:text-6xl">{services.headline}</h2>
        <p className="mb-16 max-w-2xl text-lg opacity-70">{services.body}</p>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {services.pillars.map((pillar, i) => (
          <AnimateIn key={pillar.title} delay={i * 0.08}>
            <div className="border-t border-[var(--background)]/20 pt-6">
              <h3 className="mb-3 text-xl font-semibold">{pillar.title}</h3>
              <p className="opacity-70 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and verify build**

Add `<Services />` import and element to `src/app/page.tsx` after `<SelectedWork />`.

```bash
pnpm build && git add src/components/sections/Services.tsx src/app/page.tsx && git commit -m "feat: Services section with 3 pillars"
```

---

### Task 10: About

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About section**

Create `src/components/sections/About.tsx`:
```typescript
import { about } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function About() {
  return (
    <section id="about" className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-6 text-5xl font-semibold md:text-7xl">{about.headline}</h2>
        <p className="mb-10 max-w-2xl text-xl text-[var(--muted)]">{about.body}</p>
      </AnimateIn>
      <AnimateIn delay={0.1}>
        <div className="flex flex-wrap gap-3">
          {about.handbook.map(item => (
            <a key={item.label} href={item.href} className="text-sm underline underline-offset-4 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and commit**

Add `<About />` after `<Services />`.

```bash
pnpm build && git add src/components/sections/About.tsx src/app/page.tsx && git commit -m "feat: About section"
```

---

### Task 11: Blog

**Files:**
- Create: `src/components/sections/Blog.tsx`

- [ ] **Step 1: Create Blog section**

Create `src/components/sections/Blog.tsx`:
```typescript
import { blog } from '@/lib/content'
import { Badge } from '@/components/ui/Badge'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Blog() {
  return (
    <section id="blog" className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">From the blog</h2>
      </AnimateIn>
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {blog.articles.map((article, i) => (
          <AnimateIn key={article.title} delay={i * 0.06}>
            <a href={article.href} className="group flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between hover:opacity-70 transition-opacity">
              <div>
                <h3 className="mb-1 text-lg font-medium group-hover:underline">{article.title}</h3>
                <p className="text-sm text-[var(--muted)]">
                  {article.author ? `${article.author} · ` : ''}{article.date}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page.tsx and commit**

Add `<Blog />` after `<About />`.

```bash
pnpm build && git add src/components/sections/Blog.tsx src/app/page.tsx && git commit -m "feat: Blog section with article cards"
```

---

### Task 12: Careers, Clients, Certifications

**Files:**
- Create: `src/components/sections/Careers.tsx`
- Create: `src/components/sections/Clients.tsx`
- Create: `src/components/sections/Certifications.tsx`

- [ ] **Step 1: Create Careers**

Create `src/components/sections/Careers.tsx`:
```typescript
import { careers } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Careers() {
  return (
    <section id="careers" className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">{careers.headline}</h2>
      </AnimateIn>
      {careers.listings.map((listing, i) => (
        <AnimateIn key={listing.title} delay={i * 0.06}>
          <div className="flex items-center justify-between border-t border-[var(--border)] py-6">
            <div>
              <h3 className="text-xl font-semibold">{listing.title}</h3>
              <p className="text-sm text-[var(--muted)]">{listing.type}</p>
            </div>
            <Button variant="ghost" href={listing.href}>Apply</Button>
          </div>
        </AnimateIn>
      ))}
    </section>
  )
}
```

- [ ] **Step 2: Create Clients**

Create `src/components/sections/Clients.tsx`:
```typescript
import { clients } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Clients() {
  return (
    <section className="px-8 py-24 border-t border-[var(--border)]">
      <AnimateIn>
        <p className="mb-10 text-sm text-[var(--muted)]">Proud to have worked with</p>
      </AnimateIn>
      <AnimateIn delay={0.1}>
        <div className="flex flex-wrap items-center gap-10">
          {clients.map(client => (
            <span key={client} className="text-2xl font-semibold text-[var(--foreground)] opacity-40 hover:opacity-100 transition-opacity">
              {client}
            </span>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}
```

- [ ] **Step 3: Create Certifications**

Create `src/components/sections/Certifications.tsx`:
```typescript
import { certifications } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Certifications() {
  return (
    <section className="px-8 py-16 border-t border-[var(--border)]">
      <AnimateIn>
        <div className="flex flex-wrap gap-6">
          {certifications.map((cert) => (
            <div key={cert.label} className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm">
              <span className="font-medium">{cert.label}</span>
              <span className="ml-2 text-[var(--muted)]">{cert.description}</span>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}
```

- [ ] **Step 4: Add all three to page.tsx**

Add `<Careers />`, `<Clients />`, `<Certifications />` after `<Blog />`.

```bash
pnpm build && git add src/components/sections/Careers.tsx src/components/sections/Clients.tsx src/components/sections/Certifications.tsx src/app/page.tsx && git commit -m "feat: Careers, Clients, Certifications sections"
```

---

### Task 13: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create Footer**

Create `src/components/Footer.tsx`:
```typescript
import { footer, certifications } from '@/lib/content'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-8 py-16">
      <div className="mb-16 grid grid-cols-2 gap-10 md:grid-cols-4">
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

- [ ] **Step 2: Add Footer to page.tsx**

Final `src/app/page.tsx`:
```typescript
import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Blog } from '@/components/sections/Blog'
import { Careers } from '@/components/sections/Careers'
import { Clients } from '@/components/sections/Clients'
import { Certifications } from '@/components/sections/Certifications'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <SelectedWork />
        <Services />
        <About />
        <Blog />
        <Careers />
        <Clients />
        <Certifications />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify full build**

```bash
pnpm build
```
Expected: clean build, no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: Footer + full page assembly"
```

---

### Task 14: Vercel config + push

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create vercel.json**

Create `vercel.json`:
```json
{
  "framework": "nextjs"
}
```

- [ ] **Step 2: Final build + test**

```bash
pnpm build && pnpm test
```
Expected: all tests PASS, build succeeds.

- [ ] **Step 3: Push to GitHub**

```bash
git add vercel.json
git commit -m "feat: vercel config"
git push
```

---
