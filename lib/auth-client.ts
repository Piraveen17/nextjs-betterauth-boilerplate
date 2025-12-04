// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  cookiePrefix: "betterAuth",
});

// named exports (use the client methods directly)
export const {
  signIn,
  signOut,
  signUp,
  useSession,
  // email verification / general helpers
  sendVerificationEmail, // if present in your client version
  // password reset — request the reset email
  requestPasswordReset,
  // set the new password using token
  resetPassword,
} = authClient;
