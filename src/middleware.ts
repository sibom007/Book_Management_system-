import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/utils/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isApiRoute = pathname.includes("/api");
  const isAuthRoute = pathname.includes("/auth");
  const isPrivateRoute = pathname.includes("/dashboard"); // Fixed typo
  const isPublicRoute = ["/", "/about", "/contact"].includes(pathname); // Define public routes explicitly

  // Allow all API routes (consider restricting if needed)
  if (isApiRoute) return;

  // Redirect logged-in users away from auth pages (e.g., login/signup)
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // Allow public pages without authentication
  if (isPublicRoute) return;

  // Protect private routes
  if (isPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl.origin));
  }

  // Custom middleware logic here (if any)
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
