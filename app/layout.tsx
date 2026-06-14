import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@/components/about/Analytics'
import './globals.css'
import { NavbarDemo } from '@/components/navBar'
import { ThemeProvider } from '@/components/provedor-de-tema'
import Footer from '@/components/footer'
import { TooltipProvider } from '@/components/ui/tooltip'

const _roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Paulo Victor | Desenvolvedor Full-Stack',
  description: 'Desenvolvedor Full-Stack focado em criar experiencias digitais modernas, performaticas e escalaveis.',
  generator: 'Paulo Victor',
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
  themeColor: '#1e202e',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased">
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
            {children}
          </TooltipProvider>
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
