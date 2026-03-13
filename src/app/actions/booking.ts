'use server';

import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';

export async function createBooking(bookingData: any) {
    try {
        const { pkgId, travelers, formData, totalAmount } = bookingData;

        // 1. Get or Create User based on email
        let user = await prisma.user.findUnique({
            where: { email: formData.email }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    role: 'USER',
                    password: 'TEMP_PASSWORD_' + Math.random().toString(36).slice(-8) // Random temp password
                }
            });
        }

        // 2. Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                packageId: pkgId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                travelers: travelers,
                amount: totalAmount,
                status: 'PENDING',
                travelDate: new Date(formData.travelDate),
            },
            include: {
                package: true,
                user: true
            }
        });

        return { success: true, bookingId: booking.id };
    } catch (error) {
        console.error('Booking error:', error);
        return { success: false, error: 'Failed to create booking' };
    }
}
