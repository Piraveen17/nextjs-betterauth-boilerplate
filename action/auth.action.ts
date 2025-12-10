"use server";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { type ErrorCode, auth } from "@/lib/auth";
import getUserByEmail from "@/services/userService";

type ActionState =
  | {
      error?: string;
      success?: boolean;
      message?: string;
      data?: {
        name?: string;
        email?: string;
      };
    }
  | undefined;

export async function signUpAction(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      error: "Please enter a valid email address",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters long",
      success: false,
    };
  }

  try {
    const existingUser = await getUserByEmail(email.toLocaleLowerCase());

    if (existingUser) {
      return {
        error: "This email is already registered.",
        success: false,
        data: { name, email },
      };
    }
  } catch (err) {
    return {
      error: "An unexpected error occurred during sign up",
      success: false,
      data: { name, email },
    };
  }

  try {
    const result = await auth.api.signUpEmail({
      asResponse: true,
      body: {
        email,
        password,
        name,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message:
        "Sign up successful! Please check your email to verify your account.",
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";

      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return {
            error: "This email is already registered.",
            success: false,
            data: { name, email },
          };
        default:
          return { error: err.message, success: false, data: { name, email } };
      }
    }
    if (err instanceof Error) return { error: err.message, success: false };
    return {
      success: false,
      error: "An unexpected error occurred during sign up",
      data: { name, email },
    };
  }
}
