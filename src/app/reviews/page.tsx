'use client';

import Image from 'next/image';
import { Star, MapPin, Calendar } from 'lucide-react';
import { reviews } from '@/lib/data';

export default function ReviewsPage() {
    const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* Header */}
            <div className="relative py-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5" />
                <div className="temple-pattern absolute inset-0 opacity-40" />
                <div className="relative z-10">
                    <div className="badge-saffron inline-block mb-4">⭐ Testimonials</div>
                    <h1 className="section-title gradient-text mb-4">Pilgrim Stories</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Hear from thousands of pilgrims who found their sacred connection through Ramayan Tours.
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="max-w-5xl mx-auto px-4 mb-12">
                <div className="bg-gradient-to-r from-orange-500/15 via-yellow-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-black gradient-text">{avgRating}</div>
                            <div className="flex justify-center gap-0.5 my-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <div className="text-gray-400 text-sm">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black gradient-text">50,000+</div>
                            <div className="text-gray-400 text-sm mt-2">Happy Pilgrims</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black gradient-text">98%</div>
                            <div className="text-gray-400 text-sm mt-2">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-gray-900 rounded-2xl p-6 border border-white/5 hover:border-orange-500/20 card-hover flex flex-col"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`}
                                    />
                                ))}
                                <span className="text-gray-500 text-xs ml-1">{review.date}</span>
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 italic">
                                "{review.review}"
                            </p>

                            {/* Package Badge */}
                            <div className="mb-4">
                                <span className="text-xs px-3 py-1 bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-full">
                                    📦 {review.package}
                                </span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-700 shrink-0">
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-sm">{review.name}</div>
                                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                                        <MapPin className="w-3 h-3 text-orange-400" />
                                        <span>{review.location}</span>
                                        <span className="mx-1">•</span>
                                        <span>Visited {review.destination}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write a Review CTA */}
            <div className="max-w-3xl mx-auto px-4 mt-16 text-center">
                <div className="bg-gray-900 rounded-2xl border border-orange-500/20 p-10">
                    <div className="text-4xl mb-4">✍️</div>
                    <h2 className="text-2xl font-bold text-white mb-3">Share Your Sacred Experience</h2>
                    <p className="text-gray-400 mb-6">
                        Traveled with us? We'd love to hear about your pilgrimage. Your story inspires others!
                    </p>
                    <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all">
                        Write a Review
                    </button>
                </div>
            </div>
        </div>
    );
}
