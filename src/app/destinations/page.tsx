'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Star, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';
import { destinations } from '@/lib/data';

const categories = ['All', 'Divine', 'Heritage', 'Spiritual'];

export default function DestinationsPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = destinations.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.state.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || d.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* Header */}
            <div className="relative py-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5" />
                <div className="temple-pattern absolute inset-0 opacity-40" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="badge-saffron inline-block mb-4">🗺️ Explore India</div>
                    <h1 className="section-title gradient-text mb-4">Sacred Destinations</h1>
                    <p className="text-gray-400 text-lg">
                        Discover India's most revered pilgrimage sites — where spirituality meets timeless beauty.
                    </p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search destinations or states..."
                            className="input-sacred pl-12"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat
                                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="max-w-7xl mx-auto px-4">
                {filtered.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <div className="text-4xl mb-4">🔍</div>
                        <p>No destinations found. Try a different search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((dest) => (
                            <Link
                                key={dest.id}
                                href={`/destinations/${dest.id}`}
                                className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 card-hover"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="badge-saffron text-xs">{dest.category}</span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-xs font-semibold">{dest.rating}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h2 className="text-white font-bold text-xl font-poppins mb-1">{dest.name}</h2>
                                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{dest.state}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {dest.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {dest.highlights.slice(0, 3).map((h) => (
                                            <span key={h} className="text-xs px-2 py-1 bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-full">
                                                {h}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div>
                                            <div className="text-gray-500 text-xs flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {dest.bestTime}
                                            </div>
                                            <div className="text-white font-bold mt-0.5">From ₹{dest.price.toLocaleString()}</div>
                                        </div>
                                        <span className="flex items-center gap-1 text-orange-400 text-sm group-hover:gap-2 transition-all">
                                            Explore <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
