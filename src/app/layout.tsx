import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WhisperrChat - Chat in whispers, secured by the blockchain',
  description: 'Decentralized, end-to-end encrypted chat application built on blockchain technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
