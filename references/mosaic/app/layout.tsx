import './css/style.css'

import { Inter } from 'next/font/google'
import { ThemeProvider, AppProvider, SWRProvider } from '@/lib/providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Mindtris - Enterprise Dashboard',
  description: 'Modern enterprise dashboard built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body className="font-inter antialiased bg-background text-foreground">
        <ThemeProvider>
          <SWRProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
