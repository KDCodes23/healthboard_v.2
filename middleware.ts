import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

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

  try {
    // Create a Supabase client
    const supabase = createClient()

    // Check if the user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Redirect to login if not authenticated
      const url = new URL("/login", request.url)
      return NextResponse.redirect(url)
    }

    // Check if the user is accessing the correct dashboard based on their role
    const userRole = session.user?.user_metadata?.role

    if (pathname.startsWith("/dashboard/patient") && userRole !== "patient") {
      // Redirect doctor to doctor dashboard
      return NextResponse.redirect(new URL("/dashboard/doctor", request.url))
    }

    if (pathname.startsWith("/dashboard/doctor") && userRole !== "doctor") {
      // Redirect patient to patient dashboard
      return NextResponse.redirect(new URL("/dashboard/patient", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Redirect to login on error
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

