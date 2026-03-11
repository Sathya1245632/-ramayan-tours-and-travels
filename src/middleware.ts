import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Redirect to login if no session exists
            const url = new URL('/login', request.url);
            url.searchParams.set('admin', 'true');
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Ensure this runs for all relevant paths
export const config = {
    matcher: ['/admin/:path*', '/login'],
};

