'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Users, MapPin } from 'lucide-react';
import { taxiPackages } from '@/lib/data';

export default function PackagesPage() {
    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* ─── TAXI PACKAGES SECTION ─────────────────────────── */}
            <section className="py-20 px-4 bg-gray-900/50 mt-20 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="badge-saffron inline-block mb-4">🚕 Reliable Transport</div>
                        <h2 className="section-title gradient-text mb-4">Recommended Taxi Packages</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Comfortable and reliable taxi services for your pilgrimage and sightseeing needs across South India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {taxiPackages.map((taxi) => (
                            <div
                                key={taxi.id}
                                className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 card-hover flex flex-col h-full"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={taxi.image}
                                        alt={taxi.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-500 text-white rounded-full uppercase tracking-wider shadow-lg">
                                            {taxi.duration}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-white font-bold text-base font-poppins mb-3 italic">
                                        {taxi.name}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                            <span>Pickup: <span className="text-gray-300">{taxi.pickup}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Users className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                            <span>{taxi.perPerson}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex flex-col gap-3 mt-auto">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-gray-500 text-[10px] uppercase tracking-wider">Starting From</span>
                                            <span className="text-orange-400 font-bold text-lg">{taxi.price}</span>
                                        </div>
                                        <Link
                                            href={`/packages/${taxi.id}`}
                                            className="w-full text-center py-2.5 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 hover:border-transparent transition-all"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
