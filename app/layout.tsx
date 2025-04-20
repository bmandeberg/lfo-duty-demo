import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LFO Duty Demo',
  description: 'Demonstration of triangle and square wave LFO with duty cycle modulation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
