import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { createAuthMiddleware, APIError } from "better-auth/api";
import jwt from "jsonwebtoken";
import { sendEmailAction } from "@/action/sendEmail.action";
import { connectToDB } from "./mongodb";
import { nextCookies } from "better-auth/next-js";

const db = await connectToDB();

export const auth = betterAuth({
  appName: "Better Auth Kit",
  database: mongodbAdapter(db),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000"],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  advanced: {
    cookiePrefix: "SecureStart",
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60, // 1 hour
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user }) => {
      const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      // 1️⃣ Generate JWT token for email verification
      const token = jwt.sign(
        { email: user.email },
        process.env.EMAIL_VERIFY_SECRET!,
        { expiresIn: "1h" }
      );

      // 2️⃣ Construct verification link
      const link = `${base}/api/verify-email?token=${token}&callbackURL=/dashboard`;

      console.log("[EmailVerification] link:", link);

      // 3️⃣ Send email
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description:
            "Please verify your email address to complete the registration process.",
          link,
        },
      });
    },
  },

  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    verifyEmailOnSignUp: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
    sendResetPassword: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Reset your password",
        meta: {
          description: "Click the link below to reset your password.",
          link: `${url}`,
        },
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/signup/email") return;

      const email = ctx.body?.email;
      const emailDomainEnv = process.env.EMAIL_DOMAIN ?? "";

      if (!email) {
        throw new APIError("BAD_REQUEST", { message: "Email is required" });
      }

      if (!emailDomainEnv) {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "EMAIL_DOMAIN is not set",
        });
      }

      const allowedDomains = emailDomainEnv.split(",").map((d) => d.trim());
      const userDomain = email.split("@")[1];

      if (!allowedDomains.includes(userDomain)) {
        throw new APIError("BAD_REQUEST", {
          message: "Email domain not allowed",
        });
      }
    }),
  },
  plugins: [nextCookies()],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
