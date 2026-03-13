'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, User, ArrowLeft, Share2, MessageCircle, Calendar } from 'lucide-react';
import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-gray-950 pt-28 pb-20">
            {/* Navigation */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
                <Link 
                    href="/blog" 
                    className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors text-sm font-medium group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to all stories
                </Link>
            </div>

            {/* Featured Image Header */}
            <div className="max-w-5xl mx-auto px-4 mb-12">
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="badge-saffron inline-block mb-4 self-start">{post.category}</div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-poppins mb-6 leading-tight max-w-4xl">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <User className="w-4 h-4 text-orange-400" />
                                <span className="font-semibold">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-400" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-orange-400">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Post Content */}
            <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="prose prose-invert prose-orange max-w-none">
                        <p className="text-xl text-gray-300 leading-relaxed mb-8 font-medium">
                            {post.excerpt}
                        </p>
                        
                        {/* Dummy detailed content - in a real app this would come from the post object */}
                        <div className="text-gray-300 space-y-6 leading-relaxed text-lg">
                            <p>
                                India is a land where spirituality is woven into the very fabric of daily life. For centuries, pilgrims have traversed the vast landscapes of this subcontinent in search of divine peace, redemption, and enlightenment.
                            </p>
                            
                            <h2 className="text-2xl font-bold text-white font-poppins mt-10 mb-4 border-l-4 border-orange-500 pl-4 bg-orange-500/5 py-2">
                                The Essence of Sacred Travel
                            </h2>
                            <p>
                                A pilgrimage is not just a physical journey; it's a transformation of the soul. From the snowy heights of the Himalayas to the tropical shores of Rameshwaram, each sacred site carries a unique vibrational frequency. At Ramayan Tours and Travels, we understand that every step you take towards the divine must be handled with care and devotion.
                            </p>

                            <Image 
                                src="https://images.unsplash.com/photo-1544735745-b89b18555f35?w=1200&q=80" 
                                alt="Temple Interior"
                                width={800}
                                height={450}
                                className="rounded-2xl border border-white/5 shadow-lg my-10"
                            />

                            <h2 className="text-2xl font-bold text-white font-poppins mt-10 mb-4 border-l-4 border-orange-500 pl-4 bg-orange-500/5 py-2">
                                Why Professional Planning Matters
                            </h2>
                            <p>
                                Traveling to ancient temple cities like Madurai or Varanasi can be overwhelming due to crowds, complex rituals, and local logistics. Using a specialized travel agency ensures that you don't miss the subtle details that make a pilgrimage truly sacred—the right aarti time, the correct sequence of theerthams, or the best place to find satvik food.
                            </p>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full text-sm hover:bg-orange-500/10 transition-colors">
                                <Share2 className="w-4 h-4 text-orange-400" /> Share
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full text-sm hover:bg-orange-500/10 transition-colors">
                                <MessageCircle className="w-4 h-4 text-orange-400" /> Comments
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-8">
                        {/* CTA Box */}
                        <div className="bg-gradient-to-br from-orange-500 to-yellow-600 p-6 rounded-2xl shadow-xl shadow-orange-500/20 text-white">
                            <h3 className="font-black text-xl mb-3 font-poppins">Ready to Visit?</h3>
                            <p className="text-sm text-white/90 mb-6 leading-relaxed">
                                Let us plan your perfect spiritual journey with AI precision.
                            </p>
                            <Link 
                                href="/booking"
                                className="block w-full text-center py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                Book Now
                            </Link>
                        </div>

                        {/* Recent Posts Mini */}
                        <div className="bg-gray-900/50 p-6 rounded-2xl border border-white/5">
                            <h3 className="text-white font-bold mb-4 font-poppins text-sm uppercase tracking-widest">Recent Stories</h3>
                            <div className="space-y-4">
                                {blogPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
                                    <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                                        <p className="text-gray-400 text-xs mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors">{p.title}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                            <span>{p.date}</span>
                                            <span>•</span>
                                            <span>{p.readTime}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
