import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Sreyas | Magento 2 Expert & Full-Stack Developer',
    template: '%s | Sreyas Portfolio',
  },
  description:
    'Magento 2 certified developer specializing in e-commerce, custom extensions, and performance optimization. Explore my portfolio, tutorials, and free resources.',
  keywords: [
    'Magento 2', 'Adobe Commerce', 'PHP', 'Laravel', 'Full Stack Developer',
    'E-commerce', 'Magento Extensions', 'Magento Certification',
  ],
  authors: [{ name: 'Sreyas' }],
  creator: 'Sreyas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sreyas Portfolio',
    title: 'Sreyas | Magento 2 Expert',
    description: 'Magento 2 certified developer. Extensions, tutorials & resources.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sreyas | Magento 2 Expert',
    description: 'Magento 2 certified developer. Extensions, tutorials & resources.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body className="bg-dark-900 text-white antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
