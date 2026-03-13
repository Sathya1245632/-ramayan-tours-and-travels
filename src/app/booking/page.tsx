'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, CreditCard, ArrowRight, Shield, Star, Phone } from 'lucide-react';
import { packages } from '@/lib/data';
import toast from 'react-hot-toast';
import { createBooking } from '@/app/actions/booking';

const steps = ['Select Package', 'Traveler Details', 'Payment', 'Confirmation'];

function BookingContent() {
    const searchParams = useSearchParams();
    const packageId = searchParams.get('package') || 'rameshwaram-3d';
    const pkg = packages.find((p) => p.id === packageId) || packages[0];

    const [currentStep, setCurrentStep] = useState(1);
    const [travelers, setTravelers] = useState(2);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        travelDate: '',
        specialRequests: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [paymentDetails, setPaymentDetails] = useState({ upiId: '', cardNumber: '', cardName: '', expiry: '', cvv: '' });
    const [isProcessing, setIsProcessing] = useState(false);

    const totalAmount = pkg.price * travelers;

    const handleSubmitDetails = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.travelDate) {
            toast.error('Please fill all required fields');
            return;
        }
        setCurrentStep(3);
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const result = await createBooking({
                pkgId: pkg.id,
                travelers,
                formData,
                totalAmount
            });

            if (result.success) {
                setCurrentStep(4);
                toast.success('🎉 Booking Confirmed! Check your email.');
            } else {
                toast.error(result.error || 'Booking failed. Please try again.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred during payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="badge-saffron inline-block mb-4">📋 Booking</div>
                    <h1 className="section-title gradient-text mb-4">Book Your Sacred Journey</h1>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12 overflow-x-auto">
                    <div className="flex items-center gap-0 min-w-max">
                        {steps.map((step, i) => (
                            <div key={step} className="flex items-center">
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i + 1 < currentStep ? 'bg-green-500 text-white' :
                                            i + 1 === currentStep ? 'bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/40' :
                                                'bg-gray-800 text-gray-500 border border-white/10'
                                        }`}>
                                        {i + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
                                    </div>
                                    <span className={`text-xs hidden sm:block ${i + 1 === currentStep ? 'text-orange-400 font-semibold' : 'text-gray-500'}`}>
                                        {step}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-16 sm:w-24 h-0.5 mx-2 ${i + 1 < currentStep ? 'bg-green-500' : 'bg-gray-800'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Step 1: Package Selection */}
                        {currentStep === 1 && (
                            <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="relative h-48">
                                    <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-white font-bold text-xl font-poppins">{pkg.name}</h2>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                                <span>{pkg.duration}</span> • <span>{pkg.hotelType}</span> • <span>{pkg.transport}</span>
                                            </div>
                                        </div>
                                        <span className="badge-saffron">{pkg.category}</span>
                                    </div>

                                    <div className="mb-6">
                                        <div className="text-gray-400 text-sm mb-3">Number of Travelers:</div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                                className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors font-bold text-lg"
                                            >−</button>
                                            <span className="text-white font-bold text-2xl w-12 text-center">{travelers}</span>
                                            <button
                                                onClick={() => setTravelers(Math.min(10, travelers + 1))}
                                                className="w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors font-bold text-lg"
                                            >+</button>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        {pkg.inclusions.map((inc) => (
                                            <div key={inc} className="flex items-center gap-2 text-gray-300 text-sm">
                                                <CheckCircle className="w-4 h-4 text-orange-400 shrink-0" />
                                                <span>{inc}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                    >
                                        Continue to Details <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Traveler Details */}
                        {currentStep === 2 && (
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <h2 className="text-white font-bold text-xl mb-6">Traveler Details</h2>
                                <form onSubmit={handleSubmitDetails} className="space-y-5">
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
                                            <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                                placeholder="ramesh@example.com"
                                                className="input-sacred"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                                placeholder="+91 7639 661 626"
                                                className="input-sacred"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Travel Date *</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.travelDate}
                                                onChange={(e) => setFormData((p) => ({ ...p, travelDate: e.target.value }))}
                                                className="input-sacred"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Address</label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                                            placeholder="Your city, state"
                                            className="input-sacred"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Special Requests</label>
                                        <textarea
                                            value={formData.specialRequests}
                                            onChange={(e) => setFormData((p) => ({ ...p, specialRequests: e.target.value }))}
                                            placeholder="Dietary requirements, mobility needs, etc."
                                            rows={3}
                                            className="input-sacred resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                                    >
                                        Proceed to Payment <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {currentStep === 3 && (
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-orange-400" />
                                    Payment Options
                                </h2>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                    {[
                                        { id: 'upi', label: 'UPI', icon: '📱' },
                                        { id: 'credit', label: 'Credit Card', icon: '💳' },
                                        { id: 'debit', label: 'Debit Card', icon: '🏧' },
                                        { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`p-3 rounded-xl text-center border transition-all ${paymentMethod === method.id
                                                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                                                    : 'border-white/10 bg-gray-800 text-gray-400 hover:border-orange-500/40'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{method.icon}</div>
                                            <div className="text-xs font-medium">{method.label}</div>
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handlePayment} className="space-y-4">
                                    {paymentMethod === 'upi' && (
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">UPI ID</label>
                                            <input
                                                type="text"
                                                placeholder="yourname@upi"
                                                className="input-sacred"
                                                value={paymentDetails.upiId}
                                                onChange={(e) => setPaymentDetails((p) => ({ ...p, upiId: e.target.value }))}
                                            />
                                        </div>
                                    )}
                                    {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                                        <>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Card Number</label>
                                                <input type="text" placeholder="1234 5678 9012 3456" className="input-sacred" maxLength={19} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-2">Expiry</label>
                                                    <input type="text" placeholder="MM/YY" className="input-sacred" />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-2">CVV</label>
                                                    <input type="text" placeholder="***" className="input-sacred" maxLength={3} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-2">Card Holder Name</label>
                                                <input type="text" placeholder="Name as on card" className="input-sacred" />
                                            </div>
                                        </>
                                    )}
                                    {paymentMethod === 'netbanking' && (
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Select Bank</label>
                                            <select className="input-sacred">
                                                <option>State Bank of India</option>
                                                <option>HDFC Bank</option>
                                                <option>ICICI Bank</option>
                                                <option>Axis Bank</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">
                                        <Shield className="w-4 h-4 shrink-0" />
                                        <span>Secured with 256-bit SSL encryption. Your payment is 100% safe.</span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-orange-500/40 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing Payment...
                                            </>
                                        ) : (
                                            <>Pay ₹{totalAmount.toLocaleString()} Now</>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {currentStep === 4 && (
                            <div className="bg-gray-900 rounded-2xl border border-green-500/30 p-8 text-center">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-green-400" />
                                </div>
                                <h2 className="text-3xl font-black text-white mb-2">🎉 Booking Confirmed!</h2>
                                <p className="text-gray-400 mb-6">
                                    Jai Shri Ram! Your pilgrimage to <span className="text-orange-400 font-semibold">{pkg.destination}</span> is confirmed!
                                </p>

                                <div className="bg-gray-800 rounded-xl p-6 mb-6 text-left space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Booking ID</span>
                                        <span className="text-white font-mono font-bold">#RTT{Date.now().toString().slice(-8)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Package</span>
                                        <span className="text-white">{pkg.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Travelers</span>
                                        <span className="text-white">{travelers} persons</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Amount Paid</span>
                                        <span className="text-green-400 font-bold">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm mb-6">
                                    A confirmation email has been sent. Our team will contact you within 24 hours to finalize the arrangements.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link
                                        href="/"
                                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                                    >
                                        Back to Home
                                    </Link>
                                    <a
                                        href="tel:+917639661626"
                                        className="px-6 py-3 border border-white/20 text-white rounded-full font-semibold hover:border-orange-500/50 hover:bg-orange-500/10 transition-all flex items-center gap-2 justify-center"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Call Support
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-2xl border border-white/5 p-6 sticky top-24">
                            <h3 className="text-white font-bold text-lg mb-4">Order Summary</h3>
                            <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                                <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                            </div>
                            <div className="text-white font-semibold mb-1">{pkg.name}</div>
                            <div className="text-orange-400 text-sm mb-4">{pkg.duration} • {pkg.hotelType}</div>

                            <div className="space-y-2 text-sm border-t border-white/5 pt-4">
                                <div className="flex justify-between text-gray-400">
                                    <span>Package price</span>
                                    <span>₹{pkg.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Travelers</span>
                                    <span>× {travelers}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Taxes & fees</span>
                                    <span>Included</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg border-t border-white/10 pt-3 mt-3">
                                    <span>Total</span>
                                    <span className="gradient-text">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-orange-500/5 border border-orange-500/20 rounded-xl text-xs text-gray-400">
                                💰 You save ₹{((pkg.originalPrice - pkg.price) * travelers).toLocaleString()} vs original price
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-green-400 text-xs">
                                <Shield className="w-3.5 h-3.5" />
                                Free cancellation within 48 hours
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>}>
            <BookingContent />
        </Suspense>
    );
}
