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
  title: 'Amplify | AI Operations Manager for E-Commerce',
  description: 'Sync product catalogs across Uber Eats, Shopify, Amazon, and 20+ marketplaces. Edit once, update everywhere. Reduce returns by 30% with AI-powered listing fixes.',
  metadataBase: new URL('https://www.use-amplify.com'),
  openGraph: {
    title: 'Amplify | AI Product Manager for E-Commerce',
    description: 'Sync product catalogs across Uber Eats, Shopify, Amazon, and 20+ marketplaces. Edit once, update everywhere.',
    url: 'https://www.use-amplify.com',
    siteName: 'Amplify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amplify | AI Product Manager for E-Commerce',
    description: 'Sync product catalogs across Uber Eats, Shopify, Amazon, and 20+ marketplaces. Edit once, update everywhere.',
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
