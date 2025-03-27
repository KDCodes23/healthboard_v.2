import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This is a simplified middleware that only checks if the user is on a dashboard page
  // The actual authentication is handled client-side in the UserContext

  const { pathname } = request.nextUrl

  // Skip middleware for public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/register")
  ) {
    return NextResponse.next()
  }

  // For dashboard routes, we'll let the client-side handle authentication
  // This is just a placeholder middleware
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

