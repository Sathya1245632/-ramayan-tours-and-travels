'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    time: string;
}

const quickReplies = [
    'Best pilgrimage in South India?',
    'Rameshwaram package price?',
    'Temple timings in Varanasi?',
    'AI trip planning help',
];

const botResponses: Record<string, string> = {
    default: "Namaste! 🙏 I'm your AI travel assistant for Ramayan Tours. I can help you plan your sacred pilgrimage, suggest destinations, explain temple timings, and find the perfect package. How may I assist you today?",
};

function getBotResponse(message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('rameshwaram') || lower.includes('rameswaram')) {
        return "🕌 **Rameshwaram** is one of India's holiest sites! Our 3-Day Spiritual Tour starts at ₹8,999 per person. It includes darshan at Ramanathaswamy Temple, the 22 Theerthams ritual, Dhanushkodi beach visit and Pamban Bridge. Would you like me to generate a detailed itinerary?";
    }
    if (lower.includes('varanasi') || lower.includes('kashi')) {
        return "🌊 **Varanasi (Kashi)** is the spiritual capital of India! Our 4-Day Kashi Vishwanath Pilgrimage at ₹14,999 includes Kashi Vishwanath darshan, evening Ganga Aarti, sunrise boat ride, and Sarnath visit. The Ganga Aarti at 7 PM is absolutely divine!";
    }
    if (lower.includes('tirupati') || lower.includes('balaji')) {
        return "⛩️ **Tirupati Balaji** is the world's richest temple! Our 2-Day package at ₹9,499 includes VIP darshan tickets, ropeway ride to Tirumala, Laddu prasad, and Tiruchanur temple visit. Book 30 days in advance for best slots!";
    }
    if (lower.includes('madurai') || lower.includes('meenakshi')) {
        return "🏛️ **Madurai & Meenakshi Temple** – the city that never sleeps! Our 2-Day Temple Yatra at ₹6,999 covers the magnificent Meenakshi Amman Temple, evening aarti, Thirumalai Nayak Palace, and local food tour.";
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('package')) {
        return "💰 Our packages start from ₹6,999! Here's a quick overview:\n• Madurai: ₹6,999 (2 days)\n• Rameshwaram: ₹8,999 (3 days)\n• Tirupati: ₹9,499 (2 days)\n• Varanasi: ₹14,999 (4 days)\n• South India Circuit: ₹32,999 (7 days)\n\nAll include hotel, meals & guided temple visits!";
    }
    if (lower.includes('timing') || lower.includes('time') || lower.includes('open')) {
        return "⏰ General temple timings:\n• Kashi Vishwanath: 3 AM – 11 PM\n• Ramanathaswamy: 5 AM – 9 PM\n• Meenakshi Amman: 5 AM – 12:30 PM, 4 PM – 9:30 PM\n• Tirumala: Darshan 24 hrs with breaks\n\nI recommend visiting between 6–8 AM for a peaceful experience!";
    }
    if (lower.includes('south') || lower.includes('circuit')) {
        return "🗺️ Our **7-Day South India Sacred Circuit** at ₹32,999 is our most popular package! It covers Tirupati → Madurai → Rameshwaram → Kanyakumari. Includes 5-star hotels, private car, VIP darshan, all meals, and flights!";
    }
    if (lower.includes('booking') || lower.includes('book')) {
        return "📋 Booking is simple! Go to our **Packages page** → Click 'Book Now' → Fill traveler details → Choose payment method (UPI/Card/Net Banking). Or WhatsApp us at +91-98765-43210 for instant booking!";
    }
    if (lower.includes('ai') || lower.includes('planner') || lower.includes('itinerary')) {
        return "✨ Our **AI Trip Planner** creates personalized day-by-day itineraries! Just tell me:\n1. Destination(s)\n2. Number of days\n3. Budget preference\n\nThe AI will generate temple schedules, hotel recommendations, travel routes, and cost estimates instantly!";
    }
    return "Namaste! 🙏 I'd be happy to help you plan your sacred journey! You can ask me about:\n• Specific destinations (Rameshwaram, Varanasi, Tirupati)\n• Package prices and inclusions\n• Temple timings and rituals\n• AI trip planning\n• Booking process\n\nWhat would you like to know?";
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Namaste! 🙏 I'm your AI travel assistant for Ramayan Tours. Ask me about pilgrimage packages, temple timings, or let me plan your perfect sacred journey!",
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now() + 1,
                text: getBotResponse(text),
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-orange-500/20 flex flex-col"
                    style={{ height: '480px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
                                <Image
                                    src="/images/ramayan-logo.png"
                                    alt="Ramayan Assistant"
                                    width={40}
                                    height={40}
                                    className="object-cover scale-110"
                                />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">Yatra AI Assistant</div>
                                <div className="flex items-center gap-1.5 text-white/80 text-xs">
                                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                                    Online • Ramayan Tours
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto bg-gray-950 p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`w-7 h-7 rounded-full overflow-hidden flex items-center justify-center shrink-0 ${msg.sender === 'bot'
                                    ? 'bg-gradient-to-br from-orange-500 to-yellow-500'
                                    : 'bg-gray-700'
                                    }`}>
                                    {msg.sender === 'bot' ? (
                                        <Image
                                            src="/images/logo-gold.jpg"
                                            alt="Bot"
                                            width={28}
                                            height={28}
                                            className="object-cover scale-110"
                                        />
                                    ) : <User className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <div className={`max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                    <div
                                        className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-tr-sm'
                                            : 'bg-gray-800 text-gray-100 rounded-tl-sm border border-white/5'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className="text-gray-600 text-xs">{msg.time}</span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-2.5">
                                <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                                    <Image
                                        src="/images/ramayan-logo.png"
                                        alt="Bot"
                                        width={28}
                                        height={28}
                                        className="object-cover scale-110"
                                    />
                                </div>
                                <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <span
                                                key={i}
                                                className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                                                style={{ animationDelay: `${i * 0.15}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick replies */}
                    <div className="bg-gray-900 px-3 pt-3 flex gap-2 overflow-x-auto pb-1">
                        {quickReplies.map((qr) => (
                            <button
                                key={qr}
                                onClick={() => sendMessage(qr)}
                                className="shrink-0 px-3 py-1.5 text-xs text-orange-400 bg-orange-500/10 border border-orange-500/30 rounded-full hover:bg-orange-500/20 transition-colors whitespace-nowrap"
                            >
                                {qr}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="bg-gray-900 p-3 border-t border-white/5 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                            placeholder="Ask about pilgrimage packages..."
                            className="flex-1 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-xl outline-none border border-white/10 focus:border-orange-500/50 placeholder:text-gray-500 transition-colors"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                        >
                            <Send className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            )}

            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="chat-fab"
                aria-label="Open chat assistant"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </button>
        </>
    );
}
