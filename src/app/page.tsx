'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Star, ArrowRight, MapPin, Clock, Users, ChevronRight, Sparkles, Shield, Phone, Car } from 'lucide-react';
import { destinations, packages, reviews, stats, taxiPackages } from '@/lib/data';

const heroSlides = [
    {
        title: 'Rameshwaram',
        subtitle: 'Sacred Island of Ramanathaswamy',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=90',
    },
    {
        title: 'Varanasi',
        subtitle: 'The Eternal City of Shiva',
        image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=1920&q=90',
    },
    {
        title: 'Madurai',
        subtitle: 'City of Meenakshi Temple',
        image: '/images/madurai.jpg',
    },
];

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            window.location.href = `/ai-planner?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <div className="min-h-screen bg-gray-950">
            {/* ─── HERO SECTION ─────────────────────────────── */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=90')`,
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-950/75 to-orange-950/40" />

                {/* Sacred pattern */}
                <div className="absolute inset-0 temple-pattern opacity-30" />

                {/* Floating Om symbols */}
                <div className="absolute top-32 right-16 text-6xl opacity-10 animate-float om-glow select-none">🕉️</div>
                <div className="absolute bottom-40 left-12 text-4xl opacity-10 animate-float select-none" style={{ animationDelay: '2s' }}>🪔</div>
                <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-float select-none" style={{ animationDelay: '1s' }}>✨</div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/15 border border-orange-500/30 rounded-full text-orange-300 text-sm font-medium mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Pilgrimage Planning</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] font-poppins">
                        Plan Your Sacred Journey{' '}
                        <span className="gradient-text">with AI</span>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
                        Smart pilgrimage planning for India's holiest destinations. From Varanasi to Rameshwaram — crafted with devotion, powered by AI.
                    </p>

                    {/* AI Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-gray-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 hover:border-orange-500/40 transition-all shadow-2xl shadow-black/50 overflow-hidden">
                            <div className="relative flex-1 flex items-center">
                                <Search className="absolute left-5 w-5 h-5 text-orange-400 shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder='Try: "4 day trip to Rameshwaram"'
                                    className="w-full bg-transparent text-white pl-14 pr-4 py-5 text-base outline-none placeholder:text-gray-500"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="m-2 sm:m-2 px-6 py-4 sm:py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/40 transition-all whitespace-nowrap"
                            >
                                <span className="sm:hidden">Generate Trip</span>
                                <span className="hidden sm:inline">✨ Generate My Trip</span>
                            </button>
                        </div>

                        {/* Quick suggestions */}
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {[
                                '🛕 Varanasi',
                                '🌊 Rameshwaram',
                                '✈️ South Circuit',
                                '🏛️ Madurai',
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setSearchQuery(suggestion.replace(/^[^\s]+ /, ''))}
                                    className="px-4 py-2 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-full hover:border-orange-500/40 hover:text-orange-300 transition-all"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mt-10">
                        {[
                            { icon: '⭐', text: '4.9/5 from 50,000+ pilgrims' },
                            { icon: '🛡️', text: '100% Secure Booking' },
                            { icon: '📞', text: '24/7 Pilgrim Support' },
                        ].map(({ icon, text }) => (
                            <div key={text} className="flex items-center gap-2">
                                <span>{icon}</span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs animate-bounce">
                    <span>Scroll to explore</span>
                    <div className="w-px h-8 bg-gradient-to-b from-orange-500 to-transparent" />
                </div>
            </section>

            {/* ─── STATS SECTION ─────────────────────────────── */}
            <section className="py-16 bg-gradient-to-r from-orange-500/10 via-yellow-500/5 to-orange-500/10 border-y border-orange-500/20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map(({ label, value, suffix }) => (
                            <div key={label} className="text-center">
                                <div className="text-4xl font-black gradient-text mb-1">
                                    {value.toLocaleString()}{suffix}
                                </div>
                                <div className="text-gray-400 text-sm">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── DESTINATIONS ─────────────────────────────── */}
            <section className="py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="badge-saffron inline-block mb-4">🗺️ Sacred Destinations</div>
                        <h2 className="section-title gradient-text mb-4">Explore Holy Sites</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            From the shores of Rameshwaram to the ghats of Varanasi — discover India's most divine pilgrimage destinations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {destinations.slice(0, 6).map((dest) => (
                            <Link
                                key={dest.id}
                                href={`/destinations/${dest.id}`}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-hover cursor-pointer"
                            >
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-transparent" />

                                <div className="absolute top-4 left-4">
                                    <span className="badge-saffron text-xs">{dest.category}</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                                        <span className="font-semibold">{dest.rating}</span>
                                        <span className="text-gray-400">({dest.reviews.toLocaleString()})</span>
                                    </div>
                                    <h3 className="text-white font-bold text-xl font-poppins">{dest.name}</h3>
                                    <div className="flex items-center gap-1 text-gray-300 text-sm mt-1">
                                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{dest.state}</span>
                                        <span className="mx-2 text-gray-600">•</span>
                                        <Clock className="w-3.5 h-3.5 text-orange-400" />
                                        <span>{dest.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <span className="text-orange-400 font-bold">From ₹{dest.price.toLocaleString()}</span>
                                        <span className="text-gray-400 group-hover:text-orange-400 transition-colors flex items-center gap-1 text-sm">
                                            Explore <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/destinations"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-orange-500/40 text-orange-400 rounded-full hover:bg-orange-500/10 hover:border-orange-500 transition-all font-medium"
                        >
                            View All Destinations
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── PACKAGES SECTION ─────────────────────────── */}
            <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="badge-saffron inline-block mb-4">🎁 Tour Packages</div>
                        <h2 className="section-title gradient-text mb-4">Curated Pilgrimage Packages</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Handcrafted tour packages combining spiritual depth with modern comfort — from budget to luxury.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {packages.slice(0, 3).map((pkg) => (
                            <div
                                key={pkg.id}
                                className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 card-hover"
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
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${pkg.badge === 'Best Seller' ? 'bg-orange-500 text-white' :
                                            pkg.badge === 'Premium' ? 'bg-yellow-500 text-gray-900' :
                                                pkg.badge === 'Luxury' ? 'bg-purple-500 text-white' :
                                                    'bg-green-500 text-white'
                                            }`}>
                                            {pkg.badge}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-xs font-semibold">{pkg.rating}</span>
                                        <span className="text-gray-300 text-xs">({pkg.reviews})</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-white font-bold text-lg font-poppins mb-2">{pkg.name}</h3>

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

                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {pkg.inclusions.slice(0, 3).map((inc) => (
                                            <span key={inc} className="text-xs px-2 py-1 bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-full">
                                                {inc}
                                            </span>
                                        ))}
                                        {pkg.inclusions.length > 3 && (
                                            <span className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded-full">
                                                +{pkg.inclusions.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div>
                                            <div className="text-gray-500 text-xs line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                                            <div className="text-white font-bold text-xl">
                                                ₹{pkg.price.toLocaleString()}
                                                <span className="text-gray-400 text-sm font-normal"> /person</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/booking?package=${pkg.id}`}
                                            className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/packages"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
                        >
                            View All Packages
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── TAXI PACKAGES SECTION ─────────────────────────── */}
            <section className="py-16 md:py-24 px-4 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="badge-saffron inline-block mb-4">🚕 Reliable Transport</div>
                        <h2 className="section-title gradient-text mb-4">Recommended Taxi Packages</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Comfortable and reliable taxi services for your pilgrimage and sightseeing needs across South India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {taxiPackages.map((taxi) => (
                            <div
                                key={taxi.id}
                                className="group bg-gray-900/40 rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/30 card-hover backdrop-blur-sm"
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
                                        <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-500 text-white rounded-full uppercase tracking-wider">
                                            {taxi.duration}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-white font-bold text-base font-poppins mb-3 min-h-[3rem] line-clamp-2">
                                        {taxi.name}
                                    </h3>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <MapPin className="w-3.5 h-3.5 text-orange-400" />
                                            <span>Pickup: <span className="text-gray-300">{taxi.pickup}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Users className="w-3.5 h-3.5 text-orange-400" />
                                            <span>{taxi.perPerson}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-gray-500 text-xs">Starting From</span>
                                            <span className="text-orange-400 font-bold text-lg">{taxi.price}</span>
                                        </div>
                                        <Link
                                            href={`/booking?type=taxi&package=${taxi.id}`}
                                            className="w-full text-center py-2.5 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-xl hover:bg-orange-500 hover:border-orange-500 transition-all group-hover:shadow-lg group-hover:shadow-orange-500/20"
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

            {/* ─── WHY CHOOSE US ─────────────────────────────── */}
            <section className="py-16 md:py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="badge-saffron inline-block mb-4">🤖 AI-Powered</div>
                            <h2 className="section-title gradient-text mb-6">Your AI Pilgrimage Companion</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Our cutting-edge AI understands the sacred significance of each destination and crafts deeply personalized itineraries — balancing spiritual rituals, sightseeing, travel time, and budget.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    { icon: '🗓️', title: 'Day-by-Day Itinerary', desc: 'Detailed temple visit schedules with auspicious timing' },
                                    { icon: '🏨', title: 'Smart Hotel Selection', desc: 'Hotels curated based on proximity to temples and budget' },
                                    { icon: '🛣️', title: 'Optimal Routes', desc: 'AI-optimized travel routes saving time and cost' },
                                    { icon: '💰', title: 'Budget Forecasting', desc: 'Accurate cost breakdowns before you book' },
                                ].map(({ icon, title, desc }) => (
                                    <div key={title} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl border border-white/5 hover:border-orange-500/20 transition-colors">
                                        <span className="text-2xl">{icon}</span>
                                        <div>
                                            <div className="text-white font-semibold">{title}</div>
                                            <div className="text-gray-400 text-sm mt-0.5">{desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/ai-planner"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                Try AI Planner Free
                            </Link>
                        </div>

                        {/* AI Planner Preview */}
                        <div className="relative">
                            <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                                        <Image
                                            src="/images/logo-gold.jpg"
                                            alt="Ramayan AI"
                                            width={40}
                                            height={40}
                                            className="object-cover scale-110"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">AI Trip Planner</div>
                                        <div className="text-green-400 text-xs flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                                            Generating itinerary...
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-800/50 rounded-xl p-4 mb-4 border border-orange-500/20">
                                    <div className="text-orange-400 text-xs font-semibold mb-2">Your Query:</div>
                                    <div className="text-white text-sm">"4 day pilgrimage trip to Rameshwaram and Madurai, budget ₹15,000"</div>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { day: 'Day 1', title: 'Arrival → Madurai', desc: 'Check-in + Meenakshi Temple evening darshan + Aarti' },
                                        { day: 'Day 2', title: 'Madurai Deep Dive', desc: 'Temple rituals + Thirumalai Nayak Palace + Local cuisine' },
                                        { day: 'Day 3', title: 'Madurai → Rameshwaram', desc: 'Road trip via Pamban Bridge + Ramanathaswamy darshan' },
                                        { day: 'Day 4', title: 'Dhanushkodi + Return', desc: '22 Theerthams + Beach + Return journey' },
                                    ].map(({ day, title, desc }, i) => (
                                        <div key={day} className="flex items-start gap-3">
                                            <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${i === 0 ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'
                                                }`}>
                                                {i + 1}
                                            </div>
                                            <div>
                                                <div className="text-orange-400 text-xs font-medium">{day} – {title}</div>
                                                <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="text-green-400 text-sm font-bold">Estimated: ₹14,200</div>
                                    <button className="text-xs text-orange-400 bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-full hover:bg-orange-500/20 transition-colors">
                                        Customize & Book →
                                    </button>
                                </div>
                            </div>

                            {/* Decorative glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-3xl -z-10 blur-xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── REVIEWS SECTION ─────────────────────────── */}
            <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="badge-saffron inline-block mb-4">⭐ Testimonials</div>
                        <h2 className="section-title gradient-text mb-4">Pilgrim Stories</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Real experiences from real pilgrims who found their sacred connection through Ramayan Tours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {reviews.slice(0, 3).map((review) => (
                            <div
                                key={review.id}
                                className="bg-gray-900 rounded-2xl p-6 border border-white/5 hover:border-orange-500/20 card-hover"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                                    "{review.review}"
                                </p>

                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{review.name}</div>
                                        <div className="text-gray-500 text-xs">{review.location} • {review.destination}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/reviews"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-orange-500/40 text-orange-400 rounded-full hover:bg-orange-500/10 hover:border-orange-500 transition-all font-medium"
                        >
                            Read All Reviews
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── CTA SECTION ─────────────────────────────── */}
            <section className="py-16 md:py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative bg-gradient-to-br from-orange-500/20 via-yellow-500/10 to-orange-500/5 rounded-3xl border border-orange-500/20 p-6 sm:p-12 overflow-hidden">
                        <div className="absolute inset-0 temple-pattern opacity-40" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center shadow-2xl border-2 border-orange-500/30 mb-8 bg-gray-950/50 backdrop-blur-sm group-hover:border-orange-500/60 transition-all duration-500">
                                <Image
                                    src="/images/logo-gold.jpg"
                                    alt="Ramayan Tours & Travels"
                                    width={80}
                                    height={80}
                                    className="object-cover scale-110"
                                />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 font-poppins px-2">
                                Begin Your Sacred Journey Today
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                                Let AI plan the perfect pilgrimage for you. Personalized itineraries in seconds.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/ai-planner"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-1 transition-all"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Plan with AI
                                </Link>
                                <a
                                    href="tel:+917639661626"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-semibold text-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Us Now: +91 7639 661 626
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
