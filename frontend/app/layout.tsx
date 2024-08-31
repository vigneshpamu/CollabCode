import { ThemeProvider } from '@/components/layout/themeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Collaborative Cloud Code Editor',
  description: 'Collaborative Cloud Code Editor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <Toaster position="bottom-left" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
