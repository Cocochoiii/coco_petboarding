import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

export const metadata: Metadata = {
    title: "Coco's Pet Paradise - Luxury Home Pet Boarding in Boston",
    description: 'Premium home-style pet boarding in Wellesley Hills. 24/7 care for 13 cats and 8 dogs. Serving Greater Boston within 50 miles.',
    keywords: 'pet boarding, dog boarding, cat boarding, Boston, Wellesley Hills, luxury pet care',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <Navigation />
        <main className="min-h-screen">
            {children}
        </main>
        <Footer />
        <ChatWidget />
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '12px',
                },
            }}
        />
        </body>
        </html>
    )
}