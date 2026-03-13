'use server';

import { prisma } from '@/lib/prisma';

export async function submitReview(reviewData: any) {
    try {
        const { name, location, rating, comment, packageName } = reviewData;

        await prisma.review.create({
            data: {
                name,
                location,
                rating: parseInt(rating),
                comment,
                packageName,
                approved: true // Auto-approve for now, can be moderated in admin
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Review submission error:', error);
        return { success: false, error: 'Failed to submit review' };
    }
}

export async function getApprovedReviews() {
    try {
        return await prisma.review.findMany({
            where: { approved: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
}
