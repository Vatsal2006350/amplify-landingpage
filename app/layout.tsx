import type { Metadata } from 'next'
import './globals.css'
import { display, mono, sans } from './fonts'
import { DocDefs } from '../components/doc/stamp'

export const metadata: Metadata = {
  title: 'Amplify | Turn your catalog into more sales',
  description: 'Better product images and ads. Marketplace-ready listings. Sales and stock insights. Amplify takes 5% of qualifying sales growth after subtracting increases in ad spend.',
  metadataBase: new URL('https://www.use-amplify.com'),
  openGraph: {
    title: 'Amplify | Turn your catalog into more sales',
    description: 'Help great products become growing businesses with better images, ads and marketplace listings.',
    url: 'https://www.use-amplify.com',
    siteName: 'Amplify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amplify | Turn your catalog into more sales',
    description: 'Amplify takes 5% of qualifying sales growth after subtracting increases in ad spend.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <DocDefs />
        {children}
      </body>
    </html>
  )
}
