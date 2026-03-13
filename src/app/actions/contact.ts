'use server';

import { prisma } from '@/lib/prisma';

export async function sendContactMessage(formData: any) {
    try {
        const { name, email, phone, subject, message } = formData;

        await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                subject: subject || 'No Subject',
                message
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Contact message error:', error);
        return { success: false, error: 'Failed to send message' };
    }
}
