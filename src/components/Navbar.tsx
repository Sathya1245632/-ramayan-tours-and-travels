'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tours/rameshwaram', label: 'Rameshwaram Special' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/ai-planner', label: '✨ AI Planner' },
    { href: '/blog', label: 'Blog' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-gray-950/95 backdrop-blur-xl shadow-lg shadow-saffron-500/10 border-b border-orange-500/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg border-2 border-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300">
                            <Image
                                src="/images/logo-gold.jpg"
                                alt="Ramayan Tours & Travels"
                                width={48}
                                height={48}
                                className="object-cover scale-110"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-white font-bold text-xl leading-none font-poppins tracking-tight group-hover:text-orange-400 transition-colors">
                                Ramayan
                            </div>
                            <div className="text-orange-400 text-[10px] font-bold tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                TOURS & TRAVELS
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === link.href
                                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md shadow-orange-500/30'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="tel:+917639661626"
                            className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            <span>+91 7639 661 626</span>
                        </a>
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm text-white border border-white/20 rounded-full hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                        >
                            Login
                        </Link>
                        <Link
                            href="/booking"
                            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-950/98 backdrop-blur-xl border-b border-orange-500/20">
                    <div className="px-4 py-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === link.href
                                    ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-400 border border-orange-500/30'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 flex flex-col gap-3">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block text-center px-4 py-3 text-sm text-white border border-white/20 rounded-xl hover:border-orange-500/50 transition-all"
                            >
                                Login / Signup
                            </Link>
                            <Link
                                href="/booking"
                                onClick={() => setIsOpen(false)}
                                className="block text-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
