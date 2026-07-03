import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Amplify | AI Workspace for Brand Operators',
  description: 'Run listing automation, company brain analysis, inventory forecasts, purchase orders, sales actions, and marketplace approvals from one AI workspace.',
  metadataBase: new URL('https://www.use-amplify.com'),
  openGraph: {
    title: 'Amplify | AI Workspace for Brand Operators',
    description: 'One workspace for listing automation, company brain analysis, forecasts, purchase orders, sales actions, and approvals.',
    url: 'https://www.use-amplify.com',
    siteName: 'Amplify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amplify | AI Workspace for Brand Operators',
    description: 'Keep the commerce stack you already run, and make weekly catalog, sales, inventory, and PO work cleaner.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
