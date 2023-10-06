import './globals.css'
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider as ReduxProvider } from './redux/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shots | Alion Interview',
  description: 'A short video player like tiktok',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          {children}
        </body>
      </ReduxProvider>
    </html>
  )
}
