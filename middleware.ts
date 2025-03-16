import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
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

  // For development purposes, allow all routes without authentication
  // In a real app, you would check authentication here
  return NextResponse.next()

  // Commented out authentication logic for now
  /*
  try {
    // Check if the user is authenticated
    // For now, we'll just allow all access
    
    // In a real app with Supabase, you would check the session here
    const isAuthenticated = true // Placeholder
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      const url = new URL("/login", request.url)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Redirect to login on error
    return NextResponse.redirect(new URL("/login", request.url))
  }
  */
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

