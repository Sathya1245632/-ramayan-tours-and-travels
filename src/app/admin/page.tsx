'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import {
    LayoutDashboard, Users, Package, MapPin, CreditCard, MessageSquare,
    BarChart3, TrendingUp, Settings, LogOut, Menu, X, Bell, Search,
    ArrowUp, ArrowDown, Eye, Edit, Trash2, Plus, Check
} from 'lucide-react';
import { packages as mockPackages, destinations as mockDestinations, reviews as mockReviews } from '@/lib/data';
import { 
    getAdminDashboardStats, 
    getBookings, 
    getCustomers, 
    getMessages, 
    getPackages 
} from '@/app/actions/admin';
import { toast } from 'react-hot-toast';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'packages', label: 'Packages', icon: MapPin },
    { id: 'revenue', label: 'Revenue', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
];

const mockBookings = [
    { id: 'RTT20250001', customer: 'Priya Sharma', package: 'Rameshwaram Tour', date: '2025-03-15', amount: 17998, status: 'confirmed', travelers: 2 },
    { id: 'RTT20250002', customer: 'Rajesh Kumar', package: 'Kashi Pilgrimage', date: '2025-03-18', amount: 14999, status: 'pending', travelers: 1 },
    { id: 'RTT20250003', customer: 'Ananya Nair', package: 'Madurai Yatra', date: '2025-03-20', amount: 13998, status: 'confirmed', travelers: 2 },
    { id: 'RTT20250004', customer: 'Suresh Patel', package: 'South Circuit', date: '2025-03-22', amount: 65998, status: 'processing', travelers: 2 },
    { id: 'RTT20250005', customer: 'Meera Krishnan', package: 'Tirupati Darshan', date: '2025-03-25', amount: 9499, status: 'confirmed', travelers: 1 },
];

const mockCustomers = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91-9876540001', trips: 3, totalSpent: 42000, location: 'Mumbai' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91-9876540002', trips: 2, totalSpent: 28000, location: 'Bangalore' },
    { id: 3, name: 'Ananya Nair', email: 'ananya@example.com', phone: '+91-9876540003', trips: 1, totalSpent: 13998, location: 'Chennai' },
    { id: 4, name: 'Suresh Patel', email: 'suresh@example.com', phone: '+91-9876540004', trips: 4, totalSpent: 95000, location: 'Ahmedabad' },
];

const mockMessages = [
    { id: 1, from: 'Arun Raj', subject: 'Custom tour request for Varanasi', time: '2 hours ago', read: false },
    { id: 2, from: 'Kavitha M', subject: 'Booking cancellation request', time: '4 hours ago', read: false },
    { id: 3, from: 'Mohan Das', subject: 'Special accommodation for senior citizens', time: '6 hours ago', read: true },
    { id: 4, from: 'Lata Singh', subject: 'Group booking inquiry (25 people)', time: '1 day ago', read: true },
];

const monthlyRevenue = [
    { month: 'Oct', amount: 285000 },
    { month: 'Nov', amount: 342000 },
    { month: 'Dec', amount: 520000 },
    { month: 'Jan', amount: 398000 },
    { month: 'Feb', amount: 447000 },
    { month: 'Mar', amount: 612000 },
];

const maxRevenue = Math.max(...monthlyRevenue.map((r) => r.amount));

export default function AdminPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    // Real Data States
    const [statsData, setStatsData] = useState<any>(null);
    const [dbBookings, setDbBookings] = useState<any[]>([]);
    const [dbCustomers, setDbCustomers] = useState<any[]>([]);
    const [dbMessages, setDbMessages] = useState<any[]>([]);
    const [dbPackages, setDbPackages] = useState<any[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (activeTab === 'bookings') fetchBookings();
        if (activeTab === 'customers') fetchCustomers();
        if (activeTab === 'messages') fetchMessages();
        if (activeTab === 'packages') fetchPackages();
    }, [activeTab]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const stats = await getAdminDashboardStats();
            setStatsData(stats);
            // Also fetch recent bookings for dashboard
            const bookings = await getBookings();
            setDbBookings(bookings);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const data = await getBookings();
            setDbBookings(data);
        } catch (error) {
            toast.error('Failed to load bookings');
        }
    };

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setDbCustomers(data);
        } catch (error) {
            toast.error('Failed to load customers');
        }
    };

    const fetchMessages = async () => {
        try {
            const data = await getMessages();
            setDbMessages(data);
        } catch (error) {
            toast.error('Failed to load messages');
        }
    };

    const fetchPackages = async () => {
        try {
            const data = await getPackages();
            setDbPackages(data);
        } catch (error) {
            toast.error('Failed to load packages');
        }
    };

    const handleLogout = () => {
        // Clear cookie
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push('/');
    };

    const statusColor = (status: string) => {
        if (status === 'confirmed') return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (status === 'pending') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    };

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-900 border-r border-white/5 flex flex-col shrink-0 min-h-screen`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shrink-0">
                        <NextImage
                            src="/images/logo-gold.jpg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-cover scale-110"
                        />
                    </div>
                    {sidebarOpen && (
                        <div>
                            <div className="text-white font-bold text-sm leading-none">Ramayan Tours</div>
                            <div className="text-orange-400 text-xs">Admin Panel</div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    {navItems.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === id
                                    ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/10 text-orange-400 border border-orange-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            {sidebarOpen && <span>{label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-auto">
                {/* Top Bar */}
                <header className="bg-gray-900 border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search bookings, customers..."
                                className="bg-gray-800 text-gray-300 pl-9 pr-4 py-2 rounded-lg text-sm border border-white/5 focus:border-orange-500/50 outline-none w-64"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">4</span>
                        </div>
                        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-sm font-bold text-white">A</div>
                            {sidebarOpen && <span className="text-white text-sm hidden sm:block">Admin</span>}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">

                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-white font-black text-2xl font-poppins">Dashboard</h1>
                                <p className="text-gray-400 text-sm">Welcome back, Admin! Here's your overview for today.</p>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { label: 'Total Revenue', value: `₹${statsData?.totalRevenue?.toLocaleString() || '0'}`, change: '+18%', up: true, icon: '💰', color: 'from-orange-500/20 to-yellow-500/10 border-orange-500/20' },
                                    { label: 'Active Bookings', value: statsData?.activeBookings || '0', change: '+12%', up: true, icon: '📋', color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/20' },
                                    { label: 'New Customers', value: statsData?.newCustomers || '0', change: '+8%', up: true, icon: '👥', color: 'from-green-500/20 to-emerald-500/10 border-green-500/20' },
                                    { label: 'Pending Approvals', value: statsData?.pendingApprovals || '0', change: '-3%', up: false, icon: '⏳', color: 'from-purple-500/20 to-violet-500/10 border-purple-500/20' },
                                ].map(({ label, value, change, up, icon, color }) => (
                                    <div key={label} className={`bg-gradient-to-br ${color} border rounded-2xl p-5`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-2xl">{icon}</span>
                                            <span className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-green-400' : 'text-red-400'}`}>
                                                {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                                {change}
                                            </span>
                                        </div>
                                        <div className="text-white font-black text-2xl mb-0.5">{value}</div>
                                        <div className="text-gray-400 text-sm">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Revenue Chart */}
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-white font-bold text-lg">Revenue Overview</h2>
                                        <p className="text-gray-400 text-sm">Monthly revenue — last 6 months</p>
                                    </div>
                                    <div className="badge-saffron text-xs">+18% vs last month</div>
                                </div>
                                <div className="flex items-end gap-3 h-40">
                                    {(statsData?.monthlyRevenue || []).length > 0 ? (statsData?.monthlyRevenue).map(({ month, amount }: any) => (
                                        <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                            <div
                                                className="w-full bg-gradient-to-t from-orange-500 to-yellow-500 rounded-t-lg transition-all hover:opacity-80"
                                                style={{ height: `${(amount / maxRevenue) * 100}%` }}
                                                title={`₹${amount.toLocaleString()}`}
                                            />
                                            <span className="text-gray-500 text-xs">{month}</span>
                                        </div>
                                    )) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm italic">
                                            Waiting for revenue data...
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Bookings */}
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-white font-bold text-lg">Recent Bookings</h2>
                                    <button
                                        onClick={() => setActiveTab('bookings')}
                                        className="text-orange-400 text-sm hover:underline"
                                    >
                                        View all
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-gray-500 text-xs uppercase border-b border-white/5">
                                                <th className="text-left pb-3">Booking ID</th>
                                                <th className="text-left pb-3">Customer</th>
                                                <th className="text-left pb-3 hidden sm:table-cell">Package</th>
                                                <th className="text-left pb-3 hidden md:table-cell">Date</th>
                                                <th className="text-right pb-3">Amount</th>
                                                <th className="text-center pb-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {dbBookings.slice(0, 5).map((b) => (
                                                <tr key={b.id} className="text-gray-300 hover:bg-white/2 transition-colors">
                                                    <td className="py-3 font-mono text-xs text-orange-400">{b.id.substring(0, 8)}</td>
                                                    <td className="py-3 font-medium">{b.name}</td>
                                                    <td className="py-3 hidden sm:table-cell text-gray-400">{b.package?.name || 'N/A'}</td>
                                                    <td className="py-3 hidden md:table-cell text-gray-400">{new Date(b.createdAt).toLocaleDateString()}</td>
                                                    <td className="py-3 text-right font-bold text-white">₹{b.amount.toLocaleString()}</td>
                                                    <td className="py-3 text-center">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColor(b.status.toLowerCase())}`}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {dbBookings.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="py-10 text-center text-gray-500">No recent bookings found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bookings Tab */}
                    {activeTab === 'bookings' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-white font-black text-2xl">Bookings</h1>
                                    <p className="text-gray-400 text-sm">Manage all customer bookings</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl text-sm font-semibold">
                                    <Plus className="w-4 h-4" /> Add Booking
                                </button>
                            </div>
                            <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-800">
                                            <tr className="text-gray-400 text-xs uppercase">
                                                {['ID', 'Customer', 'Package', 'Date', 'Travelers', 'Amount', 'Status', 'Actions'].map((h) => (
                                                    <th key={h} className="text-left px-4 py-4 font-semibold">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {dbBookings.map((b) => (
                                                <tr key={b.id} className="text-gray-300 hover:bg-white/3 transition-colors">
                                                    <td className="px-4 py-4 font-mono text-xs text-orange-400">{b.id.substring(0, 8)}</td>
                                                    <td className="px-4 py-4 font-medium">{b.name}</td>
                                                    <td className="px-4 py-4 text-gray-400">{b.package?.name || 'N/A'}</td>
                                                    <td className="px-4 py-4 text-gray-400">{new Date(b.travelDate).toLocaleDateString()}</td>
                                                    <td className="px-4 py-4 text-center">{b.travelers}</td>
                                                    <td className="px-4 py-4 font-bold text-white">₹{b.amount.toLocaleString()}</td>
                                                    <td className="px-4 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColor(b.status.toLowerCase())}`}>
                                                            {b.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors">
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button className="p-1.5 rounded-lg hover:bg-orange-500/20 text-orange-400 transition-colors">
                                                                <Edit className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {dbBookings.length === 0 && (
                                                <tr>
                                                    <td colSpan={8} className="py-20 text-center text-gray-500">No bookings found in database</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Customers Tab */}
                    {activeTab === 'customers' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-white font-black text-2xl">Customers</h1>
                                <p className="text-gray-400 text-sm">Manage your pilgrim database</p>
                            </div>
                            <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-800">
                                            <tr className="text-gray-400 text-xs uppercase">
                                                {['Customer', 'Email', 'Phone', 'Location', 'Trips', 'Total Spent', 'Actions'].map((h) => (
                                                    <th key={h} className="text-left px-4 py-4 font-semibold">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {dbCustomers.map((c) => (
                                                <tr key={c.id} className="text-gray-300 hover:bg-white/3 transition-colors">
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                                                                {c.name[0]}
                                                            </div>
                                                            <span className="font-medium">{c.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-gray-400">{c.email}</td>
                                                    <td className="px-4 py-4 text-gray-400">{c.phone}</td>
                                                    <td className="px-4 py-4 text-gray-400">{c.location || 'N/A'}</td>
                                                    <td className="px-4 py-4 text-center">
                                                        <span className="badge-saffron">{c.trips}</span>
                                                    </td>
                                                    <td className="px-4 py-4 font-bold text-green-400">₹{c.totalSpent.toLocaleString()}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex gap-2">
                                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors">
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button className="p-1.5 rounded-lg hover:bg-orange-500/20 text-orange-400 transition-colors">
                                                                <Edit className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {dbCustomers.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="py-20 text-center text-gray-500">No customers found in database</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Messages Tab */}
                    {activeTab === 'messages' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-white font-black text-2xl">Messages</h1>
                                <p className="text-gray-400 text-sm">Customer inquiries and support messages</p>
                            </div>
                                <div className="bg-gray-900 rounded-2xl border border-white/5 divide-y divide-white/5">
                                    {dbMessages.map((msg) => (
                                        <div key={msg.id} className={`p-5 flex items-start gap-4 hover:bg-white/3 transition-colors ${!msg.read ? 'border-l-2 border-orange-500' : ''}`}>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 ${msg.read ? 'bg-gray-700' : 'bg-gradient-to-br from-orange-500 to-yellow-500'}`}>
                                                {msg.name[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-white font-semibold">{msg.name}</div>
                                                    <div className="text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</div>
                                                </div>
                                                <div className="text-gray-400 text-sm mt-0.5">{msg.subject}</div>
                                                {msg.message && <div className="text-gray-500 text-xs mt-2 line-clamp-1">{msg.message}</div>}
                                            </div>
                                            {!msg.read && (
                                                <span className="w-2 h-2 bg-orange-500 rounded-full shrink-0 mt-2" />
                                            )}
                                        </div>
                                    ))}
                                    {dbMessages.length === 0 && (
                                        <div className="p-20 text-center text-gray-500">No messages found in database</div>
                                    )}
                                </div>
                        </div>
                    )}

                    {/* Revenue Tab */}
                    {activeTab === 'revenue' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-white font-black text-2xl">Revenue Analytics</h1>
                                <p className="text-gray-400 text-sm">Financial performance overview</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Total Revenue (2025)', value: '₹26,04,000', icon: '💰' },
                                    { label: 'This Month', value: '₹6,12,000', icon: '📅' },
                                    { label: 'Avg. Booking Value', value: '₹18,450', icon: '📊' },
                                ].map(({ label, value, icon }) => (
                                    <div key={label} className="bg-gray-900 rounded-2xl border border-white/5 p-6 text-center">
                                        <div className="text-3xl mb-2">{icon}</div>
                                        <div className="text-white font-black text-2xl mb-1">{value}</div>
                                        <div className="text-gray-400 text-sm">{label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                <h2 className="text-white font-bold text-lg mb-6">Monthly Revenue Trend</h2>
                                <div className="flex items-end gap-4 h-56">
                                    {monthlyRevenue.map(({ month, amount }) => (
                                        <div key={month} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="text-xs text-gray-400">₹{Math.round(amount / 1000)}K</div>
                                            <div
                                                className="w-full bg-gradient-to-t from-orange-500 to-yellow-500 rounded-t-xl transition-all hover:opacity-80 cursor-pointer"
                                                style={{ height: `${(amount / maxRevenue) * 80}%` }}
                                            />
                                            <span className="text-gray-500 text-xs font-medium">{month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
                                 <h2 className="text-white font-bold text-lg mb-4">Revenue by Package</h2>
                                 <div className="space-y-3">
                                     {dbPackages.map((pkg: any) => {
                                         const percent = Math.round((pkg.price / 33000) * 100);
                                         return (
                                             <div key={pkg.id} className="flex items-center gap-4">
                                                 <div className="text-gray-300 text-sm w-48 truncate">{pkg.name}</div>
                                                 <div className="flex-1 h-2.5 bg-gray-800 rounded-full overflow-hidden">
                                                     <div
                                                         className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                                                         style={{ width: `${percent}%` }}
                                                     />
                                                  </div>
                                                 <div className="text-gray-400 text-sm w-20 text-right">₹{pkg.price.toLocaleString()}</div>
                                             </div>
                                         );
                                     })}
                                     {dbPackages.length === 0 && (
                                         <div className="py-5 text-center text-gray-500">No packages available to show revenue breakdown</div>
                                     )}
                                 </div>
                             </div>
                        </div>
                    )}

                    {/* Packages Tab */}
                    {activeTab === 'packages' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-white font-black text-2xl">Manage Packages</h1>
                                    <p className="text-gray-400 text-sm">Create and edit tour packages</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl text-sm font-semibold">
                                    <Plus className="w-4 h-4" /> Add Package
                                </button>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {dbPackages.map((pkg: any) => (
                                     <div key={pkg.id} className="bg-gray-900 rounded-2xl border border-white/5 p-5 flex items-start justify-between">
                                         <div>
                                             <div className="text-white font-bold mb-1">{pkg.name}</div>
                                             <div className="text-gray-400 text-sm">{pkg.duration} • {pkg.hotelType}</div>
                                             <div className="text-orange-400 font-bold mt-2">₹{pkg.price.toLocaleString()}</div>
                                         </div>
                                         <div className="flex gap-2">
                                             <button className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors">
                                                 <Edit className="w-4 h-4" />
                                             </button>
                                             <button className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
                                                 <Trash2 className="w-4 h-4" />
                                             </button>
                                         </div>
                                     </div>
                                 ))}
                                 {dbPackages.length === 0 && (
                                     <div className="col-span-full py-20 bg-gray-900/50 rounded-2xl border border-dashed border-white/10 text-center text-gray-500">
                                         No packages found. Create your first tour package to get started!
                                     </div>
                                 )}
                             </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-white font-black text-2xl">Settings</h1>
                                <p className="text-gray-400 text-sm">Configure your platform settings</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Company Info', desc: 'Update your business name, logo and contact info' },
                                    { title: 'Payment Gateway', desc: 'Configure Razorpay or Paytm integration' },
                                    { title: 'Email Templates', desc: 'Customize booking confirmation emails' },
                                    { title: 'AI Configuration', desc: 'Manage OpenAI API key and itinerary prompts' },
                                ].map(({ title, desc }) => (
                                    <div key={title} className="bg-gray-900 rounded-2xl border border-white/5 p-6 hover:border-orange-500/20 transition-colors cursor-pointer group">
                                        <h3 className="text-white font-bold mb-1 group-hover:text-orange-400 transition-colors">{title}</h3>
                                        <p className="text-gray-400 text-sm">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
