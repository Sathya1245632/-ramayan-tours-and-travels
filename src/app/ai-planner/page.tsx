'use client';

import { useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, DollarSign, Users, Loader2, CheckCircle, Hotel, Bus, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ItineraryDay {
    day: number;
    title: string;
    activities: string[];
    temple: string;
    hotel: string;
    tip: string;
}

interface GeneratedItinerary {
    destination: string;
    days: number;
    budget: string;
    totalCost: number;
    itinerary: ItineraryDay[];
    hotels: string[];
    transport: string;
    highlights: string[];
}

const MOCK_ITINERARIES: Record<string, GeneratedItinerary> = {
    rameshwaram: {
        destination: 'Rameshwaram',
        days: 3,
        budget: 'Budget',
        totalCost: 8999,
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Evening Darshan',
                activities: ['Arrive at Madurai airport', 'Drive to Rameshwaram (3hr)', 'Check-in at hotel', 'Evening darshan at Ramanathaswamy Temple', 'Stroll along Agni Teertham beach'],
                temple: 'Ramanathaswamy Temple – First darshan',
                hotel: 'Hotel Sea View, Rameshwaram',
                tip: 'Book temple tickets online in advance to avoid queues.',
            },
            {
                day: 2,
                title: 'The 22 Theerthams Ritual',
                activities: ['Early morning at 5 AM – 22 Theerthams ritual bath', 'Full temple tour with guide', 'Visit Gandhamadana Parvatham', 'Lunch at local restaurant', 'Pamban Bridge photography'],
                temple: 'Ramanathaswamy Temple – 22 Sacred Theerthams',
                hotel: 'Hotel Sea View, Rameshwaram',
                tip: 'Wear comfortable clothes – the ritual involves multiple ritual baths.',
            },
            {
                day: 3,
                title: 'Dhanushkodi & Return',
                activities: ['Morning beach walk at Dhanushkodi', 'Visit the ghost town ruins', 'Kothandaramaswamy Temple', 'Lunch', 'Return journey home'],
                temple: 'Kothandaramaswamy Temple – Dhanushkodi',
                hotel: 'Check-out',
                tip: 'Hire a jeep for Dhanushkodi – only 4WD vehicles are allowed.',
            },
        ],
        hotels: ['Hotel Sea View (₹1,500/night)', 'Rameshwaram Residency (₹2,000/night)', 'TTDC Beach Hotel (₹1,800/night)'],
        transport: 'AC Bus from Madurai + Local auto/jeep',
        highlights: ['Ramanathaswamy Temple', '22 Theerthams ritual', 'Pamban Bridge', 'Dhanushkodi beach'],
    },
    varanasi: {
        destination: 'Varanasi',
        days: 4,
        budget: 'Premium',
        totalCost: 14999,
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Ganga Aarti',
                activities: ['Arrive at Varanasi airport', 'Check-in at riverside hotel', 'Evening walk on Dashashwamedh Ghat', 'Witness the grand Ganga Aarti ceremony at 7 PM'],
                temple: 'Dashashwamedh Ghat – Ganga Aarti',
                hotel: 'BrijRama Palace, Varanasi',
                tip: 'Arrive early at the ghat to get a good viewing spot for the Aarti.',
            },
            {
                day: 2,
                title: 'Kashi Vishwanath Darshan',
                activities: ['Sunrise boat ride on the Ganga', 'Breakfast at riverside café', 'Kashi Vishwanath Temple darshan', 'Explore the narrow lanes of the old city', 'Evening at Assi Ghat'],
                temple: 'Kashi Vishwanath Temple – Main darshan',
                hotel: 'BrijRama Palace, Varanasi',
                tip: 'Non-Hindus are not allowed inside Kashi Vishwanath – visit the adjacent temple instead.',
            },
            {
                day: 3,
                title: 'Sarnath Pilgrimage',
                activities: ['Morning: Sankat Mochan Temple', 'Drive to Sarnath (12 km)', 'Dhamek Stupa & Buddhist Museum', 'Isco Museum', 'Evening: Ghat walk'],
                temple: 'Sankat Mochan Temple + Sarnath',
                hotel: 'BrijRama Palace, Varanasi',
                tip: 'Sarnath is where Buddha gave his first sermon – historically significant.',
            },
            {
                day: 4,
                title: 'Last Ghat Experience & Departure',
                activities: ['Final sunrise boat ride', 'Hot chai on the ghats', 'Shopping at Vishwanath Gali', 'Check-out and departure'],
                temple: 'Tulsi Ghat – Final prayers',
                hotel: 'Check-out',
                tip: 'Buy silk sarees and Banarasi artifacts as souvenirs.',
            },
        ],
        hotels: ['BrijRama Palace (₹4,500/night)', 'Taj Ganges (₹8,000/night)', 'Hotel Surya (₹2,000/night)'],
        transport: 'Private AC Car (all transfers included)',
        highlights: ['Ganga Aarti ceremony', 'Sunrise boat ride', 'Kashi Vishwanath darshan', 'Sarnath'],
    },
};

function generateItinerary(destination: string, days: number, budget: string, style: string): GeneratedItinerary {
    const key = destination.toLowerCase().replace(/[^a-z]/g, '');
    const mock = MOCK_ITINERARIES[key] || MOCK_ITINERARIES['rameshwaram'];

    const baseCost = budget === 'budget' ? 7000 : budget === 'premium' ? 14000 : 30000;
    const totalCost = Math.round(baseCost * (days / 3) * (0.9 + Math.random() * 0.2));

    return { ...mock, destination, days, budget: style, totalCost };
}

export default function AIPlannerPage() {
    const [formData, setFormData] = useState({
        destination: '',
        days: 3,
        budget: 'budget',
        style: 'Budget',
    });
    const [loading, setLoading] = useState(false);
    const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
    const [step, setStep] = useState(0);

    const loadingSteps = [
        'Analyzing temple schedules...',
        'Finding optimal routes...',
        'Selecting best hotels...',
        'Calculating budget breakdown...',
        'Generating your itinerary...',
    ];

    const handleGenerate = async () => {
        if (!formData.destination) return;
        setLoading(true);
        setStep(0);

        for (let i = 0; i < loadingSteps.length; i++) {
            await new Promise((r) => setTimeout(r, 600));
            setStep(i + 1);
        }

        await new Promise((r) => setTimeout(r, 400));
        setItinerary(generateItinerary(formData.destination, formData.days, formData.budget, formData.style));
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* Header */}
            <div className="relative py-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="badge-saffron inline-block mb-4">🤖 AI-Powered</div>
                    <h1 className="section-title gradient-text mb-4">AI Trip Planner</h1>
                    <p className="text-gray-400 text-lg">
                        Tell us where you want to go and our AI will create a personalized day-by-day pilgrimage itinerary in seconds.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                {/* Input Form */}
                <div className="bg-gray-900 rounded-2xl border border-white/10 p-8 mb-8">
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-400" />
                        Plan Your Journey
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                <MapPin className="w-4 h-4 inline mr-1.5 text-orange-400" />
                                Destination
                            </label>
                            <select
                                value={formData.destination}
                                onChange={(e) => setFormData((p) => ({ ...p, destination: e.target.value }))}
                                className="input-sacred"
                            >
                                <option value="">Select a holy destination</option>
                                {['Rameshwaram', 'Varanasi', 'Madurai', 'Tirupati', 'Kanyakumari', 'Puri', 'Vrindavan', 'Dwarka'].map((d) => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                <Clock className="w-4 h-4 inline mr-1.5 text-orange-400" />
                                Number of Days: <span className="text-orange-400 font-bold">{formData.days}</span>
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={14}
                                value={formData.days}
                                onChange={(e) => setFormData((p) => ({ ...p, days: parseInt(e.target.value) }))}
                                className="w-full accent-orange-500 mt-2"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1 day</span>
                                <span>14 days</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                <DollarSign className="w-4 h-4 inline mr-1.5 text-orange-400" />
                                Budget Preference
                            </label>
                            <select
                                value={formData.budget}
                                onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                                className="input-sacred"
                            >
                                <option value="budget">Budget (₹5,000–₹10,000)</option>
                                <option value="premium">Premium (₹10,000–₹25,000)</option>
                                <option value="luxury">Luxury (₹25,000+)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">
                                <Users className="w-4 h-4 inline mr-1.5 text-orange-400" />
                                Travel Style
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Budget', 'Premium', 'Luxury'].map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => setFormData((p) => ({ ...p, style }))}
                                        className={`py-3 rounded-xl text-sm font-medium border transition-all ${formData.style === style
                                                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent'
                                                : 'bg-gray-800 text-gray-400 border-white/10 hover:border-orange-500/30'
                                            }`}
                                    >
                                        {style === 'Budget' ? '💰' : style === 'Premium' ? '✨' : '👑'} {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!formData.destination || loading}
                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5" />
                        )}
                        {loading ? loadingSteps[step - 1] || 'Generating...' : '✨ Generate My Sacred Itinerary'}
                    </button>

                    {loading && (
                        <div className="mt-4">
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-500"
                                    style={{ width: `${(step / loadingSteps.length) * 100}%` }}
                                />
                            </div>
                            <div className="text-center text-gray-400 text-sm mt-2">{loadingSteps[step - 1] || 'Initializing...'}</div>
                        </div>
                    )}
                </div>

                {/* Generated Itinerary */}
                {itinerary && !loading && (
                    <div className="space-y-6 animate-fade-in-up">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-r from-orange-500/20 via-yellow-500/10 to-orange-500/5 border border-orange-500/30 rounded-2xl p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="badge-saffron inline-block mb-2">✨ AI Generated</div>
                                    <h2 className="text-2xl font-bold text-white font-poppins">
                                        {itinerary.days}-Day {itinerary.destination} Pilgrimage
                                    </h2>
                                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-300">
                                        <span>🏨 {itinerary.budget} Stay</span>
                                        <span>🚌 {itinerary.transport}</span>
                                        <span>📅 {itinerary.days} days</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-400 text-sm">Estimated Total</div>
                                    <div className="text-3xl font-black gradient-text">₹{itinerary.totalCost.toLocaleString()}</div>
                                    <div className="text-gray-500 text-xs">Per person, all inclusive</div>
                                </div>
                            </div>
                        </div>

                        {/* Day-by-Day Itinerary */}
                        <div className="space-y-4">
                            {itinerary.itinerary.map((day, i) => (
                                <div key={day.day} className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
                                    <div className="flex items-center gap-4 p-6 border-b border-white/5">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-black text-lg shrink-0">
                                            {day.day}
                                        </div>
                                        <div>
                                            <div className="text-orange-400 text-xs font-semibold uppercase tracking-wider">Day {day.day}</div>
                                            <div className="text-white font-bold text-lg">{day.title}</div>
                                        </div>
                                    </div>

                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-semibold">Activities</div>
                                            <div className="space-y-2">
                                                {day.activities.map((act, j) => (
                                                    <div key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                                        <span>{act}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                                                <div className="text-xs text-orange-300 font-semibold mb-1">🛕 Temple Visit</div>
                                                <div className="text-gray-200 text-sm">{day.temple}</div>
                                            </div>
                                            <div className="bg-gray-800 rounded-xl p-4">
                                                <div className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1">
                                                    <Hotel className="w-3.5 h-3.5" /> Hotel
                                                </div>
                                                <div className="text-gray-200 text-sm">{day.hotel}</div>
                                            </div>
                                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                                                <div className="text-xs text-blue-300 font-semibold mb-1">💡 Tip</div>
                                                <div className="text-gray-300 text-sm">{day.tip}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Hotels & Transport */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                    <Hotel className="w-5 h-5 text-orange-400" /> Recommended Hotels
                                </h3>
                                <div className="space-y-2">
                                    {itinerary.hotels.map((h) => (
                                        <div key={h} className="flex items-center gap-2 text-gray-300 text-sm">
                                            <Star className="w-3.5 h-3.5 text-yellow-400" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                                    <Bus className="w-5 h-5 text-orange-400" /> Transport & Highlights
                                </h3>
                                <div className="text-gray-300 text-sm mb-4">🚌 {itinerary.transport}</div>
                                <div className="flex flex-wrap gap-2">
                                    {itinerary.highlights.map((h) => (
                                        <span key={h} className="text-xs px-3 py-1 bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-full">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Book CTA */}
                        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Love this itinerary?</h3>
                            <p className="text-gray-400 mb-6">Book it now and our team will personalize every detail for you!</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all"
                                >
                                    Book This Trip <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => setItinerary(null)}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                                >
                                    Regenerate Plan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
