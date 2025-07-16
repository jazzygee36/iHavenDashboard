import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // 🚫 Protect private routes
  if (
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/courses") ||
      pathname.startsWith("/settings")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Prevent logged-in users from going to home/login (but not their dashboard pages!)
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/courses/:path*", "/settings/:path*"],
};
