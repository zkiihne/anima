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
