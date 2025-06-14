import type { Metadata } from 'next'
import './globals.css'
import { CivicAuthProvider } from "@civic/auth/nextjs"

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
        <CivicAuthProvider>
          {children}
        </CivicAuthProvider>
      </body>
    </html>
  )
}
