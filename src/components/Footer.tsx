'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-white/10 pt-20 pb-8">
            {/* Sacred pattern overlay */}
            <div className="temple-pattern absolute inset-0 pointer-events-none opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group cursor-pointer inline-flex">
                            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-orange-500/50 transition-all duration-300">
                                <Image
                                    src="/images/logo-gold.jpg"
                                    alt="Ramayan Tours & Travels"
                                    width={56}
                                    height={56}
                                    className="object-cover scale-110"
                                />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xl font-poppins tracking-tight group-hover:text-orange-400 transition-colors">Ramayan</div>
                                <div className="text-orange-400 text-[10px] font-bold tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity uppercase">TOURS & TRAVELS</div>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            India's most trusted AI-powered pilgrimage travel platform. We craft sacred journeys that connect you to the divine.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                                { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                                { icon: Youtube, href: '#', color: 'hover:text-red-400' },
                                { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                            ].map(({ icon: Icon, href, color }) => (
                                <a
                                    key={href}
                                    href={href}
                                    className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 ${color} border border-white/10 hover:border-orange-500/30 transition-all hover:bg-white/10`}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500" />
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/destinations', label: 'Destinations' },
                                { href: '/packages', label: 'Tour Packages' },
                                { href: '/ai-planner', label: 'AI Trip Planner' },
                                { href: '/blog', label: 'Travel Blog' },
                                { href: '/reviews', label: 'Customer Reviews' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular Destinations */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500" />
                            Destinations
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { href: '/destinations/rameshwaram', label: 'Rameshwaram' },
                                { href: '/destinations/madurai', label: 'Madurai' },
                                { href: '/destinations/tirupati', label: 'Tirupati' },
                                { href: '/destinations/kanyakumari', label: 'Kanyakumari' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-6 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500" />
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-white text-sm">+91 7639 661 626</div>
                                    <div className="text-gray-400 text-xs">Mon–Sat, 9AM–8PM</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-white text-sm">Ramayantoursandtravels@gmail.com</div>
                                    <div className="text-gray-400 text-xs">24/7 support</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-white text-sm">Chennai, Tamil Nadu, India</div>
                                    <div className="text-gray-400 text-xs">Headquarters</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center">
                        © 2025 Ramayan Tours and Travels. All rights reserved. Made with ❤️ in India.
                    </p>
                    <div className="flex gap-6">
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-gray-500 hover:text-orange-400 text-sm transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
