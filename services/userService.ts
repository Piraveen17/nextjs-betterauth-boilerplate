import { connectToDB, getMongoDB } from "@/lib/mongodb";
import { AppUser } from "@/model/AppUser";
import { v4 as uuidv4 } from "uuid";

export default async function getUserByEmail(email: string) {
  try {
    const db = await getMongoDB();
    const users = db.collection("user");
    const res = await users.findOne({ email });
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function createAppUser(user: any) {
  try {
    await connectToDB();
    const newAppUser = new AppUser({
      userId: uuidv4(),
      email: user.email.toLocaleLowerCase(),
      name: user.name,
      role: "user",
    });

    const savedUser = await newAppUser.save();
    return savedUser;
  } catch (err) {
    console.log(err);
  }
}
