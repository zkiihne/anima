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
