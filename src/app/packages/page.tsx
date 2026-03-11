'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users, CheckCircle, Filter, ArrowRight } from 'lucide-react';
import { packages } from '@/lib/data';

const categories = ['All', 'Budget', 'Premium', 'Luxury'];

export default function PackagesPage() {
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('popular');

    const filtered = packages
        .filter((p) => category === 'All' || p.category === category)
        .sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            return b.rating - a.rating;
        });

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* Header */}
            <div className="relative py-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5" />
                <div className="temple-pattern absolute inset-0 opacity-40" />
                <div className="relative z-10">
                    <div className="badge-saffron inline-block mb-4">🎁 Tour Packages</div>
                    <h1 className="section-title gradient-text mb-4">Pilgrimage Packages</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Carefully crafted packages for every budget and devotion. Book your sacred journey today.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-900 p-4 rounded-2xl border border-white/5">
                    <div className="flex gap-2 flex-wrap">
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
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full border border-white/10 outline-none text-sm"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Packages Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 card-hover flex flex-col"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={pkg.image}
                                    alt={pkg.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                <div className="absolute top-3 left-3">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-lg ${pkg.badge === 'Best Seller' ? 'bg-orange-500 text-white' :
                                            pkg.badge === 'Premium' ? 'bg-yellow-500 text-gray-900' :
                                                pkg.badge === 'Luxury' ? 'bg-purple-500 text-white' :
                                                    pkg.badge === 'New' ? 'bg-blue-500 text-white' :
                                                        'bg-green-500 text-white'
                                        }`}>
                                        {pkg.badge}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-xs font-semibold">{pkg.rating}</span>
                                        <span className="text-gray-300 text-xs">({pkg.reviews})</span>
                                    </div>
                                    <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <span className={`text-xs font-semibold ${pkg.category === 'Budget' ? 'text-green-400' :
                                                pkg.category === 'Premium' ? 'text-yellow-400' :
                                                    'text-purple-400'
                                            }`}>{pkg.hotelType}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <h2 className="text-white font-bold text-xl font-poppins mb-2">{pkg.name}</h2>
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{pkg.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{pkg.groupSize}</span>
                                    </div>
                                </div>

                                {/* Inclusions */}
                                <div className="mb-4 flex-1">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Inclusions</div>
                                    <div className="space-y-1.5">
                                        {pkg.inclusions.slice(0, 4).map((inc) => (
                                            <div key={inc} className="flex items-center gap-2 text-gray-300 text-sm">
                                                <CheckCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                                <span>{inc}</span>
                                            </div>
                                        ))}
                                        {pkg.inclusions.length > 4 && (
                                            <div className="text-gray-500 text-xs pl-5">+{pkg.inclusions.length - 4} more inclusions</div>
                                        )}
                                    </div>
                                </div>

                                {/* Transport */}
                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                                    <span className="text-lg">🚌</span>
                                    <span>Transport: {pkg.transport}</span>
                                </div>

                                {/* Price + Book */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                    <div>
                                        <div className="text-gray-500 text-xs line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                                        <div className="text-white font-bold text-2xl">
                                            ₹{pkg.price.toLocaleString()}
                                        </div>
                                        <div className="text-green-400 text-xs font-medium">
                                            Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href={`/booking?package=${pkg.id}`}
                                            className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all text-center"
                                        >
                                            Book Now
                                        </Link>
                                        <button className="text-xs text-orange-400 text-center hover:underline">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
