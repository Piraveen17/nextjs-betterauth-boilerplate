import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/signin", "/signup"];

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // No valid session → redirect to sign-in
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Session is valid → proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"], // apply to protected routes (adjust as needed)
};
