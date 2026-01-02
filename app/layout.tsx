import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'বাংলাদেশী শীতের সকাল - Bangladeshi Winter Morning',
  description: 'Professional AI-generated video of a Bangladeshi village winter morning with date palm sap collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}
