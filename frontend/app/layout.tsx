import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Youth Opportunity Ecosystem - Révélez votre potentiel',
  description: 'Une plateforme numérique pour découvrir votre potentiel, développer vos compétences et saisir des opportunités.',
  keywords: 'jeunesse, haïti, emploi, formation, mentorat, entrepreneuriat, opportunités',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
