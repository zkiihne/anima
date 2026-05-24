export const nav = {
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Book a call', href: '/get-a-quote' },
}

export const hero = {
  words: ['Think.', 'Create.', 'Automate.', 'Learn.', 'Evolve.'],
}

export type Project = {
  id: string
  title: string
  description: string
  category: string
  thumb: string
  href: string
}

export const projects: Project[] = [
  { id: 'coffee-king', title: 'Coffee King', description: 'A unified e-commerce platform selling to consumers and businesses alike', category: 'E-commerce', thumb: 'https://a.storyblok.com/f/198185/3200x2400/5e415e8ae5/ck_3.webp/m/200x160/', href: 'https://significa.co/work/coffee-king' },
  { id: 'mishmash', title: 'mishmash', description: 'Unique e-commerce design for the ultimate product experience', category: 'E-commerce', thumb: 'https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/200x160/', href: '#mishmash' },
  { id: 'diesta', title: 'Diesta', description: 'Streamlining insurance payments', category: 'Fintech', thumb: 'https://a.storyblok.com/f/198185/3200x2400/8028cc1a7f/diesta_thumbnail.webp/m/200x160/', href: 'https://significa.co/work/diesta' },
  { id: 'dia', title: 'Dia', description: 'An app to empower women in their fertility journey', category: 'Health', thumb: 'https://a.storyblok.com/f/198185/3840x3840/18f579a475/diathumb.jpeg/m/200x160/', href: '#dia' },
]

export type Award = {
  label: string
  logo: string
}

export type SelectedProject = {
  id: string
  title: string
  description: string
  image: string
  href: string
  awards: Award[]
}

export const selectedWork: SelectedProject[] = [
  {
    id: 'dia',
    title: 'Dia.',
    description: 'A personalAgent built for fertility health. Tracks cycles, flags anomalies, and surfaces insights before they become concerns.',
    image: 'https://a.storyblok.com/f/198185/3840x3840/18f579a475/diathumb.jpeg/m/1440x1080/',
    href: 'https://significa.co/work/dia',
    awards: [
      { label: 'iF Design', logo: 'https://a.storyblok.com/f/198185/168x132/9f64598050/ifdesign.webp/m/120x0/' },
      { label: 'European Design', logo: 'https://a.storyblok.com/f/198185/112x88/c5732814c2/european-design-nominee-gold.png/m/120x0/' },
      { label: 'German Design', logo: 'https://a.storyblok.com/f/198185/168x132/3a615f33cf/gda-badge.png/m/120x0/' },
      { label: 'Red Dot', logo: 'https://a.storyblok.com/f/198185/168x132/696778595b/reddot.webp/m/120x0/' },
      { label: 'Good Design', logo: 'https://a.storyblok.com/f/198185/168x132/26c6561039/gooddesignlogo.png/m/120x0/' },
      { label: 'Awwwards', logo: 'https://a.storyblok.com/f/198185/122x88/84389cd1be/awwwardshm.png/m/120x0/' },
    ],
  },
  {
    id: 'mishmash',
    title: 'mishmash.',
    description: 'A professionalAgent for e-commerce operations. Handles product research, supplier outreach, and inventory decisions without being asked.',
    image: 'https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/1440x1080/',
    href: 'https://significa.co/work/mishmash',
    awards: [
      { label: 'iF Design', logo: 'https://a.storyblok.com/f/198185/168x132/9f64598050/ifdesign.webp/m/120x0/' },
      { label: 'European Design', logo: 'https://a.storyblok.com/f/198185/112x88/c5732814c2/european-design-nominee-gold.png/m/120x0/' },
      { label: 'German Design', logo: 'https://a.storyblok.com/f/198185/168x132/3a615f33cf/gda-badge.png/m/120x0/' },
      { label: 'Red Dot', logo: 'https://a.storyblok.com/f/198185/168x132/696778595b/reddot.webp/m/120x0/' },
      { label: 'Good Design', logo: 'https://a.storyblok.com/f/198185/168x132/26c6561039/gooddesignlogo.png/m/120x0/' },
      { label: 'Awwwards', logo: 'https://a.storyblok.com/f/198185/122x88/84389cd1be/awwwardshm.png/m/120x0/' },
    ],
  },
]

export const services = {
  headline: 'Agent setups built around you',
  body: 'We design and deploy AI agent systems tailored to how you work. Each setup is configured, tested, and refined until it earns a permanent place in your life.',
  pillars: [
    {
      title: 'professionalAgent',
      description: 'An AI agent built for work — handles research, drafting, scheduling, and admin so you focus on what moves the needle.',
      icon: 'https://significa.co/_app/immutable/assets/strategy.e14d50fc.webp',
      image: 'https://a.storyblok.com/f/198185/3200x2400/5e415e8ae5/ck_3.webp/m/1200x900/',
    },
    {
      title: 'personalAgent',
      description: 'Manages your calendar, tracks goals, surfaces what needs attention, and handles the friction of daily life.',
      icon: 'https://significa.co/_app/immutable/assets/design.e8a886bb.webp',
      image: 'https://a.storyblok.com/f/198185/1600x1200/d6164a5867/mishmash3.jpg/m/1200x900/',
    },
    {
      title: 'builderAgent',
      description: 'For those who want to go deeper. A customizable agent stack you can extend, chain, and automate on your own terms.',
      icon: 'https://significa.co/_app/immutable/assets/dev.c2a02856.webp',
      image: 'https://a.storyblok.com/f/198185/3840x3840/18f579a475/diathumb.jpeg/m/1200x900/',
    },
  ],
}

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

export type BlogArticle = {
  title: string
  date: string
  author?: string
  readTime: string
  tags: string[]
  href: string
}

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
      title: 'What can\'t AI do for your business?',
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

export const careers = {
  headline: 'Join us',
  listings: [
    { title: 'Product Designer', type: 'Full-time', href: 'mailto:hello@anima.studio?subject=Product Designer Application' },
  ],
}

export type Client = {
  name: string
  logoDark: string
  logoLight: string
}

export const clients: Client[] = [
  { name: 'FCP', logoDark: 'https://a.storyblok.com/f/198185/326x84/3a6318eff4/dark-fcp-final.png/m/0x0/', logoLight: 'https://a.storyblok.com/f/198185/326x84/fafe7547ba/light-fcp-final.png/m/0x0/' },
  { name: 'Emma', logoDark: 'https://a.storyblok.com/f/198185/1662x434/236b3b709a/emma-dark.png/m/0x0/', logoLight: 'https://a.storyblok.com/f/198185/1662x520/a25d1bd00c/emma-light.png/m/0x0/' },
  { name: 'TFP', logoDark: 'https://a.storyblok.com/f/198185/1528x520/0b12947dc8/tfp-dark.png/m/0x0/', logoLight: 'https://a.storyblok.com/f/198185/1528x520/94195c7875/tfp-light.png/m/0x0/' },
  { name: 'HeyHarper', logoDark: 'https://a.storyblok.com/f/198185/1980x520/eadca83872/heyharper-dark.png/m/0x0/', logoLight: 'https://a.storyblok.com/f/198185/1980x520/c27ec6fd0d/heyharper-light.png/m/0x0/' },
  { name: 'allO', logoDark: 'https://a.storyblok.com/f/198185/928x520/a63160331b/allo-dark.png/m/0x0/', logoLight: 'https://a.storyblok.com/f/198185/928x520/efbbe25cf4/allo-light.png/m/0x0/' },
  { name: 'mishmash', logoDark: 'https://a.storyblok.com/f/198185/1054x281/44144e3c56/mishmash_darkmode.png/m/0x0/', logoLight: 'https://a.storyblok.com/f/198185/1055x282/e097310607/mishmash_lightmode.png/m/0x0/' },
]

export type Certification = {
  label: string
  logoDark: string
  logoLight: string
}

export const certifications: Certification[] = [
  { label: 'B Corp', logoDark: 'https://a.storyblok.com/f/198185/404x680/b77b94a30a/b-corp-logo-white-rgb.png/m/0x720/', logoLight: 'https://a.storyblok.com/f/198185/404x680/e3efce130a/b-corp-logo-black-rgb.png/m/0x720/' },
  { label: '1% for the Planet', logoDark: 'https://a.storyblok.com/f/198185/4500x1917/5f84503c4b/1ftp_environmentalpartner_horizontal_white.png/m/0x720/', logoLight: 'https://a.storyblok.com/f/198185/4500x1917/25ba10c855/1ftp_environmentalpartner_horizontal_black.png/m/0x720/' },
  { label: 'Seloid', logoDark: 'https://a.storyblok.com/f/198185/280x280/77ce0ae5bf/seloid_darkmode.png/m/0x720/', logoLight: 'https://a.storyblok.com/f/198185/280x280/969ac18d84/seloid_lightmode.png/m/0x720/' },
]

export const footer = {
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'Work', href: '#work' },
        { label: 'Services', href: '#services' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'How it works', href: '#' },
        { label: 'Mission and values', href: '#' },
        { label: 'Culture', href: '#' },
        { label: 'How we collaborate', href: '#' },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'X', href: '#' },
        { label: 'LinkedIn', href: '#' },
        { label: 'GitHub', href: '#' },
        { label: 'YouTube', href: '#' },
      ],
    },
  ],
  legal: '© 2026 Anima. All rights reserved.',
}

export type FAQItem = {
  question: string
  answer: string
}

export const faq: FAQItem[] = [
  {
    question: "What's the difference between the three products?",
    answer: 'professionalAgent is for workplace productivity; personalAgent handles personal life and goals; builderAgent is for people who want to customize and extend. Most clients start with one and end up loving all three.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Most setups are live within 1–2 weeks. We configure, test, and refine with you before handover.',
  },
  {
    question: 'Do I need any technical knowledge?',
    answer: 'No. professionalAgent and personalAgent require nothing technical. builderAgent is designed for people who want to go deeper, but we guide you through it.',
  },
  {
    question: 'What tools do the agents work with?',
    answer: 'We configure agents around your existing stack: calendar, email, Notion, Slack, and more. We map your tools in the first session.',
  },
  {
    question: 'What happens after setup?',
    answer: 'We monitor, tweak, and improve your setup over time. Monthly retainers are available if your needs grow.',
  },
  {
    question: 'What does it cost?',
    answer: "Pricing depends on the product and scope. Book a call and we'll give you a clear picture within 24 hours.",
  },
]
