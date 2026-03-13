'use server';

import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function login(formData: any) {
    try {
        const { email, password } = formData;

        // Check for admin specifically (as in existing logic)
        if (email === 'admin@ramayantours.com' && password === 'JaiShriRam@2025') {
            cookies().set('admin_session', 'true', {
                path: '/',
                maxAge: 86400,
                sameSite: 'strict',
            });
            return { success: true, isAdmin: true };
        }

        // Check regular user in DB
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || user.password !== password) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Set user session cookie (simplified for now)
        cookies().set('user_id', user.id, {
            path: '/',
            maxAge: 86400 * 7,
            sameSite: 'strict',
        });

        return { success: true, isAdmin: false };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Internal server error' };
    }
}

export async function signup(formData: any) {
    try {
        const { name, email, phone, password } = formData;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password, // Note: In a real app, hash this!
                role: 'USER'
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, error: 'Internal server error' };
    }
}
