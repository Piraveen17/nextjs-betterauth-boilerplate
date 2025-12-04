import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/mongodb"; // your helper function

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    const callbackURL = url.searchParams.get("callbackURL") || "/";

    if (!token) {
      return NextResponse.redirect(new URL("/?error=MissingToken", req.url));
    }

    // Verify JWT token
    const secret = process.env.EMAIL_VERIFY_SECRET!;
    let payload: any;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      return NextResponse.redirect(new URL("/?error=InvalidToken", req.url));
    }

    const email = payload.email;

    // Connect to MongoDB
    const db = await connectToDB();
    const users = db.collection("user");

    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.redirect(new URL("/?error=UserNotFound", req.url));
    }

    // Update user to mark email as verified
    await users.updateOne({ email }, { $set: { emailVerified: true } });

    // Redirect to callback URL
    return NextResponse.redirect(new URL(callbackURL, req.url));
  } catch (error) {
    console.error("[VerifyEmail]:", error);
    return NextResponse.redirect(new URL("/?error=ServerError", req.url));
  }
}
