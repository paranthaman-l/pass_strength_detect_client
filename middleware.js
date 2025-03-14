import { NextResponse } from 'next/server';
import { decrypt, verifyUserRole } from '@/app/lib/session';

export default async function middleware(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1]; // Extract the Bearer token
  
  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'Authorization token is required' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const decodedToken = await decrypt(token);

    if (!decodedToken || !(verifyUserRole(decodedToken))) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized: Invalid or insufficient role' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add custom headers if needed or pass data to the request
    request.headers.set('user', JSON.stringify(decodedToken));

    return NextResponse.next(); // Continue with the next handler
  } catch (error) {
    console.error('Token verification error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Invalid token or failed to verify token' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: '/api/user', // Apply middleware to all routes under /api/user
};
