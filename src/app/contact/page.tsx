'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactMessage } from '@/app/actions/contact';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        try {
            const result = await sendContactMessage(formData);
            if (result.success) {
                toast.success('Message sent! We\'ll reply within 24 hours. 🙏');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                toast.error(result.error || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            {/* Header */}
            <div className="relative py-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/5" />
                <div className="temple-pattern absolute inset-0 opacity-40" />
                <div className="relative z-10">
                    <div className="badge-saffron inline-block mb-4">📞 Get In Touch</div>
                    <h1 className="section-title gradient-text mb-4">Contact Us</h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Our pilgrimage experts are here to help you plan the perfect sacred journey.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                            <h2 className="text-white font-bold text-lg mb-6">Reach Us</h2>
                            <div className="space-y-5">
                                {[
                                    { icon: Phone, title: 'Phone', lines: ['+91 7639 661 626'], color: 'text-green-400' },
                                    { icon: Mail, title: 'Email', lines: ['Ramayantoursandtravels@gmail.com'], color: 'text-blue-400' },
                                    { icon: MapPin, title: 'Address', lines: ['123, Anna Salai, Chennai', 'Tamil Nadu – 600002, India'], color: 'text-orange-400' },
                                    { icon: Clock, title: 'Working Hours', lines: ['Mon – Sat: 9 AM – 8 PM', 'Sunday: 10 AM – 4 PM'], color: 'text-yellow-400' },
                                ].map(({ icon: Icon, title, lines, color }) => (
                                    <div key={title} className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center ${color} shrink-0`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">{title}</div>
                                            {lines.map((line) => (
                                                <div key={line} className="text-white text-sm">{line}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href="https://wa.me/917639661626?text=Hello%2C%20I%20would%20like%20details%20about%20the%20Rameshwaram%20tour%20package."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 hover:bg-green-500/20 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                                <MessageCircle className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Chat on WhatsApp</div>
                                <div className="text-green-400 text-sm">Instant reply • 24/7 support</div>
                            </div>
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-gray-900 rounded-2xl border border-white/5 p-8">
                            <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                                <Send className="w-5 h-5 text-orange-400" />
                                Send a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                            placeholder="Ramesh Kumar"
                                            className="input-sacred"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                            placeholder="ramesh@example.com"
                                            className="input-sacred"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                            placeholder="+91 98765 43210"
                                            className="input-sacred"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                                            className="input-sacred"
                                        >
                                            <option value="">Select topic</option>
                                            <option>Tour Package Inquiry</option>
                                            <option>Booking Assistance</option>
                                            <option>AI Planner Help</option>
                                            <option>Payment Issue</option>
                                            <option>Custom Tour Request</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Message *</label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                                        placeholder="Tell us about your pilgrimage plans, questions, or special requirements..."
                                        rows={5}
                                        className="input-sacred resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {sending ? (
                                        <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                                    ) : (
                                        <><Send className="w-5 h-5" /> Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
