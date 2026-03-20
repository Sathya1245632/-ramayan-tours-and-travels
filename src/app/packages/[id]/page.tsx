'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
    MapPin, 
    Clock, 
    Users, 
    ChevronRight, 
    CheckCircle2, 
    AlertCircle, 
    Calendar,
    ArrowLeft,
    Navigation2
} from 'lucide-react';
import { taxiPackages } from '@/lib/data';

export default function PackageDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const pkg = taxiPackages.find(p => p.id === id);

    if (!pkg) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl text-white font-bold mb-4">Package Not Found</h1>
                <Link href="/packages" className="text-orange-500 hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Packages
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 selection:bg-orange-500/30">
            {/* ─── HERO SECTION ─────────────────────────── */}
            <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden">
                <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end pb-12 px-4">
                    <div className="max-w-7xl mx-auto w-full">
                        <Link 
                            href="/packages" 
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium tracking-wide border-b border-transparent hover:border-white/30">Explore Packages</span>
                        </Link>
                        
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
                                {pkg.duration}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                {pkg.perPerson}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-cinzel tracking-tight uppercase max-w-4xl leading-tight">
                            {pkg.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 py-6 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-gray-900 border border-white/5">
                                    <MapPin className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pickup Location</p>
                                    <p className="text-white font-semibold">{pkg.pickup}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-gray-900 border border-white/5">
                                    <Calendar className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Starting From</p>
                                    <p className="text-white font-bold text-xl">{pkg.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── CONTENT SECTION ─────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Main Details */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* Itinerary Section */}
                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-8 bg-orange-500 rounded-full" />
                                    <h2 className="text-3xl font-bold font-cinzel text-white tracking-tight uppercase">Itinerary Details</h2>
                                </div>
                                
                                <div className="space-y-10 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-orange-500/50 before:via-white/5 before:to-transparent">
                                    {pkg.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative pl-16 group">
                                            {/* Step Circle */}
                                            <div className="absolute left-0 top-1 w-12 h-12 rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center z-10 group-hover:border-orange-500 transition-colors shadow-2xl">
                                                <span className="text-orange-500 font-bold font-outfit">0{item.day}</span>
                                            </div>
                                            
                                            <div className="bg-gray-900/50 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all shadow-xl backdrop-blur-sm">
                                                <h3 className="text-xl font-bold text-white mb-4 font-outfit uppercase tracking-wide">Day {item.day}: {item.title}</h3>
                                                <p className="text-gray-400 leading-relaxed mb-8">
                                                    {item.description}
                                                </p>
                                                
                                                {item.places && (
                                                    <div className="space-y-4">
                                                        <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2">
                                                            <MapPin className="w-3.5 h-3.5" /> Major Sightseeing Places:
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.places.map((place, pIdx) => (
                                                                <span key={pIdx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                                                                    {place}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {item.dropoff && (
                                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-sm text-orange-300 font-medium italic">
                                                        <Navigation2 className="w-4 h-4 rotate-90" />
                                                        {item.dropoff}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* If no specific itinerary provided yet for other packages */}
                        {(!pkg.itinerary || pkg.itinerary.length === 0) && (
                            <section className="bg-gray-900/40 border border-dashed border-white/10 rounded-3xl p-12 text-center">
                                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Detailed Itinerary Coming Soon</h3>
                                <p className="text-gray-500">We are currently updating the detailed day-by-day plan for this package. Please contact us for a customized plan.</p>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Inclusions Card */}
                        <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
                            
                            <h3 className="text-xl font-bold text-white mb-6 font-cinzel flex items-center gap-2 tracking-tight">
                                <CheckCircle2 className="w-6 h-6 text-orange-500" />
                                INCLUSIONS
                            </h3>
                            
                            <ul className="space-y-4">
                                {(pkg.inclusions && pkg.inclusions.length > 0 ? pkg.inclusions : ['Fuel', 'Driver Allowance', 'Toll & Parking']).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group/item">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-orange-500/10 flex items-center justify-center group-hover/item:bg-orange-500 transition-colors">
                                            <ChevronRight className="w-3 h-3 text-orange-500 group-hover/item:text-white transition-colors" />
                                        </div>
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Important Note Card */}
                        {pkg.notes && (
                            <div className="bg-red-950/20 border border-red-500/20 rounded-3xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4">
                                    <AlertCircle className="w-6 h-6 text-red-500/40" />
                                </div>
                                <h3 className="text-sm font-bold text-red-400 mb-3 uppercase tracking-widest">Important Note</h3>
                                <p className="text-red-200/80 text-sm leading-relaxed">
                                    {pkg.notes}
                                </p>
                            </div>
                        )}

                        {/* Call to Action Card */}
                        <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-8 shadow-2xl shadow-orange-500/10 hover:scale-[1.02] transition-transform duration-500">
                            <h3 className="text-2xl font-bold text-gray-950 mb-4 font-cinzel tracking-tight uppercase">Ready to Embark?</h3>
                            <p className="text-gray-900/70 font-medium mb-8">
                                Secure your trip effortlessly. We handle the logistics while you focus on the divine experience.
                            </p>
                            <Link 
                                href={`/booking?type=taxi&package=${pkg.id}`}
                                className="block w-full text-center py-4 bg-gray-950 text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-xl"
                            >
                                Book This Trip Now
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
