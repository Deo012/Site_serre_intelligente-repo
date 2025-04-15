import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './api/auth/login/route';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // allow
}

// Protect only specific paths
export const config = {
  matcher: ['/dashBoard', '/dropImagePage'],
}
