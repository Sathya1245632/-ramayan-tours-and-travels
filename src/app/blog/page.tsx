'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, Tag, ArrowRight, Search } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { useState } from 'react';

const categories = ['All', 'Temple Guide', 'Travel Guide', 'Technology'];

export default function BlogPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = blogPosts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'All' || p.category === category;
        return matchSearch && matchCat;
    });

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* Header */}
            <div className="relative py-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5" />
                <div className="temple-pattern absolute inset-0 opacity-40" />
                <div className="relative z-10">
                    <div className="badge-saffron inline-block mb-4">📖 Travel Blog</div>
                    <h1 className="section-title gradient-text mb-4">Sacred Stories & Guides</h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Expert insights, temple guides, and traveler stories to inspire your next pilgrimage.
                    </p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="max-w-7xl mx-auto px-4 mb-10">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search articles..."
                            className="input-sacred pl-12"
                        />
                    </div>
                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat
                                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Post */}
            {filtered.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <Link href={`/blog/${filtered[0].slug}`}>
                        <div className="group relative rounded-2xl overflow-hidden h-80 card-hover cursor-pointer border border-white/5 shadow-2xl">
                            <Image
                                src={filtered[0].image}
                                alt={filtered[0].title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent" />
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="badge-saffron inline-block mb-3 self-start">{filtered[0].category}</div>
                                <h2 className="text-white font-black text-2xl md:text-3xl font-poppins mb-3 max-w-xl group-hover:text-orange-400 transition-colors">
                                    {filtered[0].title}
                                </h2>
                                <p className="text-gray-300 mb-4 max-w-xl line-clamp-2">{filtered[0].excerpt}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <User className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{filtered[0].author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{filtered[0].readTime}</span>
                                    </div>
                                    <span>{filtered[0].date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.slice(1).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 card-hover group shadow-xl"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="badge-saffron text-xs">{post.category}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-white font-bold text-lg font-poppins mb-3 line-clamp-2 group-hover:text-orange-400 transition-colors">{post.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <span className="text-orange-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Read <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
