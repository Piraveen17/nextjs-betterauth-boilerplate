import { connectToDB } from "@/lib/mongodb";
import { ca } from "zod/v4/locales";

export default async function getUserByEmail(email: string) {
  try {
    const db = await connectToDB();
    const users = db.collection("user");
    const res = await users.findOne({ email });
    return res;
  } catch (err) {
    console.log(err);
  }
}
