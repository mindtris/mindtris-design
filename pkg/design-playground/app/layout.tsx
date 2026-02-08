import './globals.css'

import type { Metadata } from 'next'
import React, { Suspense } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@mindtris/ui'
import PlaygroundShell from './playground-shell'
import PlaygroundToaster from './playground-toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Design Playground',
  description: 'Design system playground',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

