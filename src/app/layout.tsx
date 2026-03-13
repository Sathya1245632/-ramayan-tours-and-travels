import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainLayoutWrapper from '@/components/MainLayoutWrapper';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ramayan Tours and Travels – Best Travels in Rameshwaram | AI Pilgrimage',
    description: 'Experience the best pilgrimage tours in Rameshwaram. AI-powered planning for Ramanathaswamy Temple, Varanasi & more. Trusted #1 travel agency in Rameshwaram.',
    keywords: 'best travels in rameshwaram, rameshwaram temple tour packages, rameshwaram taxi service, local tours rameshwaram, pilgrimage tour india, rameshwaram travel agency',
    openGraph: {
        title: 'Ramayan Tours and Travels – #1 Travel Agency in Rameshwaram',
        description: 'Book your sacred journey to Rameshwaram with the experts. AI-powered customized tours.',
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
                        "@type": "LocalBusiness",
                        "name": "Ramayan Tours and Travels",
                        "description": "Top-rated travel agency in Rameshwaram specializing in AI-powered pilgrimage tours and local transport.",
                        "url": "https://ramayantoursandtravels.com",
                        "telephone": "+91 7639 661 626",
                        "priceRange": "$$",
                        "areaServed": "Rameshwaram, Tamil Nadu, India",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Agni Theertham Road",
                            "addressLocality": "Rameshwaram",
                            "addressRegion": "Tamil Nadu",
                            "postalCode": "623526",
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
                <SpeedInsights />
            </body>
        </html>
    );
}
