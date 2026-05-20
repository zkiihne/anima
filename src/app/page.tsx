import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Blog } from '@/components/sections/Blog'

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
      </main>
    </>
  )
}
