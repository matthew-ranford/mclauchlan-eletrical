import type { Metadata } from 'next'
import { signika } from '@/fonts'
import './globals.css'

// Navbar toggle
import '../node_modules/hamburgers/dist/hamburgers.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title:
    'McLauchlan Electrical | Residential, Commercial, Marine, & Industrial',
  description: 'Electrical Services for the Wellington Region',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="images/shortcut-icon.png"
        />
      </head>
      <body className={signika.className}>
        <div className="main-background-colour">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
