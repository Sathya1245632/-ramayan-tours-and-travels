'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

function LoginContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isAdminMode = searchParams.get('admin') === 'true';
    const callbackUrl = searchParams.get('callbackUrl') || (isAdminMode ? '/admin' : '/');

    const [mode, setMode] = useState<'login' | 'signup'>(isAdminMode ? 'login' : 'login');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: isAdminMode ? 'admin@ramayantours.com' : '', phone: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((r) => setTimeout(r, 1000));

        if (isAdminMode) {
            // Simple Admin Check
            if (formData.email === 'admin@ramayantours.com' && formData.password === 'JaiShriRam@2025') {
                // Set cookie (primitive version)
                document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Strict";
                toast.success('Admin access granted! 🙏');
                router.push(callbackUrl);
            } else {
                toast.error('Invalid admin credentials.');
                setLoading(false);
                return;
            }
        } else {
            if (mode === 'login') {
                toast.success('Welcome back! 🙏 Jai Shri Ram!');
                router.push(callbackUrl);
            } else {
                toast.success('Account created! Welcome to Ramayan Tours! 🕉️');
                setMode('login');
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-20 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-500/30">
                        <NextImage
                            src="/images/logo-gold.jpg"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="object-cover scale-110"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-white font-poppins flex items-center justify-center gap-2">
                        {isAdminMode ? <ShieldCheck className="text-orange-400" /> : null}
                        {isAdminMode ? 'Admin Portal' : mode === 'login' ? 'Welcome Back' : 'Join Ramayan Tours'}
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {isAdminMode ? 'Please enter your administrator credentials' : mode === 'login' ? 'Sign in to your sacred journey account' : 'Begin your pilgrimage journey with us'}
                    </p>
                </div>

                {/* Toggle - Hide if admin mode */}
                {!isAdminMode && (
                    <div className="flex bg-gray-900 rounded-xl p-1 mb-6 border border-white/5">
                        {(['login', 'signup'] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all capitalize ${mode === m
                                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {m === 'login' ? 'Sign In' : 'Create Account'}
                            </button>
                        ))}
                    </div>
                )}

                {/* Form */}
                <div className="bg-gray-900 rounded-2xl border border-white/5 p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-orange-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                        placeholder="Ramesh Kumar"
                                        className="input-sacred pl-11"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-orange-400" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                    placeholder="ramesh@example.com"
                                    className="input-sacred pl-11"
                                />
                            </div>
                        </div>
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-orange-400" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                        placeholder="+91 98765 43210"
                                        className="input-sacred pl-11"
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-orange-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                                    placeholder={mode === 'login' ? 'Your password' : 'Min. 8 characters'}
                                    className="input-sacred pl-11 pr-11"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                </button>
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                            ) : (
                                <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="sacred-divider my-6 text-gray-600 text-sm">OR</div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 py-3 bg-gray-800 rounded-xl border border-white/10 hover:border-orange-500/30 hover:bg-gray-700 transition-all text-sm text-gray-300">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 bg-gray-800 rounded-xl border border-white/10 hover:border-orange-500/30 hover:bg-gray-700 transition-all text-sm text-gray-300">
                            <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>

                <p className="text-center text-gray-500 text-sm mt-6">
                    {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                    >
                        {mode === 'login' ? 'Sign Up Free' : 'Sign In'}
                    </button>
                </p>

                {/* Admin / User Login Toggle Button */}
                <div className="mt-8 flex justify-center">
                    {isAdminMode ? (
                        <Link href="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors bg-gray-900/50 px-4 py-2 rounded-full border border-white/5">
                            <User className="w-4 h-4" />
                            Return to User Login
                        </Link>
                    ) : (
                        <Link href="/login?admin=true" className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-400 transition-colors bg-gray-900/50 px-4 py-2 rounded-full border border-white/5">
                            <ShieldCheck className="w-4 h-4" />
                            Admin Portal Access
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <LoginContent />
        </Suspense>
    );
}

