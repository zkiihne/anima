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
