'use server';

import { prisma } from '@/lib/prisma';
import { BookingStatus, Role } from '@prisma/client';

export async function getAdminDashboardStats() {
    try {
        const [
            totalRevenue,
            activeBookingsCount,
            newCustomersCount,
            pendingApprovalsCount
        ] = await Promise.all([
            // Total Revenue (Confirmed bookings)
            prisma.booking.aggregate({
                where: { status: 'CONFIRMED' },
                _sum: { amount: true }
            }),
            // Active Bookings (Pending, Confirmed, Processing)
            prisma.booking.count({
                where: {
                    status: {
                        in: ['PENDING', 'CONFIRMED', 'PROCESSING']
                    }
                }
            }),
            // New Customers (Users registered in last 30 days)
            prisma.user.count({
                where: {
                    role: 'USER',
                    createdAt: {
                        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    }
                }
            }),
            // Pending Approvals (e.g., Unread messages or Pending bookings)
            prisma.booking.count({
                where: { status: 'PENDING' }
            }),
        ]);

        // Calculate monthly revenue for last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const realMonthlyRevenueData = await prisma.booking.findMany({
            where: {
                status: 'CONFIRMED',
                createdAt: { gte: sixMonthsAgo }
            },
            select: {
                amount: true,
                createdAt: true
            }
        });

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyStats = Array.from({ length: 6 }).map((_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            const monthName = months[d.getMonth()];
            const amount = realMonthlyRevenueData
                .filter(b => b.createdAt.getMonth() === d.getMonth() && b.createdAt.getFullYear() === d.getFullYear())
                .reduce((sum, b) => sum + b.amount, 0);
            return { month: monthName, amount: amount || 0 };
        });

        return {
            totalRevenue: totalRevenue._sum.amount || 0,
            activeBookings: activeBookingsCount,
            newCustomers: newCustomersCount,
            pendingApprovals: pendingApprovalsCount,
            monthlyRevenue: monthlyStats
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw new Error('Failed to fetch dashboard stats');
    }
}

export async function getBookings() {
    try {
        return await prisma.booking.findMany({
            include: {
                package: true,
                user: true
            },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw new Error('Failed to fetch bookings');
    }
}

export async function getCustomers() {
    try {
        const customers = await prisma.user.findMany({
            where: { role: 'USER' },
            include: {
                _count: {
                    select: { bookings: true }
                },
                bookings: {
                    where: { status: 'CONFIRMED' },
                    select: { amount: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return customers.map(c => ({
            ...c,
            trips: c._count.bookings,
            totalSpent: c.bookings.reduce((sum, b) => sum + b.amount, 0)
        }));
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw new Error('Failed to fetch customers');
    }
}

export async function getPackages() {
    try {
        return await prisma.package.findMany({
            include: {
                destination: true
            },
            orderBy: { name: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw new Error('Failed to fetch packages');
    }
}

export async function getMessages() {
    try {
        return await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Failed to fetch messages');
    }
}
