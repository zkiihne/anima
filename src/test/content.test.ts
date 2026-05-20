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
  it('each service pillar has an image', () => {
    services.pillars.forEach(p => {
      expect((p as any).image).toBeTruthy()
    })
  })
  it('about has sections array with 4 items', () => {
    expect(about.sections.length).toBe(4)
    about.sections.forEach((s: any) => {
      expect(s.title).toBeTruthy()
      expect(s.body).toBeTruthy()
      expect(s.cta).toBeTruthy()
    })
  })
})
