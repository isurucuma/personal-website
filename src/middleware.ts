import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticate } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Don't protect the login page itself
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const isAuthenticated = await authenticate();

    if (!isAuthenticated) {
      // Redirect to login page
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
