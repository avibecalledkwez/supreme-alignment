import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Supreme Alignment',
  description: 'Planetary Hours × Personal Numerology — Find your alignment windows.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
