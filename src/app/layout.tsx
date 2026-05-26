import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: "Anima — The best employee you'll ever hire.",
  description: 'AI agents built around how you work. Shows up every day, never burns out, handles the work you keep putting off.',
  openGraph: {
    title: "Anima — The best employee you'll ever hire.",
    description: 'AI agents built around how you work. Shows up every day, never burns out, handles the work you keep putting off.',
    type: 'website',
    url: 'https://anima-ten-theta.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Anima — The best employee you'll ever hire.",
    description: 'AI agents built around how you work. Shows up every day, never burns out, handles the work you keep putting off.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  )
}
