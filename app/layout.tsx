import type { Metadata } from 'next'
import './globals.css'
import { display, mono, sans } from './fonts'
import { DocDefs } from '../components/doc/stamp'

export const metadata: Metadata = {
  title: 'Amplify | Turn your catalog into more sales',
  description: 'Better product images and ads. Marketplace-ready listings. Sales and stock insights. Pay only when sales increase under an agreed growth pilot.',
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
    description: 'No setup fee or monthly platform fee. Pay 5% of qualifying sales growth above an agreed baseline.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <DocDefs />
        {children}
      </body>
    </html>
  )
}
