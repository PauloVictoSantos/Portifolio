import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@/components/about/Analytics'
import './globals.css'
import { NavbarDemo } from '@/components/navBar'
import { ThemeProvider } from '@/components/provedor-de-tema'
import Footer from '@/components/footer'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AccentProvider } from "@/contexts/AccentContext";

const _roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

// TODO: troque pelo domínio real (e configure NEXT_PUBLIC_SITE_URL no .env / Vercel)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://paulovictor.dev'
const SITE_NAME = 'Paulo Victor — Desenvolvedor Front-End'
const TITLE = 'Paulo Victor | Desenvolvedor Front-End'
const DESCRIPTION =
  'Desenvolvedor Front-End focado em criar experiências digitais modernas, performáticas e escaláveis. Confira projetos, stack e formas de contato.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Paulo Victor',
  },
  description: DESCRIPTION,
  keywords: [
    'Paulo Victor',
    'desenvolvedor front-End',
    'desenvolvedor frontend',
    'desenvolvedor React',
    'desenvolvedor Next.js',
    'TypeScript',
    'portfolio desenvolvedor',
    'desenvolvimento web',
  ],
  authors: [{ name: 'Paulo Victor', url: SITE_URL }],
  creator: 'Paulo Victor',
  publisher: 'Paulo Victor',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/Paulo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Paulo Victor — Desenvolvedor Front-End',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/Paulo.jpeg'],
    // creator: '@seu_usuario', // descomente e preencha se tiver Twitter/X
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e202e',
  userScalable: true,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Paulo Victor',
  url: SITE_URL,
  image: `${SITE_URL}/Paulo.jpeg`,
  jobTitle: 'Desenvolvedor Front-End',
  description: DESCRIPTION,
  sameAs: [
    // 'https://github.com/seu_usuario',
    // 'https://www.linkedin.com/in/seu_usuario',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed top-0 left-0 right-0 z-50">
            <NavbarDemo />
          </div>
          <TooltipProvider>
            <AccentProvider>
              {children}
            </AccentProvider>
          </TooltipProvider>
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}