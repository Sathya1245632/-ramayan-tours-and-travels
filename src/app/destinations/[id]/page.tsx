'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Clock, CheckCircle, ArrowRight, Info } from 'lucide-react';
import { destinations, packages } from '@/lib/data';

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
    const dest = destinations.find((d) => d.id === params.id);
    if (!dest) notFound();

    const relatedPackages = (packages as any[]).filter((p) => p.destination === dest.name || p.destination === 'Multi-destination');

    return (
        <div className="min-h-screen bg-gray-950 pt-20">
            {/* Hero */}
            <div className="relative h-[60vh] overflow-hidden">
                <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
                    <div className="badge-saffron inline-block mb-3">{dest.category}</div>
                    <h1 className="text-5xl font-black text-white mb-2 font-poppins">{dest.name}</h1>
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-orange-400" />
                            <span>{dest.state}, India</span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-gray-900 rounded-2xl p-8 border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4">About {dest.name}</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{dest.description}</p>
                        </div>

                        {/* Highlights */}
                        <div className="bg-gray-900 rounded-2xl p-8 border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">Highlights</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {dest.highlights.map((h) => (
                                    <div key={h} className="flex items-center gap-3 text-gray-300">
                                        <CheckCircle className="w-5 h-5 text-orange-400 shrink-0" />
                                        <span>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Temples */}
                        <div className="bg-gray-900 rounded-2xl p-8 border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6">🛕 Major Temples</h2>
                            <div className="space-y-3">
                                {dest.temples.map((temple, i) => (
                                    <div key={temple} className="flex items-center gap-4 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-gray-200">{temple}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Travel Tips */}
                        <div className="bg-gray-900 rounded-2xl p-8 border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Info className="w-6 h-6 text-orange-400" />
                                Travel Tips
                            </h2>
                            <div className="space-y-3">
                                {dest.travelTips.map((tip) => (
                                    <div key={tip} className="flex items-start gap-3 text-gray-300">
                                        <span className="text-orange-400 text-lg mt-0.5">💡</span>
                                        <span>{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <div className="bg-gray-900 rounded-2xl p-6 border border-white/5 sticky top-24">
                            <h3 className="text-white font-bold text-lg mb-4">Quick Info</h3>
                            <div className="space-y-3 text-sm">

                                <div className="flex justify-between text-gray-400 py-2 border-b border-white/5">
                                    <span>Duration</span>
                                    <span className="text-white">{dest.duration}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 py-2 border-b border-white/5">
                                    <span>State</span>
                                    <span className="text-white">{dest.state}</span>
                                </div>

                            </div>
                            <Link
                                href="/ai-planner"
                                className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                            >
                                ✨ Plan with AI
                            </Link>
                        </div>

                        {/* Related Packages */}
                        <div className="bg-gray-900 rounded-2xl p-6 border border-white/5">
                            <h3 className="text-white font-bold text-lg mb-4">Tour Packages</h3>
                            <div className="space-y-3">
                                {relatedPackages.slice(0, 2).map((pkg) => (
                                    <div key={pkg.id} className="p-4 bg-gray-800 rounded-xl border border-white/5">
                                        <div className="text-white font-medium text-sm mb-1">{pkg.name}</div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-orange-400 font-bold">₹{pkg.price.toLocaleString()}</span>
                                            <Link
                                                href={`/booking?package=${pkg.id}`}
                                                className="text-xs px-3 py-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full"
                                            >
                                                Book
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
