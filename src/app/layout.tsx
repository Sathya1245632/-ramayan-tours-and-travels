import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainLayoutWrapper from '@/components/MainLayoutWrapper';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ramayan Tours and Travels – AI-Powered Pilgrimage Travel',
    description: 'Plan your sacred journey with AI. Book pilgrimage tours to Rameshwaram, Varanasi, Tirupati, Madurai, Kanyakumari and more with Ramayan Tours and Travels.',
    keywords: 'pilgrimage tour, rameshwaram tour, varanasi tour, tirupati tour, madurai tour, spiritual travel india, AI trip planner, temple tour packages',
    openGraph: {
        title: 'Ramayan Tours and Travels – Sacred Journey Awaits',
        description: 'AI-powered pilgrimage planning for India\'s holiest destinations.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href="/images/logo-gold.jpg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TravelAgency",
                        "name": "Ramayan Tours and Travels",
                        "description": "AI-powered pilgrimage travel platform for India's holiest destinations",
                        "url": "https://ramayantoursandtravels.com",
                        "telephone": "+91 7639 661 626",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "IN"
                        }
                    })
                }} />
            </head>
            <body className={`${inter.className} bg-gray-950 text-white`}>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1F2937',
                            color: '#fff',
                            border: '1px solid rgba(255,122,0,0.3)',
                        },
                    }}
                />
                <MainLayoutWrapper>
                    {children}
                </MainLayoutWrapper>
            </body>
        </html>
    );
}
