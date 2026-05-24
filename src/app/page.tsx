import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/sections/Hero'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { Services } from '@/components/sections/Services'
import { Blog } from '@/components/sections/Blog'
import { Clients } from '@/components/sections/Clients'
import { Contact } from '@/components/sections/Contact'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-[1440px]">
        <Hero />
        <SelectedWork />
        <Services />
        <Blog />
        <Clients />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
