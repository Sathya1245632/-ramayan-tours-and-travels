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

import { chat } from '@/app/actions/chat';

const quickReplies = [
    'Best pilgrimage in South India?',
    'Rameshwaram package price?',
    'AI trip planning help',
];

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
        const currentHistory = messages.map(m => ({ 
            role: m.sender === 'user' ? 'user' : 'model' as 'user' | 'model', 
            parts: m.text 
        }));

        setInput('');
        setIsTyping(true);

        try {
            const result = await chat(text, currentHistory);
            const botMsg: Message = {
                id: Date.now() + 1,
                text: result.text || "I'm sorry, I couldn't connect to my AI core. Please try again later! 🙏",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            const errorMsg: Message = {
                id: Date.now() + 1,
                text: "I encountered a problem connecting to the spiritual network. Please call us directly! 🙏",
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1001] w-[calc(100%-2rem)] sm:w-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-orange-500/20 flex flex-col transition-all duration-300"
                    style={{ height: 'calc(100dvh - 2rem)', maxHeight: '580px' }}>
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
                                        src="/images/logo-gold.jpg"
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

                    <div className="bg-gray-900 p-3 border-t border-white/5 flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isTyping && sendMessage(input)}
                            placeholder={isTyping ? "AI is thinking..." : "Ask about pilgrimage packages..."}
                            disabled={isTyping}
                            className="flex-1 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-xl outline-none border border-white/10 focus:border-orange-500/50 placeholder:text-gray-500 transition-colors disabled:opacity-50"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={isTyping || !input.trim()}
                            className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
